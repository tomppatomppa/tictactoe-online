const express = require('express')
require('express-async-errors')
const http = require('http')
const path = require('path')
const app = express()
const httpServer = http.createServer(app)

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const cors = require('cors')

require('dotenv').config()

const { socketMiddleware, errorHandler } = require('./util/middleware')
const { connectToDatabase } = require('./util/database')

const { PORT } = require('./util/config')

const usersRouter = require('./controllers/users')
const gamesRouter = require('./controllers/games')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))
app.use(socketMiddleware(io))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/games', gamesRouter)
app.use(errorHandler)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

io.listen(4000)
const start = async () => {
  await connectToDatabase()
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
