import React, {useState, useEffect} from 'react'
import flower from '../../img/flower.png'
import './Game.css'

export const Game = () => {

  const [active, setActive] = useState(false)
  const [footDot, setFootDot] = useState([])
  const [direction, setDirection] = useState('RIGHT')
  const [plusDot, setPlusDot] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [snake, setSnake] = useState([
      [0, 0],
      [0, 5.5],
      [0, 11]
    ]
  )

  useEffect(() => {
    const min = 1
    const max = 92
    const x = Math.floor(Math.random() * ((max - min) + min))
    const y = Math.floor(Math.random() * ((max - min) + min))

    setFootDot([x, y])  
    
  }, [plusDot])

  const goSnake = () => {

    let dots = [...snake]
    let head = dots[dots.length - 1]

    for(let i = 0; i < dots.length - 1; i++) {

      if((head[0] === dots[i][0] && head[1] === dots[i][1]) ||
      (head[0] < 0 || head[1] >= 94 || head[0] >= 94 || head[1] < 0)) {
          setActive(false)
          setGameOver(true)
      }
    }
 
    switch(direction) {
      case 'RIGHT': 
          head = [head[0], head[1] + 5.5]
        break
        case 'LEFT': 
            head = [head[0], head[1] - 5.5]
          break
          case 'DOWN': 
             head = [head[0] + 5.5, head[1]]
            break
            case 'UP': 
                head = [head[0] - 5.5, head[1]]
              break
    }
      dots.push(head)

      if((footDot[0] <= head[0] && head[0] <= footDot[0] + 5) 
      && (footDot[1] <= head[1] && head[1] <= footDot[1] + 5)) {
        setPlusDot(prev => prev += 1) 
      
      } else {
         dots.shift()
      }
      setSnake([...dots])
  }
 
  const handleKeyDown = (e) => {
    switch(e.keyCode) {
      case 38: setDirection('UP')
        break
        case 40: setDirection('DOWN')
         break
          case 37: setDirection('LEFT')
          break
            case 39: setDirection('RIGHT')
            break
    }
  }

  const renderSnake = () => {

   return snake.map((item, index) => {
      return (
        <div key={index}>
       { index === snake.length - 1 
        ? <div className='snake-dot'  style={{top: item[0] + '%', left: item[1] + '%'}}><i className='fa fa-reddit-alien' style={{color:'#038c05'}}></i></div>
        : <div className='snake-dot' key={index} style={{top: item[0] + '%', left: item[1] + '%'}}></div>
       }
        </div>
      ) 
    })
  }
   
  useEffect(() => {
    if(active) {
      setGameOver(false)
      setTimeout(() => {goSnake()} ,  400)
    }   
  }, [snake, active]) 

  
  const startStopGame = () => {
    setActive(prev => !prev)
    if(!active) {
        const dots = [[0, 0], [0, 5.5],[0, 11]]
        setSnake([...dots])
        setDirection('RIGHT')
    }
  }

  return (
    <div className='gameContainer' tabIndex={0} onKeyDown={handleKeyDown}>
      <div  className='playGround' style={gameOver === true && {'--bclr': '#f44336'} || active === true && {'--bclr': '#2AB85C'} || {'--bclr': 'transparent'}}>
        <p> Press up down left right</p>
        {gameOver ? <div className='gameOver'>Game over</div> : null}
        {renderSnake()}
        <span className='food' style={{top: footDot[0] + '%', left: footDot[1] + '%'}}><img src={flower}></img></span>
      </div> 
      <div>
        <button onClick={startStopGame} style={ active ? { '--clr':'#f44336'} : {'--clr': '#2AB85C'}}> {active ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  )
}
