import { useContext } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

const useCurrentUser = () => {
  return useContext(CurrentUserContext)
}

export default useCurrentUser
