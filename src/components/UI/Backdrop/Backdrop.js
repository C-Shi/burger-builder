import React from 'react';

import './Backdrop.css'


// this component will remove the modal, meaning cancel ordered
const Backdrop = ( props ) => (
  props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
)

export default Backdrop;