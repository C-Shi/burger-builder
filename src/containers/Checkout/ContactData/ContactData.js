import React, { Component } from 'react';
import './ContactData.css'
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
  render(){
    return(
      <div className='ContactData'>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name='name' placeholder="Your name" className="Input" />
          <input type="email" name='email' placeholder="Your email" className="Input" />
          <input type="text" name='street' placeholder="Your Street" className="Input" />
          <input type="text" name='postal' placeholder="Your Postal" className="Input" />
          <Button btnType="Success">Button</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;