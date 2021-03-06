import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0
  }

  componentWillMount() {
    // loop through url query and extract info about ingredients and quantities
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let params of query.entries()) {
      if (params[0] === 'price') {
        price = params[1]
      }else {
        ingredients[params[0]] = +params[1]
      }
    }
    this.setState({ ingredients, price })
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
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients} 
              price={this.state.price} 
              {...props}
            />
            )} 
          />
      </div>
    )
  }
}

export default Checkout