import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(null)

  const handleLogin = () => {
    setUser('tomi')
  }
  const handleLogout = () => {
    setUser(null)
  }

  const loggedInMenu = () => {
    return (
      <div className="flex gap-4">
        <Link>Profile</Link>
        <Link>Leaderboards</Link>
        <Link onClick={handleLogout}>logout</Link>
      </div>
    )
  }
  return (
    <nav className="w-full bg-blue-200 flex justify-end p-4">
      {user ? loggedInMenu() : <Link onClick={handleLogin}>login</Link>}
    </nav>
  )
}

export default Navbar
