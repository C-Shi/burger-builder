import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = ( props ) => {
  // convert ingredients:quantity key-value pair into actual <li> components in order to display in the summary
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
      </li>
    )
  })
  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>A delicious burger containing the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Continue to Checkout ?</p>
      <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary;