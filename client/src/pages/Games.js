import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import { gameLobbyHeaders } from '../utils/config'

const Games = ({ onlineGames, setLocalGame }) => {
  const [openModal, setOpenModal] = useState(false)
  const { user } = useCurrentUser()
  const { create, join } = useGame(user, setLocalGame)

  const handleSubmit = (game) => {
    create(game)
  }

  return (
    <div className="mt-24">
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
