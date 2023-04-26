const { Game } = require('../models/index')

module.exports = (io, socket) => {
  const initialGames = async () => {
    const games = await Game.findAll({
      where: {
        isFinished: false,
        type: 'online',
      },
    })
    socket.emit('games:all', games)
  }
  initialGames()
}
