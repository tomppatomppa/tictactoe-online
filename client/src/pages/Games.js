import React, { useEffect, useState } from 'react'
import gameServices from '../services/gamesService'

const OnlineGamesList = ({ games }) => {
  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>{game.id}</div>
      ))}
    </div>
  )
}
const Games = () => {
  const [onlineGames, setOnlineGames] = useState([])

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await gameServices.getAll()
        setOnlineGames(response)
        console.log(response)
      } catch (e) {
        console.log(e)
      }

      // ...
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      Games
      <div>
        <OnlineGamesList games={onlineGames} />
      </div>
    </div>
  )
}

export default Games
