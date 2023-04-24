import React from 'react'

const GameBoardInfo = ({ gameState }) => {
  const { id, inTurn, type, winner, isFinished } = gameState
  return (
    <div className="md:self-start m-2 text-white">
      <h2>Game ID {id}</h2>
      <h2>Game type {type}</h2>
      <h2>Game winner {winner}</h2>
      <h2>
        Is Finished:
        {isFinished ? 'true' : 'false'}
      </h2>
      <h2 className="text-blue-400">inTurn {inTurn}</h2>
      <h2 className="text-green-400">winner {winner}</h2>
    </div>
  )
}

export default GameBoardInfo
