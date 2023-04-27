import React from 'react'
import { Link } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import useLogin from '../hooks/useLogin'
import DropdownMenu from './DropdownMenu'

import LoginForm from './LoginForm'

import { useMutation } from 'react-query'
import loginServices from '../services/loginService'
import userService from '../services/userService'

const Navbar = () => {
  const { user, resetCurrentUser } = useCurrentUser()
  const { login } = useLogin()

  const { mutate: register } = useMutation({
    mutationFn: (userCredentials) => loginServices.register(userCredentials),
    onSuccess: (data, variables, context) => {
      login(variables)
    },
  })

  const { mutate: deleteAccount } = useMutation({
    mutationFn: () => userService.deleteMe(user.id, user.token),
    onSuccess: (data) => {
      console.log(data)
      resetCurrentUser()
    },
  })

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
      <div className="uppercase font-semibold text-white">
        <div className="flex gap-4 flex-wrap-reverse items-center justify-end p-1">
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
      </div>
    )
  }

  const logInMenu = () => {
    return (
      <div className={`relative flex gap-4`}>
        <DropdownMenu title={'Login'} options={[]}>
          <LoginForm onSubmit={login} onRegister={register} />
        </DropdownMenu>
      </div>
    )
  }
  return (
    <nav className="w-full bg-black flex justify-start p-4 z-50 divide-x-2 ">
      <strong className="text-white flex-1 self-start md:self-center uppercase tracking-widest mr-2">
        TicTacToe
      </strong>
      {user ? loggedInMenu() : logInMenu()}
    </nav>
  )
}

export default Navbar
