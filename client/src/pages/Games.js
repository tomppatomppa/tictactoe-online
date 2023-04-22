import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import { gameLobbyHeaders } from '../utils/config'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className="mt-24 text-white">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleSubmit} />
      </Modal>
      <div>
        <div className="flex justify-center">
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
            onClick={join}
            headers={gameLobbyHeaders}
            entity={user.id}
            data={onlineGames}
          />
        </div>
      </div>
    </div>
  )
}

export default Games
