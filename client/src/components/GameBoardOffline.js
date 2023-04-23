import React, { useEffect, useState } from 'react'

import gameServices from '../services/gamesService'
import GameBoardInfo from './GameBoardInfo'
import { Ai, checkGame, isLastMove, nextInTurn } from '../utils/tictactoe'
import { Grid } from './Grid'

const GameBoardOffline = ({ game }) => {
  const [gameState, setGameState] = useState(game)
  const gameAi = new Ai()

  const handleMakeMove = (move) => {
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
    try {
      await gameServices.saveGame(gameState)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (gameState.inTurn === gameState.player2) {
      const move = gameAi.nextMove(gameState)
      handleMakeMove(move)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.inTurn])

  if (gameState.isFinished) {
    handleSaveGame()
  }

  const handleSetRematch = () => {
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
    <div className="flex flex-col items-center text-white">
      <GameBoardInfo gameState={gameState} />
      <Grid gameState={gameState} handleAction={handleMakeMove} />
      {gameState.isFinished && (
        <button className="btn-primary my-6" onClick={handleSetRematch}>
          Rematch
        </button>
      )}
    </div>
  )
}

export default GameBoardOffline
