import React from 'react'
import gameServices from '../services/gamesService'
import useCurrentUser from '../hooks/useCurrentUser'
import { useNavigate } from 'react-router-dom'

const CreateGame = () => {
  const navigate = useNavigate()
  const { user } = useCurrentUser()

  const createNewGame = async (type) => {
    try {
      await gameServices.create({ type: type, gridSize: 4 }, user.token)
    } catch (e) {
      console.log(e)
    }
  }
  const handleCreateOnline = () => {
    createNewGame('online')
  }

  const handleCreateLocal = () => {
    navigate('/games/offline')
  }

  return (
    <div className="flex-1 mx-auto justify-center bg-blue-200">
      <button onClick={handleCreateLocal}>CreateGame</button>
      <button onClick={handleCreateOnline}>create online game</button>
    </div>
  )
}

export default CreateGame
