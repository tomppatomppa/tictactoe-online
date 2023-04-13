import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Leaderboard from './pages/Leaderboard'

function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="*" element={<Leaderboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          element={<ProtectedRoute isAllowed={user} redirectPath="/login" />}
        >
          <Route path="/game" element={<Game />} />
          <Route path="/home" element={<Home />} />
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
