import axios from 'axios'

const baseUri = '/api/login'

const login = async ({ username, password }) => {
  const { data } = await axios.post(baseUri, { username, password })
  return data
}
const register = async ({ username, password }) => {
  const { data } = await axios.post('/api/users', { username, password })
  return data
}

const loginServices = { login, register }

export default loginServices
