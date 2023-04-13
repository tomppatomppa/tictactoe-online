import React from 'react'

const LeaderboardListItem = ({ player }) => {
  return (
    <tr key={player.ranking}>
      <td className="border px-4 py-2">{player.ranking}</td>
      <td className="border px-4 py-2">{player.name}</td>
      <td className="border px-4 py-2">{player.wins}</td>
      <td className="border px-4 py-2">{player.losses}</td>
      <td className="border px-4 py-2">{player.ties}</td>
      <td className="border px-4 py-2">
        {player.wins / (player.wins + player.losses + player.ties)}
      </td>
    </tr>
  )
}

const LeaderboardList = ({ players }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Ranking</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Wins</th>
            <th className="px-4 py-2">Losses</th>
            <th className="px-4 py-2">Ties</th>
            <th className="px-4 py-2">Ratio</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <LeaderboardListItem key={index} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardList
