import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'

const Burger = ( props ) => {
  let transformedIngredients = []; 
 
  // iterate through ingridents list objects
  Object.keys(props.ingredients).forEach(function(ingredient){
    // for each type of ingredients, create corresponding number of BurgerIngredient component based
    for(let i = 0; i < Number(props.ingredients[ingredient]); i++) {
      const newIngredient = <BurgerIngredient type={ingredient} key={ingredient + i} />
      transformedIngredients.push(newIngredient)
    }
  })

  // if there is no ingredients, log info message
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Add Ingredients!</p>
  }


  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />  
    </div>
  )
}

export default Burger;