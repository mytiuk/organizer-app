import React, {useState, useEffect} from 'react'
import './Calculator.css'

export const Calculator = () => {

  const [value1, setValue1] = useState([])
  const [value2, setValue2] = useState([])
  const [numberValue1, setNumberValue1] = useState('')
  const [numberValue2, setNumberValue2] = useState('')
  const [action, setAction] = useState('')
  const [addResult, setAddResult] = useState('')
  const [result, setResult] = useState('')

  const [showBtn, setShowBtn] = useState(false)

  const putValue = (e) => {
    if((value1.length === 0 && e === '.')) {
      
      return 
    } 
console.log(e === 0)
    if(!action) {
      setValue1(prev => [...prev, e])
    } else {
      setValue2(prev => [...prev, e])
    }    
  }

  useEffect(() => {
    setNumberValue1(value1.join(''))
    setNumberValue2(value2.join(''))
    const add = {
      action,
      value1: +value1.join(''),
      value2: +value2.join(''),
    }
       setAddResult(add)

  }, [value1, value2])

  const showResult = (type = '') =>  {
    setValue1([])
    setValue2([])
    setAction('')

    let res

    switch(addResult.action || type) {
      case '+':  res = addResult.value1 + addResult.value2
         setValue1(prev => [...prev, res])
        break
        case '-': res = addResult.value1 - addResult.value2
           setValue1(prev => [...prev, res])
          break
          case '×': res = addResult.value1 * addResult.value2
          if(Number.isInteger(res)) {
            setValue1(prev => [...prev, res])
          } else {
             setValue1(prev => [...prev, res.toFixed(4)])
          }
           break
           case '%': res = addResult.value1 / 100
              setValue1(prev => [...prev, res])
             break
             case '√': res = Math.sqrt(addResult.value1) 
                if(Number.isInteger(res)) {
                   setValue1(prev => [...prev, res])
                } else {
                  setValue1(prev => [...prev, res.toFixed(4)])
                 }
               break
               case '÷': res = addResult.value1 / addResult.value2
                if(res === Infinity) {
                  setValue1(prev => [...prev, 'Error'])
                  } else {
                    if(Number.isInteger(res)) {
                      setValue1(prev => [...prev, res])
                    } else {
                       setValue1(prev => [...prev, res.toFixed(4)])
                     }
                  } 
                break
    }
  }

  const cleanAll = () => {
    setValue1([])
    setValue2([])
    setAction('')
    setResult('')
  }

  const actionValidation = (action) => {
    if(value1.length !== 0) {
      setAction(action)
    } else {
       setAction('')
    }
    if((value1.length !==0) && (value2.length !== 0)) {
      showResult()
      setAction(action)
    }
  } 
  
  return (
      <div className='calcContain'>
        <input type='text' value={ (value1.length !== 0)? `${numberValue1}${action}${numberValue2}` : '0'} className={showBtn ? 'value active' : 'value'} readOnly name='txt' onClick={() => setShowBtn(prev => !prev)}/>

        <form className={showBtn ? 'calculator active': 'calculator'} name='calc'>    
          <span className='num' onClick={cleanAll} style={{'--i': '0', '--x': '-2', '--y': '-2'}}><i>AC</i></span>
          <span className='num' onClick={() => showResult('%')} style={{'--i': '1', '--x': '-1', '--y': '-2'}}><i>%</i></span>
          <span className='num' onClick={() => showResult('√')} style={{'--i': '2', '--x': '0', '--y': '-2'}}><i>√</i></span>
          <span className='num' onClick={() => actionValidation('÷')} style={{'--i': '3', '--x': '1', '--y': '-2'}}><i>÷</i></span>

          <span className='num' onClick={() => putValue(7)} style={{'--i': '4', '--x': '-2', '--y': '-1'}}><i>7</i></span>
          <span className='num' onClick={() => putValue(8)} style={{'--i': '5', '--x': '-1', '--y': '-1'}}><i>8</i></span>
          <span className='num' onClick={() => putValue(9)} style={{'--i': '6', '--x': '0', '--y': '-1'}}><i>9</i></span>
          <span className='num' onClick={() => actionValidation('×')} style={{'--i': '7', '--x': '1', '--y': '-1'}}><i>×</i></span>

          <span className='num' onClick={() => putValue(4)} style={{'--i': '8', '--x': '-2', '--y': '0'}}><i>4</i></span>
          <span className='num' onClick={() => putValue(5)} style={{'--i': '9', '--x': '-1', '--y': '0'}}><i>5</i></span>
          <span className='num' onClick={() => putValue(6)} style={{'--i': '10', '--x': '0', '--y': '0'}}><i>6</i></span>
          <span className='num' onClick={() => actionValidation('-')} style={{'--i': '11', '--x': '1', '--y': '0'}}><i>-</i></span>

          <span className='num' onClick={() => putValue(1)} style={{'--i': '12', '--x': '-2', '--y': '1'}}><i>1</i></span>
          <span className='num' onClick={() => putValue(2)} style={{'--i': '13', '--x': '-1', '--y': '1'}}><i>2</i></span>
          <span className='num' onClick={() => putValue(3)} style={{'--i': '14', '--x': '0', '--y': '1'}}><i>3</i></span>
          <span className='num' onClick={() => actionValidation('+')} style={{'--i': '15', '--x': '1', '--y': '1'}}><i>+</i></span>

          <span className='zero' onClick={() => putValue(0)} style={{'--i': '16', '--x': '-1', '--y': '2'}}><i>0</i></span>
          <span className='num' onClick={() => putValue('.')} style={{'--i': '17', '--x': '0', '--y': '2'}}><i>.</i></span>
          <span className='num' onClick={showResult} style={{'--i': '18', '--x': '1', '--y': '2'}}><i>=</i></span>
        </form>
      </div>
  )
}
