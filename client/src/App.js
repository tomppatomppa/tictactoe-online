import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Games from './pages/Games'
import Navbar from './components/Navbar'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import useSocket from './hooks/useSocket'

import useCurrentUser from './hooks/useCurrentUser'
import useLogin from './hooks/useLogin'
import useGames from './hooks/useGames'
import GameBoard from './components/GameBoard'
import GameBoardOffline from './components/GameBoardOffline'

function App() {
  const socket = useSocket()
  const { user } = useCurrentUser()
  const { onlineGames } = useGames(socket, user)

  useLogin()

  return (
    <div className="App ">
      <Navbar />
      <Routes>
        <Route path="*" element={<Leaderboard />} />
        <Route path="/" element={<Leaderboard />} />
        <Route element={<ProtectedRoute isAllowed={user} redirectPath="/" />}>
          <Route path="profile" element={<Profile />} />
          <Route path="games" element={<Games onlineGames={onlineGames} />} />
          <Route path="games/:id" element={<GameBoard />} />
          <Route path="games/offline/" element={<GameBoardOffline />} />
          <Route path="home" element={<Home />} />
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
