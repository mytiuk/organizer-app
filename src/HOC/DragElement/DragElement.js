import React, {useState, useEffect} from 'react'

export const DragElement = ({children}) => {

  const [style, setStyle] = useState({position: 'absolute', top: '200px'})
  const [item, setItem] = useState(false)

  const mousePositon = (e) => {
    setStyle(prev => { 
      return {
        ...prev, 
        left: e.pageX  -240 + 'px',
        top: e.pageY  -40 + 'px'
      }
    }) 
  }

  useEffect(() => {
    if (item) {
      window.addEventListener('mousemove', mousePositon)
    } else {
      window.removeEventListener('mousemove', mousePositon)
    }
    
    return () => window.removeEventListener('mousemove', mousePositon)
   
  }, [item, mousePositon])

  return (
    <div onMouseUp={() => setItem(false)} onMouseDown={() => setItem(true)} id='theDiv' style={style} className='theDiv'>
      {children}
    </div>
  )
}
 