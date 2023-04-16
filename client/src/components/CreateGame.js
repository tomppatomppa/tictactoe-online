import React from 'react'
import gameServices from '../services/gamesService'
import useCurrentUser from '../hooks/useCurrentUser'

const CreateGame = () => {
  const { user } = useCurrentUser()

  const createNewGame = async (type) => {
    try {
      const game = await gameServices.create(
        { type: type, gridSize: 4 },
        user.token
      )
      console.log(game)
    } catch (e) {
      console.log(e)
    }
  }
  const handleCreateOnline = () => {
    createNewGame('online')
  }

  const handleCreateLocal = () => {
    createNewGame('local')
  }

  return (
    <div>
      <button onClick={handleCreateLocal}>CreateGame</button>
      <button onClick={handleCreateOnline}>create online game</button>
    </div>
  )
}

export default CreateGame
