import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'

const initialState = {
  moves: [],
  isFinished: false,
  type: 'local',
  gridSize: 4,
  inTurn: 2,
  player1: 2,
  player2: 'AI',
  winner: null,
}

const useGame = (user, setLocalGame) => {
  const navigate = useNavigate()

  const join = async (action) => {
    if (action.type === 'join') {
      try {
        await gameServices.join(action.gameId, user.token)
      } catch (err) {
        console.log(err)
      }
    } else if (action.type === 'start') {
      navigate(`/games/${action.gameId}`)
    }
  }
  const create = async ({ type, gridSize }) => {
    if (type === 'local') {
      setLocalGame({
        ...initialState,
        gridSize: gridSize,
        inTurn: user.id,
        player1: user.id,
      })
      navigate('/games/offline')
    } else {
      try {
        await gameServices.create(
          { type: type, gridSize: gridSize },
          user.token
        )
      } catch (e) {
        console.log(e)
      }
    }
  }

  return { join, create }
}

export default useGame
