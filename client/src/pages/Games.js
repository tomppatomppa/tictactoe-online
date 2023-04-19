import React from 'react'

import CreateGame from '../components/CreateGame'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'

const gameLobbyLabels = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  gridSize: 'gridSize',
}
const Games = ({ onlineGames }) => {
  const navigate = useNavigate()
  const { user } = useCurrentUser()

  const handleJoinGame = async (action) => {
    if (action.type === 'join') {
      try {
        await gameServices.join(action.gameId, user.token)
      } catch (err) {
        console.log(err)
      }
    } else {
      navigate(`/games/${action.gameId}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <DataTable
        onClick={handleJoinGame}
        headers={gameLobbyLabels}
        data={onlineGames}
      />
      <CreateGame />
    </div>
  )
}

export default Games
