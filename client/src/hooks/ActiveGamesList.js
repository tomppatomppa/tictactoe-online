import React from 'react'

const ActiveGamesList = ({ activeGames }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-xl">Active Games</span>
      {activeGames.map((game) => (
        <div key={game}>{game}</div>
      ))}
    </div>
  )
}

export default ActiveGamesList
