import React from 'react'

const StopButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='stop w-16 h-16 border-2 border-red-500 rounded-full p-1'>
        <div className="w-full h-full rounded-full bg-red-500"></div>
    </button>
  )
}

export default StopButton