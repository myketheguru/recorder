import React from 'react'

const PopupModal = ({ show, children }) => {
  return (
    <div className={`confirm-box fixed w-full h-full top-0 left-0 bg-[#202020dd] flex flex-col justify-center items-center transition-all ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        { children }
    </div>
  )
}

export default PopupModal