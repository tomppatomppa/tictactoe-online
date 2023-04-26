const { Game } = require('../models/index')

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
    io.to(gameId).emit('user-joined', `User joined game room id ${gameId}`)
  }

  const getGameState = async (gameId) => {
    const game = await Game.findByPk(gameId)
    io.to(gameId).emit('game-state', game)
  }

  const makeMove = async ({ gameId, move }) => {
    io.to(gameId).emit('make-move', move)
  }

  const rematch = async (game) => {
    io.timeout(10000)
      .to(game.id.toString())
      .emit('start:rematch', async (_, userResponse) => {
        if (userResponse[0] === 'ok') {
          const { player1, player2, gridSize, type } = game
          try {
            const rematchGame = await Game.create({
              type: type,
              userId: player1,
              gridSize: gridSize,
              player1: player1,
              player2: player2,
              inTurn: player1,
            })
            io.to(game.id.toString()).emit('new:game', rematchGame.id)
          } catch (e) {
            console.log(e)
          }
        } else {
          // User didn't click OK, do nothing
          console.log('user doesnt want new game')
        }
      })
  }

  socket.on('get-initial-games', initialGame)
  socket.on('join-game-room', joinGameRoom)
  socket.on('get-game-state', getGameState)
  socket.on('player-move', makeMove)
  socket.on('game:rematch', rematch)
}
