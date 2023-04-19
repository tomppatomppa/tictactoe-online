import React, { useEffect, useState } from 'react'
import { Grid, checkGame } from './Game/Grid'

import { Ai, isLastMove, nextInTurn } from './GameAi'
const initialState = {
  moves: [],
  isFinished: false,
  type: 'offline',
  gridSize: 5,
  userId: 2,
  inTurn: 2,
  player1: 2,
  player2: 'AI',
  updatedAt: '2023-04-19T09:20:42.109Z',
  createdAt: '2023-04-19T09:20:42.109Z',
  winner: null,
}
const GameBoardOffline = () => {
  const [gameState, setGameState] = useState(initialState)
  const gameAi = new Ai()

  const handleOnClick = (move) => {
    const updatedMoves = gameState.moves.concat([move])
    let updatedState = {
      ...gameState,
      moves: updatedMoves,
    }

    if (checkGame(updatedState, updatedState.inTurn)) {
      updatedState.isFinished = true
      updatedState.winner = gameState.inTurn
    } else {
      updatedState.inTurn = nextInTurn(gameState)
    }
    if (isLastMove(gameState)) {
      updatedState.isFinished = true
    }
    setGameState(updatedState)
  }

  useEffect(() => {
    if (gameState.inTurn === gameState.player2) {
      const move = gameAi.nextMove(gameState)
      handleOnClick(move)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.inTurn])

  if (gameState.isFinished) {
    console.log('dispatch result')
  }

  if (!gameState) return <div>loading...</div>

  return (
    <div className="flex flex-col ">
      <h2>Game ID {gameState.id}</h2>
      <h2>Game type {gameState.type}</h2>
      <h2>Game winner {gameState.winner}</h2>

      <h2>Is Finished: {gameState.isFinished ? 'true' : 'false'}</h2>
      <h2 className="text-blue-400">inTurn {gameState?.inTurn}</h2>
      <h2 className="text-green-400">winner {gameState?.winner}</h2>
      <Grid gameState={gameState} handleAction={handleOnClick} />
    </div>
  )
}

export default GameBoardOffline
