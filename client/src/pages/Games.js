import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import {
  gameLobbyHeaders,
  joinButton,
  playButton,
  waitButton,
} from '../utils/config'
import { useNavigate } from 'react-router-dom'

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
            entity={[
              { ...waitButton, match: [user.id, null] },
              { ...playButton, match: [user.id] },
              { ...playButton, target: ['player2'], match: [user.id] },
              { ...joinButton },
            ]}
            data={onlineGames}
          />
        </div>
      </div>
    </div>
  )
}

export default Games
