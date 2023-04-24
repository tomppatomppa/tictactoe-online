import React, { useState } from 'react'

function DropdownMenu({ title, options, onSelect, children }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className=" text-white bg-black top-12 flex-col flex">
      <button className="btn-primary" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && (
        <ul className="absolute top-12 right-0 bg-gray-700 w-26 p-2">
          {children}
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer hover:bg-amber-600"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
