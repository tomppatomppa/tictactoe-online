import React, { useEffect, useState } from 'react'

import leaderboardServices from '../services/leaderboardsService'
import DataTable from '../components/DataTable'

const leaderBoardLabels = {
  ranking: 'Ranking',
  username: 'Name',
  wins: 'Wins',
  losses: 'Losses',
  ties: 'Ties',
  winLossRatio: 'W/L',
  winLossTieRatio: 'W/L/T',
  totalGames: 'Total',
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardData = await leaderboardServices.getLeaderboard()
      setLeaderboard(leaderboardData)
    }
    fetchData()
  }, [])

  return (
    <div className="flex justify-center">
      <DataTable headers={leaderBoardLabels} data={leaderboard} />
    </div>
  )
}

export default Leaderboard
