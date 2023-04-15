const { User, Session } = require('../models')

const registerGameHandlers = require('./socketHandlers.js/gameHandler')

const socketMiddleware = (io) => {
  const onConnection = (socket) => {
    registerGameHandlers(io, socket)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    socket.on('hello', (msg) => {
      console.log(msg)
    })
  }

  io.on('connection', onConnection)

  return (req, res, next) => {
    req.io = io
    next()
  }
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({
      error: error.errors.map((e) => e.message),
    })
  }
  if (error.name === 'SequelizeDatabaseError') {
    console.log(error)
    return res.status(400).send({
      error: 'bad data...',
    })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({
      error: error.errors.map((e) => e.message),
    })
  }

  next(error)
}

const sessionFrom = async (token) => {
  return await Session.findOne({
    where: {
      token,
    },
    include: {
      model: User,
    },
  })
}

const userFromToken = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  const session = await sessionFrom(authorization.substring(7))

  if (!session) {
    return res.status(401).json({ error: 'no valid session' })
  }

  req.user = session.user

  next()
}

module.exports = { socketMiddleware, errorHandler, userFromToken }
