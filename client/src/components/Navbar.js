import React from 'react'
import { Link } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import useLogin from '../hooks/useLogin'

const Navbar = () => {
  const { user, setUser } = useCurrentUser()
  const login = useLogin()

  const handleLogin = () => {
    login({ username: 'tomi', password: 'password' })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const loggedInMenu = () => {
    return (
      <div className='flex gap-4'>
        <Link to={'/games'}>Games</Link>
        <Link to={'/'}>Leaderboards</Link>
        <Link to={'/profile'}>Profile</Link>
        <Link onClick={handleLogout}>logout</Link>
      </div>
    )
  }
  return (
    <nav className='w-full bg-blue-200 flex justify-end p-4'>
      {user ? loggedInMenu() : <Link onClick={handleLogin}>login</Link>}
    </nav>
  )
}

export default Navbar
