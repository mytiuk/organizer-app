import React from 'react'
import './Loader.css'

export const Loader = () => {
  
  const renderSpan = () => {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
    .map(item => {
      return (
        <span key={item} style={{'--i': `${item}`}}/>
      )
    })
  }
  return (
    <div className='loader'>
        {renderSpan()}
    </div>
  )
}
