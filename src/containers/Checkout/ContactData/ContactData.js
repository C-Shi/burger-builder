import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css'
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode',
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'example@email.com',
        },
        value: ''
      },
    },
    ingredients: {},
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    // get order form address from state
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      // for real production should calculate price on the server to prevent manipulate on client side
      price: this.props.price,
      orderData: formData
    }
    // for firebase specifically add url/where to store.json
    axios.post('/orders.json', order)
    .then(res => {
      this.setState({loading: false })
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({loading: false })
    })
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = Object.assign({}, this.state.orderForm);
    const updatedFormElement = updatedOrderForm[inputIdentifier];
    // using object.assign to create a copy but not reference of the original object
    // update formElement value to real value
    updatedFormElement.value = event.target.value;
    this.setState({orderForm: updatedOrderForm})
  }

  render(){
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>Button</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    return(
      <div className='ContactData'>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;