import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      showSideDrawer: true
    };
    this.sideDrawerCloseHandler = this.sideDrawerCloseHandler.bind(this)
  }

  sideDrawerCloseHandler() {
    this.setState({showSideDrawer: false})
  }


  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout