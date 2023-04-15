import { useContext } from 'react'
import LocalStorageContext from '../contexts/LocalStorageContext'

export const useLocalStorage = () => {
  return useContext(LocalStorageContext)
}
