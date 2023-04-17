const express = require('express')
require('express-async-errors')
const http = require('http')
const path = require('path')
const app = express()
const httpServer = http.createServer(app)

const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://tictactoe-online.fly.dev/'],
  },
})

const cors = require('cors')

require('dotenv').config()

const { socketMiddleware, errorHandler } = require('./util/middleware')
const { connectToDatabase } = require('./util/database')

const { PORT } = require('./util/config')

const usersRouter = require('./controllers/users')
const gamesRouter = require('./controllers/games')
const sessionsRouter = require('./controllers/sessions')
const leaderboardsRouter = require('./controllers/leaderboards')

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

app.use(socketMiddleware(io))

app.use('/api/leaderboards', leaderboardsRouter)
app.use('/api/users', usersRouter)
app.use('/api/games', gamesRouter)
app.use('/api', sessionsRouter)

app.use(errorHandler)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//needed for localhost only
io.listen(4000)

const start = async () => {
  await connectToDatabase()
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
