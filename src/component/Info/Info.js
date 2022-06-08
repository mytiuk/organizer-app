import React from 'react'
import { useNavigate } from 'react-router'
import create from '../../img/create.png'
import './Info.css'

export const Info = () => {
  const navigate = useNavigate()
  const text = 'Created by - Nick Mytiuk-'
  const textArray = text.split('')
  
  return (
    <section className='info'>
      <div className='infoCard'>
        <div className='circle' style={{backgroundImage: `url(${create})`}} onClick={() => navigate('/')}></div>
        <div className='infoText'>
          {textArray.map((char, index) => <span key={index} style={{transform: `rotate(${index * 14}deg)`}}>{char}</span>)}
        </div>
      </div>
    </section>
  )
}
