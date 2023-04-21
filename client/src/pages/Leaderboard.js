import React, { useEffect, useState } from 'react'

import leaderboardServices from '../services/leaderboardsService'
import DataTable from '../components/DataTable'
import { leaderBoardHeaders } from '../utils/config'

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
    <div className="flex justify-center mt-24">
      <DataTable headers={leaderBoardHeaders} data={leaderboard} />
    </div>
  )
}

export default Leaderboard
