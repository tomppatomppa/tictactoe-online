import React from 'react'

import leaderboardServices from '../services/leaderboardsService'
import DataTable from '../components/DataTable'
import { leaderBoardHeaders } from '../utils/config'
import { useQuery } from 'react-query'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const Leaderboard = () => {
  const { isLoading, isError, data, error } = useQuery(['leaderboard'], () =>
    leaderboardServices.getLeaderboard()
  )

  if (isError)
    return (
      <ErrorMessage
        isError={isError}
        error={error}
        message="Something went wrong loading leaderboard"
      />
    )

  return (
    <div className="flex justify-center mt-24">
      <Spinner show={isLoading} delay={400} description="loading leaderboard" />
      {data && <DataTable headers={leaderBoardHeaders} data={data} />}
    </div>
  )
}

export default Leaderboard
