import React from 'react'

const Modal = ({ openModal, setOpenModal, children }) => {
  if (!openModal) return
  return (
    <div className="fixed z-10 w-screen h-screen backdrop-blur-sm">
      <div className="flex justify-center">
        <button
          className="absolute right-1"
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
