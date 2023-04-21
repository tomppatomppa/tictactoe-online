import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGameSocket from './Game/hooks/useGameSocket'
import { Grid } from './Game/Grid'
import useMakeMove from './Game/hooks/useMakeMove'
import GameBoardInfo from './GameBoardInfo'
import useGame from '../hooks/useGame'

const GameBoard = () => {
  let { id } = useParams()
  const { gameState, handleRematch, rematchId } = useGameSocket(id)
  const sendMove = useMakeMove(id)
  const { rematch } = useGame()

  if (!gameState) return <div>loading...</div>

  return (
    <div className="flex flex-col items-center">
      <GameBoardInfo gameState={gameState} />
      <Grid gameState={gameState} handleAction={sendMove} />
      <button onClick={handleRematch}>Rematch</button>
      {rematchId && (
        <button onClick={() => rematch(rematchId)}>Go To Rematch</button>
      )}
    </div>
  )
}

export default GameBoard
