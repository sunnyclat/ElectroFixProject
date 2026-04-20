import React from 'react'
import "./styles.scss"
const Title = ({text, className}) => {
  return (
    <div className={`title ${className}`}>
          <h2>{text}</h2>
    </div>
  )
}

export default Title