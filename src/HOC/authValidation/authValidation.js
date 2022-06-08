import React, {useState} from 'react'

export const useAuthValidation = () => {
  const [value, setValue] = useState('')
  const [isToched, setIsToched] = useState(false)
  const [isError, setIsError] = useState(false)

  const putValue = (e) => {
    setValue(e.target.value.trim())
  }

  const checkToched = () => {
    
    setIsToched(true)
  }

  const clearValue = () => {
    setValue('')
  }

  const valueValidation = (data) => {
    switch(data.type) {
      case 'email': const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        const valid = re.test(String(value).toLowerCase())
        if(value) {
          setIsError(!valid)
         }
       break
       case 'password': (value && (value.length < data.minLength)) ? setIsError(true) : setIsError(false)
    }
  }

  return {
    value,
    isToched, 
    putValue,
    isError,
    checkToched,
    valueValidation,
    clearValue
  }

}
