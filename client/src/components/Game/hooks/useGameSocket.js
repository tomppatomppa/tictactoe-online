import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

const useGameSocket = (id) => {
  const [gameState, setGameState] = useState(null)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [rematchId, setRematchId] = useState(null)

  useEffect(() => {
    const newSocket = io(URL, {
      query: {
        gameId: id,
      },
    })
    setSocket(newSocket)
    setRematchId(null)
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
      socket.on('start:rematch', (rematchId) => {
        setRematchId(rematchId)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return { socket, handleAction, gameState, message, handleRematch, rematchId }
}

export default useGameSocket
