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
const deleteMe = async (id, token) => {
  const { data } = await axios.delete(`${baseUri}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
const userService = { me, deleteMe }

export default userService
