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
    <div className="">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleSubmit} />
      </Modal>
      <div className="flex justify-center ">
        <DataTable
          onClick={join}
          headers={gameLobbyLabels}
          entity={user.id}
          data={onlineGames}
        >
          <div className="w-full flex justify-between">
            <button
              onClick={() => setOpenModal(!openModal)}
              className="bg-black text-gray-400"
            >
              Create A Game
            </button>
            <button className="border" onClick={handleCreateLocal}>
              Offline Game
            </button>
            <button onClick={create}>Online game</button>
          </div>
        </DataTable>
      </div>
    </div>
  )
}

export default Games
