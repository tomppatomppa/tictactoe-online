import React from 'react'
import { Link } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import useLogin from '../hooks/useLogin'
import DropdownMenu from './DropdownMenu'

import LoginForm from './LoginForm'
import useDeleteAccount from '../hooks/useDeleteAccount'

const Navbar = () => {
  const { user, resetCurrentUser } = useCurrentUser()
  const { login, register } = useLogin()
  const deleteAccount = useDeleteAccount()
  const handleLogout = () => {
    resetCurrentUser()
  }

  function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account?'
    )
    if (confirmed) {
      deleteAccount()
    }
  }

  const loggedInMenu = () => {
    return (
      <div className="flex gap-4 flex-wrap-reverse justify-end uppercase font-semibold items-center text-white ">
        <Link to={'/games'}>Games</Link>
        <Link to={'/'}>Leaderboards</Link>
        <div className={`relative flex gap-4`}>
          <DropdownMenu title={'Profile'} options={[]}>
            <div className="flex flex-col gap-4">
              <h2>{user.username}</h2>
              <Link to={'/profile'}>Profile</Link>
              <Link className="btn-primary" onClick={handleLogout}>
                logout
              </Link>
              <Link onClick={handleDelete} className="btn-danger">
                delete
              </Link>
            </div>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  const logInMenu = () => {
    return (
      <div className={`relative flex gap-4 `}>
        <DropdownMenu title={'Login'} options={[]}>
          <LoginForm onSubmit={login} onRegister={register} />
        </DropdownMenu>
      </div>
    )
  }
  return (
    <nav className="w-full bg-black flex justify-end p-4 z-50">
      {user ? loggedInMenu() : logInMenu()}
    </nav>
  )
}

export default Navbar
