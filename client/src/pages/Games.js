import React, { useState } from 'react'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'

const gameLobbyLabels = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  gridSize: 'gridSize',
}

const Games = ({ onlineGames, setLocalGame }) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { user } = useCurrentUser()
  const { create, join } = useGame(user, setLocalGame)

  const handleCreateLocal = () => {
    navigate('/games/offline')
  }
  const handleSubmit = (game) => {
    create(game)
  }
  return (
    <div>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleSubmit} />
      </Modal>
      <div>
        <div className="flex justify-center ">
          <DataTable
            onClick={join}
            headers={gameLobbyLabels}
            entity={user.id}
            data={onlineGames}
          ></DataTable>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="bg-black p-2 mt-2 text-gray-400 hover:text-white self-end"
          >
            Create A Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default Games
