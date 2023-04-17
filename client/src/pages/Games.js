import React from 'react'

import CreateGame from '../components/CreateGame'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'
import { isMyGame } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

const OnlineGamesList = ({ user, games }) => {
  const navigate = useNavigate()

  const handleStartGame = (id) => {
    navigate(`/games/${id}`)
  }
  const handleJoinGame = async (id) => {
    try {
      await gameServices.join(id, user.token)
    } catch (err) {
      console.log(err)
    }
  }
  const GameItem = ({ game }) => {
    const { player2, type } = game
    const isOnline = type === 'online' ? true : false
    const isPlayable = player2 === null ? false : true

    if (isMyGame(game, user)) {
      return (
        <div
          className={`flex ${
            isOnline ? 'bg-transparent' : 'bg-orange-200'
          } hover:bg-green-200`}
        >
          <span className="flex-1">
            {isPlayable
              ? 'Go and play'
              : `${game.id} waiting for a player to join...`}
          </span>
          {player2 && (
            <button
              onClick={() => handleStartGame(game.id)}
              className="bg-green-300 border rounded-md px-2 animate-pulse"
            >
              Play
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
        {!player2 ? (
          <button
            onClick={() => handleJoinGame(game.id)}
            className="bg-blue-300 border rounded-md px-2 animate-pulse"
          >
            join
          </button>
        ) : (
          <button
            onClick={() => handleStartGame(game.id)}
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
const MyGames = ({ user, myGames }) => {
  return (
    <div className="flex flex-col">
      <OnlineGamesList user={user} games={myGames} />
    </div>
  )
}
const Games = ({ onlineGames }) => {
  const { user } = useCurrentUser()

  const myGames = onlineGames.filter(
    (game) => game.userId === user.id || game.player2 === user.id
  )
  const joinableGames = onlineGames.filter(
    (game) => game.userId !== user.id && game.player2 !== user.id
  )
  return (
    <div className="flex flex-col items-center">
      Games Lobby
      <div className="flex gap-12">
        <div>
          <span>public games</span>
          <OnlineGamesList user={user} games={joinableGames} />
        </div>
        <CreateGame />
        <div>
          <span>my games</span>
          <MyGames user={user} myGames={myGames} />
        </div>
      </div>
    </div>
  )
}

export default Games
