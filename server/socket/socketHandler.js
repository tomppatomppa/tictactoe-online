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

  const joinGameRoom = (gameId) => {
    socket.join(gameId)
    const roomSize = io.sockets.adapter.rooms.get(gameId).size
    io.to(gameId).emit('games:user-joined-room', {
      message: `User joined game room id ${gameId}`,
      userCount: roomSize,
    })
    allRooms()
  }

  const leaveRoom = (gameId) => {
    io.to(gameId).emit('games:user-left-room')
    allRooms(gameId)
  }

  //send all the current rooms that are active
  const allRooms = (filter) => {
    const rooms = io.sockets.adapter.rooms
    const roomArray = Array.from(rooms.keys()).filter((key) =>
      /^\d+$/.test(key)
    )
    io.emit(
      'games:active',
      roomArray.filter((room) => room !== filter)
    )
  }
  const getGameState = async (gameId) => {
    const game = await Game.findByPk(gameId)
    io.to(gameId).emit('games:game-state', game)
  }

  const rematch = async (game) => {
    io.timeout(10000)
      .to(game.id.toString())
      .emit('games:start-rematch', async (_, userResponse) => {
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
            io.to(game.id.toString()).emit('games:new-game', rematchGame.id)
          } catch (e) {
            console.log(e)
          }
        } else {
          // User didn't click OK, do nothing
          console.log('user doesnt want new game')
        }
      })
  }

  socket.on('games:get-all', initialGames)
  socket.on('games:join-room', joinGameRoom)
  socket.on('games:leave-room', leaveRoom)
  socket.on('games:get-game', getGameState)
  socket.on('game:rematch', rematch)
}
