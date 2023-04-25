import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import { initialLocalGameState } from '../utils/config'
import { useState } from 'react'

let timeoutId = null

const useGame = (user, setLocalGame) => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSetMessage = (message) => {
    setMessage(message)
    if (timeoutId) clearInterval(timeoutId)
    timeoutId = setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  const create = async ({ type, gridSize }) => {
    if (type === 'local') {
      setLocalGame({
        ...initialLocalGameState,
        gridSize: gridSize,
        inTurn: user.id,
        player1: user.id,
      })
      navigate('/games/offline')
    } else {
      try {
        await gameServices.create(
          { type: type, gridSize: gridSize },
          user.token
        )
        navigate(`/games`)
      } catch (err) {
        handleSetMessage(err.response.data.error)
      }
    }
  }

  const rematch = async (gameId) => {
    navigate(`/games/${gameId}`)
  }

  const actionHandler = async (action) => {
    const { type, data } = action
    if (type === 'play') {
      navigate(`/games/${data.id}`)
    }
    if (type === 'join') {
      try {
        await gameServices.join(data.id, user.token)
      } catch (err) {
        handleSetMessage(err.response.data.error)
      }
    }
  }
  const sendMove = async ({ id, move }) => {
    try {
      await gameServices.makeMove(id, move, user.token)
    } catch (err) {
      handleSetMessage(err.response.data.error)
    }
  }
  const deleteGame = async (id) => {
    try {
      const result = await gameServices.deleteOne(id, user.token)
      return result
    } catch (err) {
      setMessage(err.response.data.error)
    }
  }

  return { create, rematch, actionHandler, sendMove, message, deleteGame }
}

export default useGame
