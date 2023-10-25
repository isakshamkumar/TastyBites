import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

export default function HeaderCartButton(props) {
  console.log('headerCartBtn');
  const cartCtx =useContext(CartContext)
  const {items}=cartCtx
  //now thisheadercartbtn component will be re-evaluated whenevet this context changes , and this context will change in the context js file
  const numberOfCartItems =cartCtx.items.reduce((curNumber,item)=>{
    return curNumber +item.amount;
  },0)
  const[btnIsHighlighted,setBtnIsHighlighted]=useState(false)
  const btnClasses= `${classes.button} ${btnIsHighlighted?classes.bump:''}`

  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setBtnIsHighlighted(true)
    const timer=setTimeout(()=>{
      setBtnIsHighlighted(false)
      //cleanup  function is not required but it is a good practice
      return()=>{
        clearTimeout(timer)
      }
    },300)
    

  },[items])
  return (
   <button onClick={props.onClick} className={btnClasses}>
    <span className={classes.icon}>
        <CartIcon/>
    </span>
    <span >Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
   </button>
  )
}
 