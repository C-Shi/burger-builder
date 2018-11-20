import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      showSideDrawer: false
    };
    this.sideDrawerCloseHandler = this.sideDrawerCloseHandler.bind(this)
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this)
  }

  sideDrawerCloseHandler() {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler() {
    this.setState( preState => {
      return {showSideDrawer: !preState.showSideDrawer}
    })
  }


  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout