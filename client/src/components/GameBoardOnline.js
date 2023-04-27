import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import GameBoardInfo from './GameBoardInfo'
import { Grid } from './Grid'
import useGameSocket from '../hooks/useGameSocket'
import RematchButton from './RematchButton'
import useGame from '../hooks/useGame'
import useCurrentUser from '../hooks/useCurrentUser'
import GameBoardWarning from './GameBoardWarning'

const GameBoardOnline = () => {
  const { user } = useCurrentUser()
  const navigate = useNavigate()
  let { id } = useParams()

  const { gameState, handleRematch, rematchGameId, userCount } =
    useGameSocket(id)

  const { sendMove, message } = useGame(user)

  useEffect(() => {
    if (rematchGameId) {
      navigate(`/games/${rematchGameId}`)
    }
  }, [rematchGameId, navigate])

  if (!gameState || !id) return <div>loading...</div>

  return (
    <div className="flex flex-col items-center gap-2">
      <GameBoardInfo gameState={gameState} userCount={userCount} />
      <GameBoardWarning message={message} />
      <Grid
        gameState={gameState}
        handleAction={(move) => sendMove({ id, move })}
      />
      <RematchButton
        gameState={gameState}
        gameId={rematchGameId}
        handleRematch={handleRematch}
      />
    </div>
  )
}

export default GameBoardOnline
