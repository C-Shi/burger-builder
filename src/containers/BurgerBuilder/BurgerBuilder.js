import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger.js'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };
    this.addIngredientHandler =  this.addIngredientHandler.bind(this)
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this)
    this.pucharseHandler = this.pucharseHandler.bind(this)
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this)
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this)
  }

  componentDidMount(){
    // obtains price data from database
    axios.get('/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data})
    })
    .catch(error => {
      this.setState({error: true})
    })
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
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   // for real production should calculate price on the server to prevent manipulate on client side
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Kelly Hunter',
    //     address: {
    //       street: 'Main St',
    //       zipCode: 'T4K 0D3',
    //       country: 'Canada'
    //     },
    //     email: 'KHunter@gmail.com',
    //   },
    // }
    // // for firebase specifically add url/where to store.json
    // axios.post('/orders.json', order)
    // .then(res => {
    //   this.setState({loading: false, purchasing: false})
    // })
    // .catch(err => {
    //   this.setState({loading: false, purchasing: false})
    // })
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })

  }


  render () {
    const disableInfo = {
      ...this.state.ingredients
    }

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients cannot be loaded</p> : <Spinner />;

    // only do all these if successfully fetch ingredients data from db
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientsAdd={this.addIngredientHandler} 
            ingredientsRemove={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            disabled={disableInfo}
            price={this.state.totalPrice}
            ordered={this.pucharseHandler}/>
        </Aux>
      );

      orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      price={this.state.totalPrice}/>

      if (this.state.loading) {
        orderSummary = <Spinner />
      }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

// export will run withErrorHandler and return back a higher order component which contains BurgerBuilder Component
export default withErrorHandler(BurgerBuilder, axios)

