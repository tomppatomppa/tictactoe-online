import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Games from './pages/Games'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import useSocket from './hooks/useSocket'
import gameServices from './services/gamesService'
import { useLocalStorage } from './hooks/useLocalStorage'
import useCurrentUser from './hooks/useCurrentUser'

function App() {
  const { user, setUser } = useCurrentUser()
  const socket = useSocket()
  const authstorage = useLocalStorage()

  useEffect(() => {
    const user = authstorage.getAccessToken()
    if (user) {
      setUser(user)
    }
  }, [])

  const sendEvent = async () => {
    socket.emit('hello', 'hello there')
    try {
      const response = await gameServices.getAll()
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('get-all-users', (message) => {
        console.log(message)
      })
    }
  }, [socket])

  return (
    <div className='App'>
      <Navbar />
      <button className='bg-red-200' onClick={sendEvent}>
        click
      </button>
      <Routes>
        <Route path='*' element={<Leaderboard />} />
        <Route path='/' element={<Leaderboard />} />
        <Route element={<ProtectedRoute isAllowed={user} redirectPath='/' />}>
          <Route path='profile' element={<Profile />} />
          <Route path='games' element={<Games />} />
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default App
