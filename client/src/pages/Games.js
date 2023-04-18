import React from 'react'

import CreateGame from '../components/CreateGame'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'
import { isMyGame } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'

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
    const { player2, type, isFinished } = game
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
              ? isFinished
                ? `${game.id} ENDED`
                : `${game.id} Ready To Play`
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

const gameLobbyLabels = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  gridSize: 'gridSize',
}
const Games = ({ onlineGames }) => {
  const { user } = useCurrentUser()

  const myGames = onlineGames.filter((game) => game.player1 === user.id)
  const myGamesAsPlayer2 = onlineGames.filter(
    (game) => game.player2 === user.id
  )
  console.log(myGamesAsPlayer2)
  const joinableGames = onlineGames.filter(
    (game) => game.userId !== user.id && game.player2 !== user.id
  )

  return (
    <div className="flex flex-col items-center">
      <DataTable headers={gameLobbyLabels} data={onlineGames} />
      {/* Games Lobby
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
        <div>
          <span>As player2 games</span>
          <MyGames user={user} myGames={myGamesAsPlayer2} />
        </div>
      </div> */}
    </div>
  )
}

export default Games
