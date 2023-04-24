const express = require('express')
require('express-async-errors')
const { socketMiddleware, errorHandler } = require('./util/middleware')

const http = require('http')
const path = require('path')
const app = express()
const httpServer = http.createServer(app)

const io = require('./socket')(httpServer)

const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./controllers/users')
const gamesRouter = require('./controllers/games')
const sessionsRouter = require('./controllers/sessions')
const leaderboardsRouter = require('./controllers/leaderboards')

// httpServer.on('request', app)
//TODO: refactor all but app into index.js
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

app.use('/ping', async (req, res) => {
  return res.status(200).json('hello ping')
})
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

module.exports = { app, httpServer }
