import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css'
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {

  state = {
    ingredients: {},
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      // for real production should calculate price on the server to prevent manipulate on client side
      price: this.props.price,
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
    .then(res => {
      this.setState({loading: false })
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({loading: false })
    })
  }

  render(){
    let form = (
      <form>
        <Input inputtype='input' type="text" name='name' placeholder="Your name" />
        <Input inputtype='input' type="email" name='email' placeholder="Your email" />
        <Input inputtype='input' type="text" name='street' placeholder="Your Street" />
        <Input inputtype='input' type="text" name='postal' placeholder="Your Postal" />
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