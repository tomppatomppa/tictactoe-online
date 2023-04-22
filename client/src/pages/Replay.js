import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import gameServices from '../services/gamesService'
import { replayLobbyHeaders } from '../utils/config'
import { findGame } from '../utils/helpers'
import { Grid } from '../components/Game/Grid'
import useReplay from '../hooks/useReplay'

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
    const game = findGame(games, action.gameId)
    handleSetGame(game)
  }
  const handleAdvance = () => {
    console.log('advance')
  }
  const handleBacktrace = () => {
    console.log('go back')
  }
  return (
    <div className="flex justify-center mt-24">
      {!game && (
        <DataTable
          headers={replayLobbyHeaders}
          data={games}
          onClick={handleSelectGame}
        />
      )}
      {game && (
        <div className="flex-col">
          <button className="btn-primary" onClick={() => handleSetGame(null)}>
            return
          </button>
          <Grid gameState={game} />
          <div className="flex justify-between">
            <button className="btn-primary" onClick={back}>
              move back
            </button>
            <button className="btn-primary" onClick={advance}>
              advance
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Replay
