import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {}
  }

  componentDidMount() {
    // loop through url query and extract info about ingredients and quantities
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let params of query.entries()) {
      ingredients[params[0]] = +params[1]
    }
    this.setState({ ingredients })
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} onCheckoutCancelled={this.checkoutCancelled} onCheckoutContinued={this.checkoutContinued}/>
      </div>
    )
  }
}

export default Checkout