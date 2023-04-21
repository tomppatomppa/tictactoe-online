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
    console.log('rematch')

    io.timeout(10000)
      .to(game.id.toString())
      .emit('start:rematch', async (_, userResponse) => {
        if (userResponse[0] === 'ok') {
          const { player1, player2, gridSize, type } = game
          const rematchGame = await Game.create({
            type: type,
            userId: player1,
            gridSize: gridSize,
            player1: player1,
            player2: player2,
            inTurn: player1,
          })
          console.log('create a new game')
          io.to(game.id.toString()).emit('new:game', rematchGame.id)
        } else {
          // User didn't click OK, do nothing
          console.log('user doesnt want new game')
          io.to(game.id.toString()).emit('new:game', null)
        }
      })

    // socket.broadcast.to(game.id.toString()).emit('start:rematch', 1)
    // }
  }
  const checkRoomId = (socket, next, gameId) => {
    if (!gameId) {
      const error = new Error('gameId is required')
      error.code = 'ERR_ROOM_ID_REQUIRED'
      return next(error)
    }

    // roomId is not empty, call the next middleware
    next()
  }

  socket.on('get-initial-games', initialGame)

  socket.on('join-game-room', joinGameRoom)
  socket.on('get-game-state', getGameState)
  socket.on('player-move', makeMove)
  socket.on('game:rematch', rematch)
}
