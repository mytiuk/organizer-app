import React, {useContext, useEffect} from 'react'
import { FirebaseContext } from '../../HOC/Context/FirebaseContext'
import { useNavigate } from 'react-router-dom'


export const Logout = () => {

  const navigate = useNavigate()
  const {logOut} = useContext(FirebaseContext)

  useEffect(() => {
   logOut()  
   navigate('/')
  }, [])
}
