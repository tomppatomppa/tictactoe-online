import React from 'react'
import { useParams } from 'react-router-dom'
import useGameSocket from './Game/hooks/useGameSocket'
import { Grid } from './Game/Grid'
import useMakeMove from './Game/hooks/useMakeMove'

const GameBoard = () => {
  let { id } = useParams()
  const { gameState, message } = useGameSocket(id)
  const makeMove = useMakeMove(id)

  if (!gameState) return <div>loading...</div>

  return (
    <div className="flex flex-col ">
      <h2>Game ID {gameState.id}</h2>
      <h2>Previous Move: {message}</h2>
      <h2 className="text-blue-400">inTurn {gameState?.inTurn}</h2>
      <h2 className="text-green-400">winner {gameState?.winner}</h2>

      <Grid gameState={gameState} handleAction={makeMove} />
    </div>
  )
}

export default GameBoard
