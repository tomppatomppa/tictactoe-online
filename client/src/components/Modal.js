import React from 'react'

const Modal = ({ openModal, setOpenModal, children }) => {
  console.log(openModal)
  if (!openModal) return
  return (
    <div className="fixed z-10 w-screen h-screen backdrop-blur-sm">
      <button onClick={() => setOpenModal(false)}>close</button>
      <div className="absolute bg-red-200 items-center justify-center bottom-1/2 left-1/2">
        {children}
      </div>
    </div>
  )
}

export default Modal
