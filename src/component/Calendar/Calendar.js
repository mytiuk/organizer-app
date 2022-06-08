import React, {useState} from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'

export const CalendarComponent = () => {

  const [date, setDate] = useState(new Date())

  const changeDate = (e) => {
    setDate(e)
  }

  return (
      <div className='box'>
        <div className='calContainer'>
          <Calendar className='calendar'
          value={date}
          onChange={changeDate}
          locale="US"
          />
        </div>
      </div>
   
  )
}
