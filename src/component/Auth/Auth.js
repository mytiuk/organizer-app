import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../../HOC/Context/FirebaseContext'
import {SING_UP, SING_IN} from '../../HOC/FirebaseState/actionType'
import {useAuthValidation} from '../../HOC/authValidation/authValidation'
import './Auth.css'

export const Auth = () => {

  const [data, setData] = useState({})
  const [isDisabled, setIsDisabled] = useState(true)
  const [activeBoxe, setActiveBox] = useState(false)
  const urlSingIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-c7-4YTykoX3jnthfc3y8O2co1Bs4HOc'
  const urlSingUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-c7-4YTykoX3jnthfc3y8O2co1Bs4HOc'

  const email = useAuthValidation()
  const password = useAuthValidation()
  const {postHandler, error} = useContext(FirebaseContext)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    email.valueValidation({type: 'email'})
    password.valueValidation({type: 'password', minLength: 5})

    if((email.value && !email.isError) 
    && (password.value.length > 5)) {
      const validData = {
        email: email.value,
        password: password.value,
        returnSecureToken: true
      }
      setData(validData)
      setIsDisabled(false)
  } else {
    setData({})
    setIsDisabled(true)
  }
 
  }, [email.value, password.value])

  const singIn = async() => {
    postHandler(data, urlSingIn, SING_IN)
    email.clearValue()
    password.clearValue()
    setData({}) 
  }

  const singUp = async() => {
    postHandler(data, urlSingUp, SING_UP)
    email.clearValue()
    password.clearValue()
    setData({})
  }

  const activeBoxHandler = () => {
    setActiveBox(prev => !prev)
    email.clearValue()
    password.clearValue()
  }

  return ( 
    <div className='authContainer'>
      <div className={ activeBoxe ? 'authBackground active' : 'authBackground'}>
        <div className='box signin'>
          <h2>Have an account ?</h2>
          <button className='singinBtn' onClick={activeBoxHandler}>Sing In</button>
        </div>
        <div className='box signup' >
          <h2> Don't have an account ?</h2>
          <button className='singupBtn' onClick={activeBoxHandler}>Sing Up</button>
        </div>
      </div>
        <div className={activeBoxe ? 'authForm active' : 'authForm'}>
          <div className='form signInForm'>
            <form onSubmit={e => submitHandler(e)}>
              <h3>Sing In</h3>
              {error ? <p className='error'>Incorrect password or email</p> : null}
              <input type='text'
                value={email.value} 
                onChange={e => email.putValue(e)} 
                onBlur={() => email.checkToched()}
                placeholder='Email'>
              </input>
              <input type='password' 
                value={password.value} 
                onChange={e => password.putValue(e)} 
                onBlur={() => password.checkToched()}
                placeholder='Password'>
              </input>
              <input type='submit'
                value='Log In'
                onClick={singIn}
                disabled={isDisabled}
                style={!isDisabled ? {background: '#32EBD9'} : {color: '#12C8B6'}}>
                </input>
            </form>
          </div>
          <div className='form signUpForm'>
            <form onSubmit={e => submitHandler(e)}>
              <h3>Sing Up</h3>
              <input type='text'
                value={email.value} 
                onChange={e => email.putValue(e)} onBlur={() => email.checkToched()}
                placeholder='Email'>
              </input>
              <input type='password' 
                value={password.value} 
                onChange={e => password.putValue(e)} onBlur={() => password.checkToched()}
                placeholder='Password'>
              </input>
              <input type='submit'
                value='Sing Up'
                onClick={singUp}
                disabled={isDisabled}
                style={!isDisabled ? {background: '#f71ee1c4'} : {color: '#f71ee1c4'}}>
                </input>
            </form>
          </div>
        </div>
    </div>
  )
}
