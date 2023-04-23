const baseUri = '/api/games'
const SOCKET_URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

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
const replayLobbyHeaders = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  winner: 'winner',
}
const buttonStyleWait = {
  width: '100%',
  height: '100%',
  backgroundColor: 'red',
  color: '#FFFFFF',
  textAlign: 'center',
  fontWeight: '600',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  animation: 'pulse 2s infinite',
  ':hover': {
    backgroundColor: '#1F2937',
  },
  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #DBEAFE',
    backgroundColor: '#1F2937',
  },
}
const buttonStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  backgroundColor: 'green',
  color: '#FFFFFF',
  fontWeight: '600',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#1F2937',
  },
  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #DBEAFE',
    backgroundColor: '#1F2937',
  },
}
export {
  baseUri,
  initialLocalGameState,
  gameLobbyHeaders,
  leaderBoardHeaders,
  replayLobbyHeaders,
  SOCKET_URL,
  buttonStyleWait,
  buttonStyle,
}
