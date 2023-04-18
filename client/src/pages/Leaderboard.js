import React, { useEffect, useState } from 'react'
import LeaderboardTable from '../components/LeaderboardTable'

import leaderboardServices from '../services/leaderboardsService'

const data = [
  { ranking: 1, name: 'Team A', wins: 10, losses: 2, ties: 3 },
  { ranking: 2, name: 'Team B', wins: 8, losses: 4, ties: 3 },
  { ranking: 3, name: 'Team C', wins: 6, losses: 5, ties: 4 },
  { ranking: 4, name: 'Team D', wins: 5, losses: 7, ties: 3 },
  { ranking: 5, name: 'Team E', wins: 3, losses: 9, ties: 3 },
]

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const leaderboardData = await leaderboardServices.getLeaderboard()
  //     setLeaderboard(leaderboardData)
  //   }
  //   fetchData()
  // }, [])
  // console.log(leaderboard)
  return (
    <div className="flex justify-center">
      <LeaderboardTable players={data} />
    </div>
  )
}

export default Leaderboard
