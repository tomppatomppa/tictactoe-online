import axios from 'axios'

const baseUri = '/api/login'

const login = async ({ username, password }) => {
  const { data } = await axios.post(baseUri, { username, password })
  return data
}

const loginServices = { login }

export default loginServices
