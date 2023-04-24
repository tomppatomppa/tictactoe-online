import React from 'react'
import { useInput } from '../hooks/useInput'

const LoginForm = ({ onSubmit, onRegister }) => {
  const [usernameProps] = useInput('')
  const [passwordProps] = useInput('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ username: usernameProps.value, password: passwordProps.value })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    onRegister({
      username: usernameProps.value,
      password: passwordProps.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        {...usernameProps}
        className="w-24 text-black p-1 my-2"
        type="text"
        placeholder="username"
        required
      />
      <input
        className="w-24 text-black p-1 my-2"
        {...passwordProps}
        type="text"
        placeholder="password"
        required
      ></input>
      <button type="submit" className="btn-primary w-full">
        Login
      </button>
      <button
        type="button"
        onClick={handleRegister}
        className="btn-primary w-full"
      >
        Register
      </button>
    </form>
  )
}

export default LoginForm
