import userService from '../services/userService'
import useCurrentUser from './useCurrentUser'

const useDeleteAccount = () => {
  const { user, resetCurrentUser } = useCurrentUser()
  const deleteAccount = async () => {
    try {
      await userService.deleteMe(user.id, user.token)
      resetCurrentUser()
    } catch (err) {
      console.log(err)
    }
  }
  return deleteAccount
}

export default useDeleteAccount
