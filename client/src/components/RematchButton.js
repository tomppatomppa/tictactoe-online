import React from 'react'

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
export default RematchButton
