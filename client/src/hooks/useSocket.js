import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

const useSocket = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(URL)
    setSocket(newSocket)

    // Disconnect socket when the component unmounts
    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('get-initial-games')
    }
  }, [socket])

  return socket
}

export default useSocket
