import React from 'react'

const InfoLable = ({ description, buttonText, color }) => {
  return (
    <div className="bg-primary m-2 group cursor-help text-center">
      <div className="border p-1 w-16" style={{ backgroundColor: color }}>
        {buttonText}
      </div>
      <div className="absolute w-24 p-2 text-sm bg-black invisible group-hover:visible">
        {description}
      </div>
    </div>
  )
}

export default InfoLable
