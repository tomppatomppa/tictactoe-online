import React, { useEffect, useState } from 'react'
import { Grid, checkGame } from './Game/Grid'

import { Ai, isLastMove, nextInTurn } from './GameAi'
import gameServices from '../services/gamesService'

const GameBoardOffline = ({ game }) => {
  const [gameState, setGameState] = useState(game)
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
    if (isLastMove(updatedState)) {
      updatedState.isFinished = true
    }
    setGameState(updatedState)
  }
  const handleSaveGame = async () => {
    await gameServices.saveGame(gameState)
    console.log('save result')
  }

  useEffect(() => {
    if (gameState.inTurn === gameState.player2) {
      const move = gameAi.nextMove(gameState)
      handleOnClick(move)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.inTurn])

  if (gameState.isFinished) {
    handleSaveGame()
  }

  if (!gameState) return <div>loading...</div>

  return (
    <div className="flex flex-col items-center">
      <div className="self-start">
        <h2>Game ID {gameState.id}</h2>
        <h2>Game type {gameState.type}</h2>
        <h2>Game winner {gameState.winner}</h2>
        <h2>
          Is Finished:
          {gameState.isFinished ? 'true' : 'false'}
        </h2>
        <h2 className="text-blue-400">inTurn {gameState?.inTurn}</h2>
        <h2 className="text-green-400">winner {gameState?.winner}</h2>
      </div>
      <Grid gameState={gameState} handleAction={handleOnClick} />
    </div>
  )
}

export default GameBoardOffline
