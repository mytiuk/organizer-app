import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import './ButtonCard.css'

export const ButtonCard = ({children}) => {
  const [changer, setChanger] = useState(false)
  const [toggleType, setToggleType] = useState('toggleBtn')
  const [contType, setContType] = useState('container')
  const [icon, setIcon] = useState([
    { path: '/', name: "home-outline", type: 'btnList', color: '#46E37E'},
    { path: '/auth', name: "person-outline", type: 'btnList', color: '#4b81fa'},
    { path: '/logout', name: "exit-outline", type: 'btnList', color: '#C696F9'},
    { path: '/contact', name: "logo-whatsapp", type: 'btnList', color: '#b1fc03'},
    { path: '/info', name: "information-circle-outline", type: 'btnList', color: '#FA49BE'}
  ])

  const list = document.querySelectorAll('.btnList')

  useEffect(() => {
    if(changer) {
      setToggleType('toggleBtn active')
      setContType('container active')
      list.forEach(item => item.classList.remove('active'))
    } else {
      setToggleType('toggleBtn')
      setContType('container')
     }
  }, [changer])

  const changeActive = (index) => {
    list.forEach(item => item.classList.remove('active'))
    list[index].classList.add('active')
    setChanger(false)
  }

  const renderList = () => {
    return icon.map((item, index) => {
      return (
          <li key={index} 
            style={{'--clr':item.color}}
            className={item.type} 
            onClick={() => changeActive(index)}>
              {index === 2 
                ? <a href={item.path}>
                    <span>
                      <ion-icon  name={item.name}></ion-icon>
                    </span>
                  </a>
                : <NavLink to={item.path}  >
                    <span>
                      <ion-icon  name={item.name}></ion-icon>
                    </span>
                  </NavLink>
              }
          </li>
        )
    })
  }

  return (
    <>
      <div className={contType}>
        <div className='content'>
          <ul>
            {renderList()}
          </ul>
        </div>
      </div>
      <div onClick={() => setChanger(prev => !prev)} className={toggleType}>
        <ion-icon name="grid-outline"></ion-icon>
      </div>
      {children}
    </>
  )
}
