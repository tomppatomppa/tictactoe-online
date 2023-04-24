import axios from 'axios'
const baseUri = '/api/users/me'

const me = async (token) => {
  const { data } = await axios.get(baseUri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

const userService = { me }

export default userService
