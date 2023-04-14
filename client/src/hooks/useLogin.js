import React from 'react'
import useCurrentUser from './useCurrentUser'
import loginServices from '../services/loginService'
import { useLocalStorage } from './useLocalStorage'

const useLogin = () => {
  const { setCurrentUser } = useCurrentUser()

  const login = async (userCredentials) => {
    try {
      const user = await loginServices.login(userCredentials)
      setCurrentUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  return login
}

export default useLogin
