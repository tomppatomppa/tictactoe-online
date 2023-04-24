import React from 'react'

const GameBoardInfo = ({ gameState }) => {
  const { id, inTurn, type, winner, isFinished } = gameState
  return (
    <div className="md:self-start m-2 font-semibold divide-y-2 text-white border border-white p-2">
      <h2>GAME ID: {id}</h2>
      <h2>
        GAME TYPE: <span className="text-amber-600 uppercase">{type}</span>
      </h2>

      <h2>
        IS FINISHED:{' '}
        <span
          className={`${
            isFinished ? 'text-green-600' : 'text-red-600'
          } uppercase`}
        >
          {isFinished.toString()}
        </span>
      </h2>
      <h2>
        IN TURN: <span className="text-amber-600 font-extrabold">{inTurn}</span>
      </h2>
      {isFinished && (
        <h2 className="text-green-500">
          WINNER:{' '}
          <span className={`text-amber-600`}>
            {winner === null ? 'TIE' : winner}
          </span>
        </h2>
      )}
    </div>
  )
}

export default GameBoardInfo
