import React from 'react'
import useCurrentUser from './useCurrentUser'
import loginServices from '../services/loginService'

const useLogin = () => {
  const { setUser } = useCurrentUser()

  const login = async (userCredentials) => {
    try {
      const user = await loginServices.login(userCredentials)
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  return login
}

export default useLogin
