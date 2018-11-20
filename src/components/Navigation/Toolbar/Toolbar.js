import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

import './Toolbar.css'

const Toolbar = ( props ) => {
  return (
    <header className='Toolbar'>
      <div>MENU</div>
      <Logo />
      <nav>
       <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar