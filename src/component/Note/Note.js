import React, {useState, useContext, useEffect} from 'react'
import { FirebaseContext } from '../../HOC/Context/FirebaseContext'
import { ADD_NOTE } from '../../HOC/FirebaseState/actionType'
import { Loader } from '../../UI/Loader/Loader'

import './Note.css'

export const Note = () => {

  const [value, setValue] = useState('')
  const [chosenIcon, setChosenIcon] = useState({})
  const [selectBtn, setSelectBtn] = useState(false)

  const [select, setSelect] = useState([
    {icon: 'fa fa-cutlery', color: '#7d3af8'},
    {icon: 'fa fa-meetup', color: '#35aaf3'},
    {icon: 'fa fa-cc-discover', color: '#ea65fb'},
    {icon: 'fa fa-birthday-cake', color: '#f7b05e'},
    {icon: 'fa fa-cart-arrow-down', color: '#47f83a'},
    {icon: 'fa fa-cogs', color: '#35f3c4'},
    {icon: 'fa fa-cc-discover', color: '#ff08'},
    {icon: 'fa fa-heart-o', color: '#f84d3a'},
    {icon: 'fa fa-hotel', color: '#f0f359'},
    {icon: 'fa fa-money', color: '#8758f3'},
    {icon: 'fa fa-soccer-ball-o', color: '#96f358'},
    {icon: 'fa fa-plane', color: '#58daf3'},
    {icon: 'fa fa-car', color: '#3aebee'},
    {icon: 'fa fa-eercast', color: '#f83a73'},
    {icon: 'fa fa-bell-o', color: '#3a67ee'},
    {icon: 'fa fa-briefcase', color: '#3aee58'},
    {icon: 'fa fa-child', color: '#d859e8'},
    {icon: 'fa fa-bullseye', color: '#f44336'},
  ])

  const url = 'https://organizer-app-5859b-default-rtdb.europe-west1.firebasedatabase.app//'
  const {notes, loading, postHandler, getNote, removeNote, userId, userIdUpdater} = useContext(FirebaseContext)
 
  const postNote = () => {
    if(value && (value.length < 30) && userId) {
      const note = {
        text: value,
        date: new Date().toLocaleDateString(),
        icon: chosenIcon.icon ? chosenIcon.icon : '',
        color: chosenIcon.color ? chosenIcon.color : ''
      }

      postHandler(note, url, ADD_NOTE)
      setChosenIcon({})
      setValue('')
    }
  }   

  const selectIcon = (index) => {
    setChosenIcon(select[index])
    setSelectBtn(false)
  }

  const removeNoteHandler = (id) => {
    removeNote(url, id)

  }

  useEffect(() => {
    getNote(url)
  }, [userId])

  useEffect(() => {
    userIdUpdater()
  }, [])

  const renderList = () => {
   return notes.map((item, index) => {
     const note = item.notes 
    return (
      <li key={index} className='noteList'> 
        <i className={note.icon} style={{color: note.color}}></i>&nbsp;
        <p>{note.text}</p>&nbsp;<small>{note.date}</small>
        <ion-icon onClick={() => removeNoteHandler(item.id)} className='close' name='close'></ion-icon>
      </li>
    )
    })
  }
  
  const renderSelect = () => {
    return select.map((item, index) => {
      return (
            <li key={index}
              onClick={() => selectIcon(index)}
              className='selectList'><i 
              className={item.icon} 
              style={{color: item.color}}
              ></i>
            </li>
          )
        })
  }

  return (
    <div className='noteBox'>
      <input type='text' value={value} onChange={e => setValue(e.target.value)}></input>
      <input  onClick={() => setSelectBtn(prev => !prev)} type='text' className='selectIcon' placeholder='🔘' readOnly/>
      <i id = 'check' className='fa fa-check' onClick={postNote}></i>
      <div className='option'>
          <ul className={ selectBtn ? 'selectUl active': 'selectUl'} >
            {renderSelect()}
          </ul>
       </div>
      {!userId ? <div className='loaderNote'>Sing in to create a note</div> : null}
      {userId && notes.length === 0 && !loading ? <div className='loaderNote'>Create a note</div> : null}
      {loading ? <div className='loaderNote'> <Loader/></div> : <ul>{renderList()}</ul>}
    </div>
  )
}
