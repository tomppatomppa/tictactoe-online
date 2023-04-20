import React from 'react'

const Modal = ({ openModal, setOpenModal, children }) => {
  if (!openModal) return
  return (
    <div className="fixed z-10 w-screen h-screen backdrop-blur-sm">
      <div className="flex justify-center">
        <button
          className="relative -right-52 -top-16"
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
