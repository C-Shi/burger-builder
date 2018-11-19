import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger.js'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';

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
      totalPrice: 4
    };
    this.addIngredientHandler =  this.addIngredientHandler.bind(this)
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this)
  }

  addIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients})
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
    const oldPrice = this.state.price;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients})
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
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientsAdd={this.addIngredientHandler} 
          ingredientsRemove={this.removeIngredientHandler}
          disabled={disableInfo}/>

      </Aux>
    )
  }
}

export default BurgerBuilder

