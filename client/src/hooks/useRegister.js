import { useMutation } from 'react-query'
import loginServices from '../services/loginService'

const useRegister = () => {
  const { mutate } = useMutation((userCredentials) =>
    loginServices.register(userCredentials)
  )
  return { register: mutate }
}

export default useRegister
