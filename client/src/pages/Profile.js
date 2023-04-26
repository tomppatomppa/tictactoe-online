import React from 'react'
import userService from '../services/userService'
import DataTable from '../components/DataTable'
import { buttonStyle, playButton } from '../utils/config'
import useGame from '../hooks/useGame'
import { useQuery } from 'react-query'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'

const headers = {
  id: 'id',
  gridSize: 'gridSize',
  player1: 'player1',
  player2: 'player2',
  inTurn: 'inTurn',
}
const myActiveGamesHeaders = {
  id: 'id',
  gridSize: 'gridSize',
  player1: 'player1',
  player2: 'player2',
  inTurn: 'inTurn',
}
const leaderboardHeaders = {
  wins: 'wins',
  losses: 'losses',
  ties: 'ties',
}
const deleteButton = {
  target: [],
  match: [],
  text: 'DELETE',
  dispatch: ['id'],
  type: 'delete',
  style: { ...buttonStyle, backgroundColor: 'red' },
}

const Profile = ({ user }) => {
  const { deleteGame, actionHandler, message } = useGame(user)
  const { isLoading, data, isError, error } = useQuery(['profile'], () =>
    userService.me(user.token)
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
    <div className="flex flex-col sm:mx-auto  text-white gap-y-4">
      <Spinner show={isLoading} delay={400} description="loading leaderboard" />
      {data && (
        <>
          <div>{message}</div>
          <h2> MY STATS</h2>
          <DataTable headers={leaderboardHeaders} data={data.leaderboard} />
          <h2>MY ACTIVE GAMES</h2>
          <DataTable
            headers={myActiveGamesHeaders}
            data={data.myActiveGames}
            entity={[
              { ...playButton, match: [user.id] },
              { ...playButton, target: ['player2'], match: [user.id] },
            ]}
            onClick={actionHandler}
          />
          <h2> MY GAMES</h2>
          <DataTable
            headers={headers}
            data={data.myGames}
            entity={[{ ...deleteButton }]}
            onClick={(action) => deleteGame(action.data.id)}
          />
        </>
      )}
    </div>
  )
}

export default Profile
