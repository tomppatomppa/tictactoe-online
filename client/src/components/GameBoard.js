import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useMakeMove from '../hooks/useMakeMove'
import GameBoardInfo from './GameBoardInfo'
import { Grid } from './Grid'
import useGameSocket from '../hooks/useGameSocket'

const RematchButton = ({ gameState, gameId, handleRematch }) => {
  const { isFinished } = gameState
  if (!isFinished) return
  return (
    <>
      {gameId === null && (
        <button className="btn-primary my-6" onClick={handleRematch}>
          Rematch
        </button>
      )}
    </>
  )
}
const GameBoard = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const { gameState, handleRematch, rematchGameId } = useGameSocket(id)
  const sendMove = useMakeMove(id)

  useEffect(() => {
    if (rematchGameId) {
      navigate(`/games/${rematchGameId}`)
    }
  }, [rematchGameId, navigate])

  if (!gameState || !id) return <div>loading...</div>

  return (
    <div className="flex flex-col items-center">
      <GameBoardInfo gameState={gameState} />
      <Grid gameState={gameState} handleAction={sendMove} />
      <RematchButton
        gameState={gameState}
        gameId={rematchGameId}
        handleRematch={handleRematch}
      />
    </div>
  )
}

export default GameBoard
