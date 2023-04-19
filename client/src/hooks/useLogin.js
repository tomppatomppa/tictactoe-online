import useCurrentUser from './useCurrentUser'
import loginServices from '../services/loginService'
import { useLocalStorage } from './useLocalStorage'
import { useEffect } from 'react'

const useLogin = () => {
  const authstorage = useLocalStorage()
  const { setCurrentUser, setUser } = useCurrentUser()

  const login = async (userCredentials) => {
    try {
      const user = await loginServices.login(userCredentials)
      setCurrentUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  const loginSecond = async (userCredentials) => {
    try {
      const user = await loginServices.login(userCredentials)
      setCurrentUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  const setUserLogin = () => {
    const user = authstorage.getAccessToken()
    if (user) {
      setUser(JSON.parse(user))
    }
  }

  useEffect(() => {
    setUserLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, loginSecond }
}

export default useLogin
