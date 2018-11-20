import React from 'react'
import './NavigationItems.css'

const NavigationItems = ( props ) => {
  return (
    <ul className="NavigationItems">
      <li className="NavigationItem">
        <a href={props.link} className={props.active ? 'active' : null}>Burger Builder</a>
      </li>
      <li className="NavigationItem">
        <a href={props.link} className={props.active ? 'active' : null}>Checkout</a>
      </li>
    </ul>
  )
}

export default NavigationItems