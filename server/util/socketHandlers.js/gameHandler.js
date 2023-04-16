const { Game } = require('../../models/index')

module.exports = (io, socket) => {
  const initialGame = async () => {
    const games = await Game.findAll({})
    socket.emit('initial-game-state', games)
  }

  socket.on('get-initial-games', initialGame)
}
