import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
import DataTable from '../components/DataTable'
import { buttonStyle, playButton } from '../utils/config'
import useGame from '../hooks/useGame'

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
  const [profile, setProfile] = useState(null)
  const [myGames, setMyGames] = useState([])
  const [myActiveGames, setMyActiveGames] = useState([])
  const { deleteGame, actionHandler, message } = useGame(user)

  const handleDelete = async (action) => {
    const { id } = action.data
    try {
      await deleteGame(id)
      setMyGames(myGames.filter((game) => game.id !== id))
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { myGames, leaderboard, myActiveGames } = await userService.me(
          user.token
        )
        setMyGames(myGames)
        setProfile(leaderboard)
        setMyActiveGames(myActiveGames)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!myGames) return <div>loading...</div>

  return (
    <div className="flex flex-col sm:mx-auto  text-white gap-y-4">
      <div>{message}</div>

      <h2> MY STATS</h2>
      <DataTable headers={leaderboardHeaders} data={profile} />
      <h2>MY ACTIVE GAMES</h2>
      <DataTable
        headers={myActiveGamesHeaders}
        data={myActiveGames}
        entity={[
          { ...playButton, match: [user.id] },
          { ...playButton, target: ['player2'], match: [user.id] },
        ]}
        onClick={actionHandler}
      />
      <h2> MY GAMES</h2>
      <DataTable
        headers={headers}
        data={myGames}
        entity={[{ ...deleteButton }]}
        onClick={handleDelete}
      />
    </div>
  )
}

export default Profile
