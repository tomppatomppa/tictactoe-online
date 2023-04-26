import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../utils/config'

const useGameSocket = (id) => {
  const [gameState, setGameState] = useState(null)
  const [socket, setSocket] = useState(null)
  const [rematchGameId, setRematchGameId] = useState(null)

  useEffect(() => {
    setRematchGameId(null)
    const newSocket = io(SOCKET_URL, {
      query: {
        gameId: id,
      },
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [id])

  const handleRematch = () => {
    socket.emit('game:rematch', gameState)
  }

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('games:join-room', id)
        socket.emit('games:get-game', id)
      })
    }
  }, [socket, id])

  useEffect(() => {
    if (socket) {
      socket.on('games:game-state', (game) => {
        setGameState(game)
      })
      socket.on('games:start-rematch', (callback) => {
        const userResponse = window.confirm('Do you want to rematch?')
        callback(userResponse ? 'ok' : 'cancel')
      })
      socket.on('games:new-game', (gameId) => {
        setRematchGameId(gameId)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return {
    socket,
    gameState,

    handleRematch,
    rematchGameId,
  }
}

export default useGameSocket
