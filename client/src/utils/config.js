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

/**
 * Custom Buttons
 */
const waitButton = {
  target: ['player1', 'player2'], //target fields
  match: [null, null], //match target fields
  text: 'waiting', // button text
  dispatch: ['player1', 'id'], //What to include in the onClick data field
  type: 'wait', // what action to dispatch in the onClick
  style: { ...buttonStyleWait }, // button color
}
const playButton = {
  target: ['player1'], //target fields
  match: [null], //match target fields
  text: 'Play', // button text
  dispatch: ['id'], //What to include in the onClick data field
  type: 'play', // what action to dispatch in the onClick
  style: buttonStyle, // button color
}
const joinButton = {
  target: ['player2'], //target fields
  match: [null], //match target fields
  text: 'Join', // button text
  dispatch: ['id'], //What to include in the onClick data field
  type: 'join', // what action to dispatch in the onClick
  style: { ...buttonStyle, backgroundColor: 'blue' }, // button color
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
  waitButton,
  playButton,
  joinButton,
}
