import { useEffect, useState } from 'react'
import { isMyGame, isPlayerGame } from '../utils/helpers'

const useGames = (socket, user) => {
  const [onlineGames, setOnlineGames] = useState([])

  const updateGame = (updatedGame) => {
    setOnlineGames((prevGames) => {
      const updatedGames = prevGames.map((game) => {
        if (game.id === updatedGame.id) {
          return updatedGame
        } else {
          return game
        }
      })
      return updatedGames
    })
  }
  const removeGame = (updatedGame) => {
    const { id } = updatedGame
    setOnlineGames((prevGames) => {
      const filteredGames = prevGames.filter((game) => game.id !== id)
      return filteredGames
    })
  }
  useEffect(() => {
    if (socket) {
      socket.on('games:all', (allGames) => {
        setOnlineGames(allGames)
      })
      socket.on('games:new-game', (createdGame) => {
        setOnlineGames((prevGames) => [...prevGames, createdGame])
      })
      socket.on('games:player-joined-game', (joinedGame) => {
        if (isMyGame(joinedGame, user) || isPlayerGame(joinedGame, user)) {
          updateGame(joinedGame)
        } else {
          removeGame(joinedGame)
        }
      })
      socket.on('games:delete', (deletedGame) => {
        removeGame(deletedGame)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return { onlineGames, setOnlineGames, updateGame }
}

export default useGames
