import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import { initialLocalGameState } from '../utils/config'

const useGame = (user, setLocalGame) => {
  const navigate = useNavigate()

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
  const rematch = async (gameId) => {
    navigate(`/games/${gameId}`)
  }
  const actionHandler = async (action) => {
    const { type, data } = action

    if (type === 'play') {
      console.log('go play')
      navigate(`/games/${data.id}`)
    }

    if (type === 'join') {
      try {
        await gameServices.join(data.id, user.token)
      } catch (err) {
        console.log(err)
      }
    }

    if (type === 'wait') {
      console.log('Still waiting for a player')
    }
  }

  return { create, rematch, actionHandler }
}

export default useGame
