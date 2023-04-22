import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import { buttonStyle, buttonStyleWait, gameLobbyHeaders } from '../utils/config'
import { useNavigate } from 'react-router-dom'
const templateEntity = [
  {
    target: ['player1', 'player2'], //target fields
    match: [1, null], //match target fields
    text: 'waiting', // button text
    dispatch: ['player1', 'id'], //What to include in the onClick data field
    action: 'wait', // what action to dispatch in the onClick
    style: buttonStyleWait, // button color
  },
  {
    target: ['player1'], //target fields
    match: [1], //match target fields
    text: 'Play', // button text
    dispatch: ['player1', 'id'], //What to include in the onClick data field
    action: 'play', // what action to dispatch in the onClick
    style: buttonStyle, // button color
  },
  {
    target: ['player2'], //target fields
    match: [1], //match target fields
    text: 'Play', // button text
    dispatch: ['player1', 'id'], //What to include in the onClick data field
    action: 'play', // what action to dispatch in the onClick
    style: buttonStyle, // button color
  },
  {
    target: ['player2'], //target fields
    match: [null], //match target fields
    text: 'Join', // button text
    dispatch: ['id'], //What to include in the onClick data field
    action: 'join', // what action to dispatch in the onClick
    style: { ...buttonStyle, backgroundColor: 'blue' }, // button color
  },
]
const Games = ({ onlineGames = [], setLocalGame }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const { user } = useCurrentUser()
  const { create, join } = useGame(user, setLocalGame)

  const handleSubmit = (game) => {
    try {
      create(game)
      setOpenModal(false)
    } catch (e) {
      console.log(e)
    }
  }
  const onClickHandler = (data) => {
    console.log(data)
  }
  return (
    <div className="mt-24 text-white">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleSubmit} />
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
            onClick={onClickHandler}
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
