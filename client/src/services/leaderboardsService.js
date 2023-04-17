import axios from 'axios'

const baseUri = '/api/leaderboards'
const getLeaderboard = async () => {
  const { data } = await axios.get(`${baseUri}`)
  return data
}

const leaderboardServices = { getLeaderboard }

export default leaderboardServices
