import React, { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'

export default function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`//fixes the price to 2 decimal places
    const cartCtx = useContext(CartContext)
    const addToCartHan=(amount)=>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
    }
    console.log('meaiItem');
    return (
        //here in this meal item the main wrapper is <li> coz we gonna add it in meals.js in a <ul>
        <li className={classes.meal}>
            <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>
                {props.description}
            </div>
            <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHan} id={props.id}/>
            </div>


        </li>
    )
}
