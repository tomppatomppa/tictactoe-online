import React from 'react'
import { Link } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import useLogin from '../hooks/useLogin'

const Navbar = () => {
  const { user, resetCurrentUser } = useCurrentUser()
  const { login, loginSecond } = useLogin()

  const handleLogin = () => {
    login({ username: 'tomi', password: 'password' })
  }
  const handleLoginSecond = () => {
    loginSecond({ username: 'kalle', password: 'password' })
  }

  const handleLogout = () => {
    resetCurrentUser()
  }

  const loggedInMenu = () => {
    return (
      <div className="flex gap-4 flex-wrap uppercase font-semibold items-center text-white">
        <Link to={'/games'}>Games</Link>
        <Link to={'/'}>Leaderboards</Link>
        <Link to={'/profile'}>Profile</Link>
        <Link className="btn-primary" onClick={handleLogout}>
          logout
        </Link>
      </div>
    )
  }

  const logInMenu = () => {
    return (
      <div className="flex gap-4 ">
        <Link className="btn-primary" onClick={handleLogin}>
          Login Tomi
        </Link>
        <Link className="btn-primary" onClick={handleLoginSecond}>
          Login Kalle
        </Link>
      </div>
    )
  }
  return (
    <nav className="w-full  bg-black flex justify-end p-4">
      {user ? loggedInMenu() : logInMenu()}
    </nav>
  )
}

export default Navbar
