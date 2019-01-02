import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope you taste well!</h1>
      <div>
        <Burger ingredients={props.ingredients} style={{height: '100px'}}/>
      </div>
      <Button btnType='Danger' clicked={props.onCheckoutCancelled}>Cancel</Button>
      <Button btnType='Success' clicked={props.onCheckoutContinued}>Continue</Button>
    </div>
  )
}

export default CheckoutSummary;