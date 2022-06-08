import React, { useState, useEffect } from 'react'
import Parallax from 'parallax-js'
import { image } from '../../img/image'
import wave from '../../img/background/wave.png'
import cloud1 from '../../img/background/cloud1.png'
import cloud2 from '../../img/background/cloud2.png'
import './Background.css'

export const Background = ({children}) => {

  const clouds = [cloud1, cloud2, cloud1, cloud2, cloud1, cloud2, cloud1, cloud2, cloud1]

  useEffect(() => {
    const text = document.getElementById('text')
    const parallaxText = new Parallax(text)
    const icon = document.getElementById('funI')
    const parallaxIcon = new Parallax(icon)
  }, [])

  return (
    <>
      <section className='banner'>
        <div className='divCloud'>
        {clouds.map((cloud, index) => <img key={index} className={`cloud${index + 1}`} src={cloud}/>)}
        </div>

        <div className='summerCont'>
          <div id='scene'>
            <h2 id='text'>
              <span data-depth-y="1">S</span>
              <span data-depth-y="-2">u</span>
              <span data-depth-y="1">m</span>
              <span data-depth-y="-2">m</span>
              <span data-depth-y="-1">e</span>
              <span data-depth-y="2">r</span>
            </h2>
            <div  className='funIcon' id='funI'>
              {image.map((item, index) => <img className={`icon${index}`} data-depth-y={3.5 - index} key={index} src={item}/>)} 
            </div>
          </div>
        </div>
        <div className='wave' style={{backgroundImage: `url(${wave})`}}></div>
        <div className='wave1' style={{backgroundImage: `url(${wave})`}}></div>
        {children}
      </section>
    </>
  )
}
