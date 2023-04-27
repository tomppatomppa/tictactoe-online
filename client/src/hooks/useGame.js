import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

let timeoutId = null

const useGame = (user) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSetMessage = (message) => {
    setMessage(message)
    if (timeoutId) clearInterval(timeoutId)
    timeoutId = setTimeout(() => {
      setMessage('')
    }, 2000)
  }
  const actionHandler = async (action) => {
    const { type, data } = action
    if (type === 'play') navigate(`/games/${data.id}`)
    if (type === 'join') join(data.id)
  }

  const { mutate: join } = useMutation({
    mutationFn: (id) => gameServices.join(id, user.token),
    onSuccess: (data) => {
      toast.success(`Joined game ${data.id}`)
    },
  })
  const { mutate: create } = useMutation({
    mutationFn: ({ type, gridSize }) =>
      gameServices.create({ type: type, gridSize: gridSize }, user.token),
    onSuccess: (data) => {
      toast.success(`Created game ${data.id}`)
    },
  })

  const { mutate: sendMove } = useMutation({
    mutationFn: ({ id, move }) => gameServices.makeMove(id, move, user.token),
    onError: (err) => {
      setMessage(err.response.data.error)
    },
  })
  const { mutate: deleteGame } = useMutation({
    mutationFn: (id) => gameServices.deleteOne(id, user.token),
    onSuccess: (data) => {
      queryClient.invalidateQueries('profile')
      toast.success(JSON.stringify(data))
    },
    onError: (err) => {
      handleSetMessage(err.response.data.error)
    },
  })

  return { create, actionHandler, sendMove, message, deleteGame }
}

export default useGame
