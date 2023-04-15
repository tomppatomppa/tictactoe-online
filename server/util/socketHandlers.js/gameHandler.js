const { Game } = require('../../models/index')

module.exports = (io, socket) => {
  const initialGame = async () => {
    const allGames = await Game.findAll()
    socket.emit('initial-game-state', allGames)
  }

  socket.on('get-initial-games', initialGame)
}
