import React from 'react'
import './Logo.css'
import burgerLogo from '../../asset/images/burger-logo.png'

const Logo = ( props ) => (
  <div className='Logo'>
    <img src={burgerLogo} alt="myBurger" />
  </div>
)

export default Logo