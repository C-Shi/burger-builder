import React from 'react';
import './Input.css'

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType){
    case ('input'):
      inputElement = <input className='InputElement' value={props.value} {...props.elementConfig} />
      break;
    case ('textarea'):
      inputElement = <textarea className='InputElement' value={props.value} {...props.elementConfig} />
      break;
    default:
      inputElement = <input className='InputElement' value={props.value} {...props.elementConfig} />
  }

  return (
    <div className='Input'>
      <label className='Label'>{props.label}</label>
      {inputElement}
    </div>
  )
}
export default Input;