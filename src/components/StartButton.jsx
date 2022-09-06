import React from 'react'

const StartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='start w-16 h-16 border-2 border-red-500 rounded-full p-3'>
        <div className="w-full h-full rounded-md bg-red-500"></div>
    </button>
  )
}

export default StartButton