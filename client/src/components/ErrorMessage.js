import React, { useEffect, useState } from 'react'

const ErrorMessage = (props) => {
  const { isError, error, message } = props
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (isError) {
      setShowError(true)
    }
  }, [isError])

  return (
    showError && (
      <div className="flex items-center text-white flex-col">
        <strong className="text-red-600">{message}</strong>
        <p className="text-sm max-w-sm">{JSON.stringify(error)}</p>
      </div>
    )
  )
}

export default ErrorMessage
