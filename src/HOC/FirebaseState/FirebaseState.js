import React, {useReducer} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FirebaseContext } from '../Context/FirebaseContext'
import { firebaseReducer } from './FirebaseReducer'
import {LOADER_RUNNER, USER_ID_UPDATER, GET_NOTE, REMOVE_NOTE,
         CLEAN_STATE, LOG_OUT, ERROR, STOP_LOADER} from '../FirebaseState/actionType'


export const FirebaseState = ({children}) => {

  const initialValue = {
    notes: [], 
    loading: false,
    userId: '', 
    error: false
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialValue)
  const navigate = useNavigate()
  
  const runLoader = () => {
    dispatch({
      type: LOADER_RUNNER
    })
  }

  const cleanState = () => {
    dispatch({
      type: CLEAN_STATE
    })
  }

  const postHandler = async(notes, url, type) => {

    try {
      if(type === 'ADD_NOTE') {
       const response = await axios.post(`${url}${state.userId}.json`, notes) 

        dispatch({
          type: type,
          payload: {id: response.data.name, notes},
        })
      } else {
        const response = await axios.post(url, notes)
        localStorage.setItem('userId', response.data.localId)   //-------Local Storage-----//
        dispatch({
          type: type,
          payload: response.data.localId
        })
          navigate('/')
      }

    } catch (error) { 
        console.log(error)
        dispatch({type: ERROR})
     }
  }  

  const getNote = async(url) => {
    if(!state.userId) return
    runLoader()

    try { 
      cleanState()

      if(state.userId) {

        const response = await axios.get(`${url}${state.userId}.json`)
        Object.keys(response.data).forEach(key => {
          const payload = {
            id: key,
            notes: response.data[key]
          } 
          
           dispatch({type: GET_NOTE, payload})
         
        }) 
      } else {
         return 
       }
 
    } catch (error) {
       console.log(error)
       dispatch({type: STOP_LOADER})
      }
  }

  const userIdUpdater = () => {
      const userId = localStorage.getItem('userId')
      dispatch({
        type: USER_ID_UPDATER,
        payload: userId
      })
  }

  const removeNote = async(url, id) => {

    try {
      const response = await axios.delete(`${url}${state.userId}/${id}.json`)
      dispatch({
        type: REMOVE_NOTE,
        payload: id
      })
    } catch (e) {
      console.log(e)
     }
  } 

  const logOut = () => {
    localStorage.removeItem('userId')

    dispatch({type: LOG_OUT})
  }

  return (
    <FirebaseContext.Provider value={{
      notes: state.notes,
      loading: state.loading,
      userId: state.userId,
      error: state.error,
      userIdUpdater, logOut,
      postHandler, getNote, removeNote
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}
