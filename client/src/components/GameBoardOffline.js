import React, { useEffect, useState } from 'react'
import { Grid, checkGame } from './Game/Grid'

import { Ai, isLastMove, nextInTurn } from './GameAi'
import gameServices from '../services/gamesService'
import GameBoardInfo from './GameBoardInfo'

const GameBoardOffline = ({ game, setLocalGame }) => {
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

  const handleRematch = () => {
    setGameState({
      ...gameState,
      inTurn: gameState.player1,
      isFinished: false,
      moves: [],
      winner: null,
    })
  }

  if (!gameState) return <div>loading...</div>

  return (
    <div className="flex flex-col items-center">
      <GameBoardInfo gameState={gameState} />
      <Grid gameState={gameState} handleAction={handleOnClick} />
      {gameState.isFinished && <button onClick={handleRematch}>Rematch</button>}
    </div>
  )
}

export default GameBoardOffline
