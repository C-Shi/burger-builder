import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger.js'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

const INGREDIENT_PRICE = {
  salad: 1,
  meat: 2.5,
  cheese: 2,
  bacon: 2
}

class BurgerBuilder extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };
    this.addIngredientHandler =  this.addIngredientHandler.bind(this)
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this)
    this.pucharseHandler = this.pucharseHandler.bind(this)
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this)
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this)
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    }

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum, el) => {
      return sum + el
    } , 0)

    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients}, this.updatePurchaseState)
  }

  removeIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) return;
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients}, this.updatePurchaseState)
  }

  pucharseHandler () {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler () {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler () {
    // alert('You are going to continue')
    const order = {
      ingredients: this.state.ingredients,
      // for real production should calculate price on the server to prevent manipulate on client side
      price: this.state.totalPrice,
      customer: {
        name: 'Kelly Hunter',
        address: {
          street: 'Main St',
          zipCode: 'T4K 0D3',
          country: 'Canada'
        },
        email: 'KHunter@gmail.com',
      },
    }
    // for firebase specifically add url/where to store.json
    axios.post('/orders.json', order)
    .then(res => console.log(res))
    .catch(err => console.log(err))

  }


  render () {
    const disableInfo = {
      ...this.state.ingredients
    }

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientsAdd={this.addIngredientHandler} 
          ingredientsRemove={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          disabled={disableInfo}
          price={this.state.totalPrice}
          ordered={this.pucharseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder

