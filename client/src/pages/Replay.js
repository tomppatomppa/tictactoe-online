import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import gameServices from '../services/gamesService'
import { buttonStyle, replayLobbyHeaders } from '../utils/config'
import { findGame } from '../utils/helpers'

import useReplay from '../hooks/useReplay'
import { Grid } from '../components/Grid'

const templateEntity = [
  {
    target: ['type'], //target fields
    match: ['online'], //match target fields
    text: 'Replay', // button text
    dispatch: ['id'], //What to include in the onClick data field
    action: 'replay', // what action to dispatch in the onClick
    style: buttonStyle, // button color
  },
]

const Replay = () => {
  const [games, setGames] = useState([])
  const { game, handleSetGame, advance, back } = useReplay()

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardData = await gameServices.replay()
      setGames(leaderboardData)
    }
    fetchData()
  }, [])

  const handleSelectGame = (action) => {
    const game = findGame(games, action.data.id)
    handleSetGame(game)
  }

  return (
    <div className="flex justify-center mt-24">
      {!game && (
        <DataTable
          headers={replayLobbyHeaders}
          data={games}
          onClick={handleSelectGame}
          entity={templateEntity}
        />
      )}
      {game && (
        <div className="flex-col text-white">
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => handleSetGame(null)}
              className="uppercase bg-red-600 p-2 animate-pulse"
            >
              <p>exit</p>
              replay mode
            </button>
          </div>
          <Grid gameState={game} />
          <div className="flex justify-between mt-2">
            <button className="btn-primary w-24" onClick={back}>
              back
            </button>
            <button className="btn-primary w-24" onClick={advance}>
              forward
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Replay
