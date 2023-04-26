import useCurrentUser from './useCurrentUser'
import loginServices from '../services/loginService'
import { useLocalStorage } from './useLocalStorage'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const useLogin = () => {
  const authstorage = useLocalStorage()
  const { setCurrentUser, setUser } = useCurrentUser()

  const { mutate } = useMutation({
    mutationFn: (userCredentials) => loginServices.login(userCredentials),
    onSuccess: (user) => {
      setCurrentUser(user)
    },
  })

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

  return { login: mutate }
}

export default useLogin
