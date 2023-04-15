import { useEffect, useState } from 'react'

const useGames = (socket) => {
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

  useEffect(() => {
    if (socket) {
      socket.on('initial-game-state', (allGames) => {
        setOnlineGames(allGames)
      })
      socket.on('new-created-game', (createdGame) => {
        setOnlineGames((prevGames) => [...prevGames, createdGame])
      })
      socket.on('player-joined-game', (joinedGame) => {
        updateGame(joinedGame)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return { onlineGames, setOnlineGames, updateGame }
}

export default useGames
