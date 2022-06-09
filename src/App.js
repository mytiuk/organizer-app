import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Navbar } from './UI/Navbar/Navbar'
import { DragElement } from './HOC/DragElement/DragElement'
import { ButtonCard } from './UI/ButtonCard/ButtonCard'
import { Clock } from './UI/Clock/Clock'
import { FirebaseState } from './HOC/FirebaseState/FirebaseState'
import { Auth } from './component/Auth/Auth'
import { Logout } from './component/Logout/Logout'
import { Background } from './UI/Background/Background'
import { Contact } from './component/Contact/Contact'
import { Info } from './component/Info/Info'

function App() {
  return (
    <div className="App">
       <FirebaseState>
          <Background>
              <Clock/>
              <DragElement>
                <Navbar/>
              </DragElement>
              <ButtonCard>
                <Routes>
                  <Route index path='/' element={<div>Hello</div>}/>
                  <Route path='/auth' element={<Auth/>}/>
                  <Route path='/logout' element={<Logout/>}/>
                  <Route path='/contact' element={ <Contact/>}/>
                  <Route path='/info' element={<Info/>}/>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </ButtonCard>
          </Background>
        </FirebaseState>
    </div>
  )
}

export default App
