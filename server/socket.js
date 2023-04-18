module.exports = function (httpServer) {
  return (io = require('socket.io')(httpServer, {
    cors: {
      origin: ['http://localhost:3000', 'https://tictactoe-online.fly.dev/'],
    },
  }))
}
