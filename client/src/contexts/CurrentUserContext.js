import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CurrentUserContext = React.createContext()

export default CurrentUserContext

export const CurrentUserProvider = ({ children }) => {
  const authstorage = useLocalStorage()
  const [user, setUser] = useState(null)

  const setCurrentUser = (user) => {
    setUser(user)
    authstorage.setAccessToken(JSON.stringify(user))
  }

  const resetCurrentUser = () => {
    setUser(null)
    authstorage.removeAccessToken()
  }

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, setCurrentUser, resetCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
