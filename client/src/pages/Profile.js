import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
import DataTable from '../components/DataTable'
import { buttonStyle } from '../utils/config'
import useGame from '../hooks/useGame'
const headers = {
  id: 'id',
  gridSize: 'gridSize',
}
const deleteButton = {
  target: [],
  match: [],
  text: 'Delete',
  dispatch: ['id'],
  type: 'delete',
  style: { ...buttonStyle, backgroundColor: 'red' },
}
const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null)
  const { deleteGame, message } = useGame(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardData = await userService.me(user.token)
        setProfile(leaderboardData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [user, deleteGame])

  if (!profile) return <div>loading...</div>

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <h2> MY GAMES</h2>
      <div>{message}</div>
      <div>
        <DataTable
          headers={headers}
          data={profile.myGames}
          entity={[{ ...deleteButton }]}
          onClick={(action) => deleteGame(action.data.id)}
        />
      </div>
    </div>
  )
}

export default Profile
