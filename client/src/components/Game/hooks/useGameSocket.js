import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

const useGameSocket = (id) => {
  const [gameState, setGameState] = useState(null)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [rematchGameId, setRematchGameId] = useState(null)

  useEffect(() => {
    const newSocket = io(URL, {
      query: {
        gameId: id,
      },
    })
    setSocket(newSocket)
    setRematchGameId(null)

    return () => {
      newSocket.disconnect()
    }
  }, [id])

  const handleAction = (move) => {
    socket.emit('player-move', { gameId: id, move: move })
  }
  const handleRematch = () => {
    socket.emit('game:rematch', gameState)
  }

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('join-game-room', id)
        socket.emit('get-game-state', id)
      })
    }
  }, [socket, id])

  useEffect(() => {
    if (socket) {
      socket.on('game-state', (game) => {
        setGameState(game)
      })
      socket.on('make-move', (game) => {
        setMessage(JSON.stringify(game))
      })

      socket.on('start:rematch', (callback) => {
        const userResponse = window.confirm('Do you want to rematch?')
        callback(userResponse ? 'ok' : 'cancel')
      })
      socket.on('new:game', (gameId) => {
        if (gameId) {
          setRematchGameId(gameId)
        }
      })
      //setRematchGameId(rematchGameId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return {
    socket,
    handleAction,
    gameState,
    message,
    handleRematch,
    rematchGameId,
  }
}

export default useGameSocket
