import React, {useState, useEffect} from 'react'
import './Clock.css'

export const Clock = () => {

  const [turnLt, setTurnLt] = useState(false)
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())
  const [svgStyle, setSvgStyle] = useState({})
  
  useEffect(() => {
    setInterval(() => {
      setHours(new Date().getHours())
      setMinutes(new Date().getMinutes())
      setSeconds(new Date().getSeconds())
    })

    if(turnLt) {
      setSvgStyle(prev =>  {
        return { 
          ...prev, 
          boxShadow: '0 0 20px 8px  #fff',
          transition: '0.5s'}
        })
    } else {
      setSvgStyle(prev =>  {
        return { 
          ...prev, 
          boxShadow: ''}
        })
     }

  }, [turnLt])

const h = hours < 10 ? `0${hours}`: hours
const m = minutes < 10 ? `0${minutes}`: minutes 
const s = seconds < 10 ? `0${seconds}`: seconds
const ap = hours >= 12 ? 'PM' : 'AM'

  return (
    <div  id='time' onClick={() => setTurnLt(prev => !prev)}> 
      <div className='circle' style={{'--clr': '#ff2972'}}>
        <div className='dots hr_dot' style={{ transform: `rotate(${h * 15}deg)`}}></div>
        <svg style={svgStyle}>
          <circle cx='50' cy='50' r='50'></circle>
          <circle cx='50' cy='50' r='50' id='hh' style={{ strokeDashoffset: 314 - 13.0833 * h}}></circle>
        </svg >
        <div id='hours'>{h}<br/><span>Hours</span></div>
      </div>
  
      <div className='circle' style={{'--clr': '#fee800'}}>
      <div className='dots min_dot' style={{ transform: `rotate(${m * 6}deg)`}}></div>
      <svg style={svgStyle}>
          <circle cx='50' cy='50' r='50'></circle>
          <circle cx='50' cy='50' r='50' id='mm' style={{ strokeDashoffset: 314 - 5.2333 * m}}></circle>
        </svg>
        <div id='minute'>{m}<br/><span>Minutes</span></div>
      </div>

      <div className='circle' style={{'--clr': '#04fc43'}}>
      <div className='dots sec_dot' style={{ transform: `rotate(${s * 6}deg)`}}></div>
      <svg style={svgStyle}>
          <circle cx='50' cy='50' r='50'></circle>
          <circle cx='50' cy='50' r='50' id='ss' style={{ strokeDashoffset: 314 - 5.2333 * s}}></circle>
        </svg>
        <div id='seconds'>{s}<br/><span>Seconds</span></div>
      </div>
    </div>
  )
}
