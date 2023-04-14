import React, { useState } from 'react'

const CurrentUserContext = React.createContext()

export default CurrentUserContext

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
