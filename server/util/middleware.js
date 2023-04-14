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

module.exports = { socketMiddleware }
