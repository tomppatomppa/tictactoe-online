const socketMiddleware = (io) => {
  const onConnection = (socket) => {
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

module.exports = { socketMiddleware, errorHandler }
