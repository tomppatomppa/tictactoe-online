import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import { buttonStyle, buttonStyleWait, gameLobbyHeaders } from '../utils/config'
import { useNavigate } from 'react-router-dom'
const userId = 1
const templateEntity = [
  {
    target: ['player1', 'player2'], //target fields
    match: [userId, null], //match target fields
    text: 'waiting', // button text
    dispatch: ['player1', 'id'], //What to include in the onClick data field
    type: 'wait', // what action to dispatch in the onClick
    style: { ...buttonStyleWait }, // button color
  },
  {
    target: ['player1'], //target fields
    match: [userId], //match target fields
    text: 'Play', // button text
    dispatch: ['id'], //What to include in the onClick data field
    type: 'play', // what action to dispatch in the onClick
    style: buttonStyle, // button color
  },
  {
    target: ['player2'], //target fields
    match: [userId], //match target fields
    text: 'Play', // button text
    dispatch: ['id'], //What to include in the onClick data field
    type: 'play', // what action to dispatch in the onClick
    style: buttonStyle, // button color
  },
  {
    target: ['player2'], //target fields
    match: [null], //match target fields
    text: 'Join', // button text
    dispatch: ['id'], //What to include in the onClick data field
    type: 'join', // what action to dispatch in the onClick
    style: { ...buttonStyle, backgroundColor: 'blue' }, // button color
  },
]
const Games = ({ onlineGames = [], setLocalGame }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const { user } = useCurrentUser()
  const { create, actionHandler } = useGame(user, setLocalGame)

  const handleCreateGame = (game) => {
    create(game)
    setOpenModal(false)
  }

  return (
    <div className="mt-24 text-white">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleCreateGame} />
      </Modal>
      <div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="btn-primary my-6"
          >
            Create A Game
          </button>
          <button
            onClick={() => navigate('/replay')}
            className="btn-primary my-6"
          >
            Replay Mode
          </button>
        </div>
        <div className="flex justify-center">
          <DataTable
            onClick={actionHandler}
            headers={gameLobbyHeaders}
            entity={templateEntity}
            data={onlineGames}
          />
        </div>
      </div>
    </div>
  )
}

export default Games
