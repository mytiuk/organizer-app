import React, {useState, useEffect, useCallback} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from "swiper"
import {Loader} from '../../UI/Loader/Loader'
import {icon} from '../../img/image'
import news from '../../img/news.png'
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import './News.css'

export const News = () => {

  const [articles, setArticles] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4b91fcb3c8374b81a99f341976ef8520'
  const url2 = 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw,pl&appid=a19e1d0821bdad28dab5b0354e377642'

  const getNews = async() => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setArticles(data.articles)
     } catch(e) {
      console.log(e)
      } 
  }

  const getWeather =  useCallback( async() => {
    try {
      const response = await fetch(url2)
      const data = await response.json()
      setWeatherData([data.main, {city: data.name}, data.weather[0], data.wind]) 
    } catch(e) {
      console.log(e)
    }
  }, [])
 
  useEffect(() => { 
    if(weatherData.length === 0 || articles.length === 0) {
       getWeather()   
        getNews() 
    }
  },[])       

  const renderWheather = () => { 
   return weatherData.map((item, index) => {
     const number = Math.floor(weatherData[0].temp - 273.15)
     const wind = Math.floor(weatherData[3].speed)

     const renderIcon = () => {
       const time = new Date().getHours()

       if(time >= 21 || time <= 6) {
        return (<img src={icon.moon} />)
       } else {
         if(weatherData[2].description === 'few clouds') {
           return (<img src={icon.fewcloud} />)
         }
         if(weatherData[2].description === 'clear sky') {
           return (<img src={icon.sunny} />)
         }
         if(weatherData[2].description === 'broken clouds') {
           return (<img src={icon.rainy} />)
         }
         if(weatherData[2].description === 'scattered clouds') {
           return (<img src={icon.cloudy} />)
         }
       }
     }
     
      return (
        <div key={index} className='wheather'>
          <h4>{item.city}</h4>
          <p>{number}℃</p>
          <small>m/s</small>
          <p className='wind'>{wind}</p>
          {renderIcon()}
        </div>
      )
    })
  }
  
  return ( 
    <>
     {renderWheather()}

     {articles.length === 0 && <Loader/>}
      <Swiper className='newsBox'
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        >
       {articles.map((article, index) => {
          if(article.title.length < 100) {
            return (
              <SwiperSlide key={index} className='newsCont'>
                <img src={news} className='newsIcon'/>
                <h3>{article.title}</h3>
                <img src={article.urlToImage} alt='news image' className='newsImage'/>
                <p> <a href={article.url} target='_blank'>{article.source.name}</a></p>
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </>
  )
}
