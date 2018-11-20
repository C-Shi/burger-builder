import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import './Toolbar.css'

const Toolbar = ( props ) => {
  return (
    <header className='Toolbar'>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <Logo />
      <nav>
       <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar