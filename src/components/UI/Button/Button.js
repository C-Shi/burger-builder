import React from 'react'

import './Button.css'

const Button = ( props ) => {
  const classes = `Button ${props.btnType}`
  return (
    <button onClick={props.clicked} className={classes}>{props.children}</button>
  )
}

export default Button