import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import gameServices from '../services/gamesService'
import { replayLobbyHeaders } from '../utils/config'
import { findGame } from '../utils/helpers'
import { Grid } from '../components/Game/Grid'

const Replay = () => {
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardData = await gameServices.replay()
      setGames(leaderboardData)
    }
    fetchData()
  }, [])

  const handleOnClick = (action) => {
    const game = findGame(games, action.gameId)
    setSelectedGame(game)
  }
  const handleGridItem = (move) => {
    console.log(move)
  }
  return (
    <div className="flex justify-center mt-24">
      {!selectedGame && (
        <DataTable
          headers={replayLobbyHeaders}
          data={games}
          onClick={handleOnClick}
        />
      )}
      {selectedGame && (
        <div className="flex-col">
          <button className="btn-primary" onClick={() => setSelectedGame(null)}>
            return
          </button>
          <Grid gameState={selectedGame} handleAction={handleGridItem} />
          <div className="flex justify-between">
            <button
              className="btn-primary"
              onClick={() => setSelectedGame(null)}
            >
              move back
            </button>
            <button
              className="btn-primary"
              onClick={() => setSelectedGame(null)}
            >
              advance
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Replay
