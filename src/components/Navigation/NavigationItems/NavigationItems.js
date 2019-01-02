import React from 'react'
import './NavigationItems.css'
import { NavLink } from 'react-router-dom'

const NavigationItems = ( props ) => {
  return (
    <ul className="NavigationItems">
      <li className="NavigationItem">
        <NavLink to={'/'} >Burger Builder</NavLink>
      </li>
      <li className="NavigationItem">
        <NavLink to={'/orders'} >Orders</NavLink>
      </li>
    </ul>
  )
}

export default NavigationItems