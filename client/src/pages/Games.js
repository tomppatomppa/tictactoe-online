import React from 'react'

import CreateGame from '../components/CreateGame'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'

const OnlineGamesList = ({ games }) => {
  const { user } = useCurrentUser()

  //Check if user is a player in the game
  //If not creator show join game button
  //When the game has 2 players show Play button

  const handleJoinGame = async (id) => {
    try {
      await gameServices.join(id, user.token)
    } catch (err) {
      console.log(err)
    }
  }
  const GameItem = ({ game }) => {
    if (game.userId === user.id) {
      return (
        <div>
          {game.id} waiting for a player to join your game
          {game.player2 && (
            <button className="bg-green-300 border rounded-md px-2 animate-pulse">
              start
            </button>
          )}
        </div>
      )
    }
    return (
      <div className="hover:bg-green-200 flex" key={game.id}>
        <span className="flex-1">
          GameId: {game.id} type: {game.type}
        </span>

        {!game.player2 ? (
          <button
            onClick={() => handleJoinGame(game.id)}
            className="bg-blue-300 border rounded-md px-2 animate-pulse"
          >
            join
          </button>
        ) : (
          <button
            onClick={() => console.log('play')}
            className="bg-blue-300 border rounded-md px-2 animate-pulse"
          >
            Play
          </button>
        )}
      </div>
    )
  }
  return (
    <div className="border">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  )
}
const Games = ({ onlineGames }) => {
  return (
    <div className="flex flex-col items-center">
      Games Lobby
      <div>
        <OnlineGamesList games={onlineGames} />
        <CreateGame />
      </div>
    </div>
  )
}

export default Games
