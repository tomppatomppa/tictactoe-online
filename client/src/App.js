import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Games from './pages/Games'
import Navbar from './components/Navbar'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import useSocket from './hooks/useSocket'

import useCurrentUser from './hooks/useCurrentUser'
import useLogin from './hooks/useLogin'
import useGames from './hooks/useGames'

import GameBoardOffline from './components/GameBoardOffline'
import { useState } from 'react'
import Replay from './pages/Replay'
import GameBoardOnline from './components/GameBoardOnline'
import { Grid } from './components/Grid'

function App() {
  const socket = useSocket()
  const { user } = useCurrentUser()
  const { onlineGames } = useGames(socket, user)
  const [localGame, setLocalGame] = useState(null)
  useLogin()

  return (
    <div className="App bg-background-pattern bg-cover bg-center h-full ">
      <Navbar />

      <Routes>
        <Route path="*" element={<Leaderboard />} />
        <Route path="/" element={<Leaderboard />} />
        <Route element={<ProtectedRoute isAllowed={user} redirectPath="/" />}>
          <Route path="profile" element={<Profile />} />
          <Route
            path="games"
            element={
              <Games onlineGames={onlineGames} setLocalGame={setLocalGame} />
            }
          />
          <Route path="games/:id" element={<GameBoardOnline />} />
          <Route
            path="games/offline/"
            element={<GameBoardOffline game={localGame} />}
          />
          <Route path="/replay" element={<Replay />} />
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
