import useCurrentUser from '../../../hooks/useCurrentUser'
import gameServices from '../../../services/gamesService'

const useMakeMove = (id) => {
  const { user } = useCurrentUser()
  const sendMove = async (move) => {
    try {
      await gameServices.makeMove(id, move, user.token)
    } catch (err) {
      console.log(err)
    }
  }
  const sendOfflineMove = async (move) => {
    try {
      await gameServices.makeOfflineMove(id, move, user.token)
    } catch (err) {
      console.log(err)
    }
  }

  return { sendMove, sendOfflineMove }
}

export default useMakeMove
