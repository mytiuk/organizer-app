import img1 from './png/img1.png'
import img2 from './png/img2.png'
import img3 from './png/img3.png'
import img4 from './png/img4.png'
import img5 from './png/img5.png'
import img6 from './png/img6.png'
import img7 from './png/img7.png'
import img8 from './png/img8.png'
import img9 from './png/img9.png'

import instagram from './contact/instagram.png'
import telegram from './contact/telegram.png'
import watsup from './contact/whatsapp.png'

import sunny from './weather/sunny.png'
import cloudy from './weather/cloud.png'
import fewcloud from './weather/few_cloud.png'
import rainy from './weather/rain.png'
import moon from './weather/moon.png'

const instRef = 'https://www.instagram.com/kolia.mytiuk'
const telRef = 'https://t.me/kolia_mytiuk'
const watsupRef = 'https://wa.me/+48883576340'

export const image = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
export const contacts = [
  {icon: instagram, ref: instRef},
  {icon: telegram, ref: telRef}, 
  {icon: watsup, ref: watsupRef}]
export const icon = {sunny, cloudy, fewcloud, rainy, moon}