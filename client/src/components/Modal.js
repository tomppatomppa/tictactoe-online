import React from 'react'

const Modal = ({ openModal, setOpenModal, children }) => {
  if (!openModal) return
  return (
    <div className="fixed z-10 w-screen h-screen backdrop-blur-sm">
      <div className="flex justify-center">
        <button
          className="relative -right-60 top-12 h-5 text-xl text-white"
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
