import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import { initialLocalGameState } from '../utils/config'

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
        ...initialLocalGameState,
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
        navigate(`/games`)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return { join, create }
}

export default useGame
