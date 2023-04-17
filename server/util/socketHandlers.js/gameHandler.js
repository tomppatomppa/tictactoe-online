const { Game } = require('../../models/index')

module.exports = (io, socket) => {
  const initialGame = async () => {
    const games = await Game.findAll({})
    socket.emit('initial-game-state', games)
  }
  const joinGameRoom = (gameId) => {
    socket.join(gameId)
    io.to(gameId).emit(
      'user-joined',
      `User ${socket.id} joined game room id ${gameId}`
    )
  }
  const getGameState = async (gameId) => {
    const game = await Game.findByPk(gameId)
    io.to(gameId).emit('game-state', game)
  }
  const makeMove = async ({ gameId, move }) => {
    io.to(gameId).emit('make-move', move)
  }

  socket.on('join-game-room', joinGameRoom)
  socket.on('get-initial-games', initialGame)
  socket.on('get-game-state', getGameState)
  socket.on('player-move', makeMove)
}
