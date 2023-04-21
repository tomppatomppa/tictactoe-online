const baseUri = '/api/games'

const initialLocalGameState = {
  moves: [],
  isFinished: false,
  type: 'local',
  gridSize: 4,
  inTurn: null,
  player1: null,
  player2: 'AI',
  winner: null,
}
const gameLobbyHeaders = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  gridSize: 'gridSize',
}
const leaderBoardHeaders = {
  ranking: 'Ranking',
  username: 'Name',
  wins: 'Wins',
  losses: 'Losses',
  ties: 'Ties',
  winLossRatio: 'W/L',
  winLossTieRatio: 'W/L/T',
  totalGames: 'Total',
}
export { baseUri, initialLocalGameState, gameLobbyHeaders, leaderBoardHeaders }
