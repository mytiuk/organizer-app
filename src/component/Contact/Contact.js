import React from 'react'
import { contacts } from '../../img/image'
import './Contact.css'

export const Contact = () => {
  return (
    <section className='contact'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
        {contacts.map((contact, index) => <div className='contactImg' key={index}><a href={contact.ref} target='_blank'><img src={contact.icon}/></a></div>)}
    </section>
  )
}
