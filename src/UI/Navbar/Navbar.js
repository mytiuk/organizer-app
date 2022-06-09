import React, { useState, useEffect, useContext } from 'react'
import { NavbarContext } from '../../HOC/Context/NavbarContext'
import { Note } from '../../component/Note/Note'
import { Calculator } from '../../component/Calculator/Calculator'
import { CalendarComponent } from '../../component/Calendar/Calendar' 
import { Game } from '../../component/Game/Game'
import { News } from '../../component/News/News'
import './Navbar.css'

export const  Navbar = () => {

  const [store, setStore] = useState(false)
  const [type, setType] = useState(null)
  const [cardType, setCardType] = useState('card')
  const [index, setIndex] = useState(2)
  const [icon, setIcon] = useState([
    {name: "calendar-outline", type: 'list'},
    {name: "calculator-outline", type: 'list'},
    {name: "globe-outline", type: 'list active'},
    {name: "game-controller-outline", type: 'list'},
    {name: "reader-outline", type: 'list'},
    ])
  const cards = [<CalendarComponent/>, <Calculator/>, <News/>, <Game/>, <Note/>]

  useEffect(() => {
    if(store) {
      setCardType('card active')
      // list.forEach(item => item.classList.remove('active'))
      // list[2].classList.add('active')
    } else {
      setCardType('card')
    }
  }, [store])

  const list = document.querySelectorAll('.list')

  const clickHandler = (index) => {
    setIndex(index)
    setCardType('card')
    list.forEach(item => item.classList.remove('active'))
    list[index].classList.add('active')
  }

   useEffect(() => {
     setType(prev => prev + 1)
  }, [])

  const renderIcon = () => {
   return icon.map((item, index) => {
      return (
        <li className={item.type} onClick={() => clickHandler(index)} key={index} >
        <a >
          <span className='icon' onDoubleClick={() => setStore(prev => !prev)}><ion-icon name={item.name}></ion-icon></span>
        </a>
      </li>
      )
    })
  }
    
  return (
    <NavbarContext.Provider value={{store}}>
      <div className='navigation' >
        <ul>
          {renderIcon()}
          <div className='indicator'></div> 
        </ul>
      </div>
      <div className={ cardType} >
        {cards[index]}
      </div>
    </NavbarContext.Provider>
   )
  }
