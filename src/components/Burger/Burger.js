import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'

const Burger = ( props ) => {
  const burgerIngredients = []; 
 
  // iterate through ingridents list objects
  Object.keys(props.ingredients).forEach(function(ingredient){
    // for each type of ingredients, create corresponding number of BurgerIngredient component based
    for(let i = 0; i < Number(props.ingredients[ingredient]); i++) {
      const newIngredient = <BurgerIngredient type={ingredient} key={ingredient + i} />
      burgerIngredients.push(newIngredient)
    }
  })


  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />  
    </div>
  )
}

export default Burger;