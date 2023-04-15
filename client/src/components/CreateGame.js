import React from 'react'
import gameServices from '../services/gamesService'
import useCurrentUser from '../hooks/useCurrentUser'

const CreateGame = () => {
  const { user } = useCurrentUser()

  const createNewGame = async () => {
    try {
      const game = await gameServices.create(
        { type: 'online', gridSize: 4 },
        user.token
      )
      console.log(game)
    } catch (e) {
      console.log(e)
    }
  }
  return <button onClick={createNewGame}>CreateGame</button>
}

export default CreateGame
