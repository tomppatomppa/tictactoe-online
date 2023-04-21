const { Game } = require('../../models/index')

module.exports = (io, socket) => {
  const initialGame = async () => {
    const games = await Game.findAll({
      where: {
        isFinished: false,
        type: 'online',
      },
    })
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
  const rematch = async (game) => {
    const { player1, player2, gridSize, type } = game
    const rematchGame = await Game.create({
      type: type,
      userId: player1,
      gridSize: gridSize,
      player1: player1,
      player2: player2,
      inTurn: player1,
    })
    io.to(game.id.toString()).emit('start:rematch', rematchGame.id)
  }

  socket.on('join-game-room', joinGameRoom)
  socket.on('get-initial-games', initialGame)
  socket.on('get-game-state', getGameState)
  socket.on('player-move', makeMove)
  socket.on('game:rematch', rematch)
}
