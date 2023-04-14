import axios from 'axios'

const baseUri = '/api/games'

const getAll = async () => {
  const { data } = await axios.get(baseUri)
  return data
}

const gameServices = { getAll }

export default gameServices
