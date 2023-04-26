import React, { useEffect, useState } from 'react'

const Spinner = (props) => {
  const { show = false, delay = 0, description = '' } = props
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    let timeout
    if (!show) {
      setShowSpinner(false)
      return
    }
    if (delay === 0) {
      setShowSpinner(true)
    } else {
      timeout = setTimeout(() => setShowSpinner(true), delay)
    }
    return () => {
      clearInterval(timeout)
    }
  }, [show, delay])

  return showSpinner ? (
    <div className="text-white items-center flex flex-col">
      <svg
        className="animate-spin -ml-1 mr-3 h-10 w-10"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <strong className="uppercase">{description}</strong>
    </div>
  ) : null
}

export default Spinner
