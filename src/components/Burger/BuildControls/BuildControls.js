import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' }
]

const BuildControls = ( props ) => (
  <div className="BuildControls">
    {controls.map(ctrl => {
      return <BuildControl key={ctrl.label} label={ctrl.label} />
    })}
  </div>
)

export default BuildControls