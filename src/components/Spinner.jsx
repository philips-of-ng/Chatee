import React from 'react'
import '../css/spinner.css'

const Spinner = ({ color, size, speed, specWidth }) => {
  return (
    <i style={{color: color, fontSize: `${size}px`, animationDuration: `${speed}s` }} class='spinner bx bx-loader-alt'></i>
  )
}

export default Spinner