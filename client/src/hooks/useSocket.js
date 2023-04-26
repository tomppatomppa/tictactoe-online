import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../utils/config'

const useSocket = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(SOCKET_URL)
    setSocket(newSocket)

    // Disconnect socket when the component unmounts
    return () => {
      newSocket.disconnect()
    }
  }, [])

  return socket
}

export default useSocket
