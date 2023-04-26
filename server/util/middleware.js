const { isInCoordsArray } = require('../games/tic-tac-toe')
const { User, Session, Game, Leaderboard } = require('../models')

const registerSocketHandlers = require('../socket/socketHandler')
const registerInitialHandlers = require('../socket/initialHandler')

const socketMiddleware = (io) => {
  const onConnection = (socket) => {
    registerInitialHandlers(io, socket)
    registerSocketHandlers(io, socket)
    socket.on('disconnect', () => {
      console.log('user disconnected')
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

const validateMoveMiddleware = async (req, res, next) => {
  const { id } = req.params
  const { user } = req

  if (!req.body.move) {
    return res.status(400).json({ error: 'No move' })
  }

  const game = await Game.findByPk(id)

  if (!game) {
    return res.status(400).json({ error: 'Invalid Game Room' + id })
  }
  if (game.isFinished) {
    return res.status(400).json({ error: 'Game has finished' })
  }

  const { player1, player2 } = game

  if (user.id !== player1 && user.id !== player2) {
    return res.status(400).json({ error: 'Permission to play denied' })
  }

  if (game.inTurn !== user.id) {
    return res.status(400).json({ error: 'Not your turn' })
  }

  if (isInCoordsArray(game.moves, req.body.move)) {
    return res.status(400).json({ error: 'This is not a valid move' })
  }

  req.game = game

  next()
}

module.exports = {
  socketMiddleware,
  errorHandler,
  userFromToken,
  validateMoveMiddleware,
}
