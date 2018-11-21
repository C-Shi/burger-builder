import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  render() {
    // convert ingredients:quantity key-value pair into actual <li> components in order to display in the summary
    const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
        </li>
      )
    });

    return (
      <Aux>
        <h3>Order Summary</h3>
        <p>A delicious burger containing the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout ?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;