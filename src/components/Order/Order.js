import React from 'react';
import classes from './Order.module.css';

const order = (props) =>{

const ingredients = [];
for(let ingredientName in props.ingredients){
  ingredients.push({
    name: ingredientName,
    amount: props.ingredients[ingredientName]
  })
}

const ingredient = ingredients.map(ig => {
  return(
    <span key = {ig.name} style = {{
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px',
      display: 'inline-block',
      textTransform: 'capitalize'
    }}>{ig.name} {ig.amount}</span>
  )
})
  return(
    <div className ={classes.Order}>
    <p>Ingredients: {ingredient}</p>
    <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order;
