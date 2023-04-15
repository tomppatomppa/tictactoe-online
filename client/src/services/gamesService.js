import axios from 'axios'

const baseUri = '/api/games'

const getAll = async () => {
  const { data } = await axios.get(baseUri)
  return data
}

const create = async (game, token) => {
  const { data } = await axios.post(baseUri, game, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

const gameServices = { getAll, create }

export default gameServices
