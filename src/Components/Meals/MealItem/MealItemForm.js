import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

export default function MealItemForm(props) {
  console.log('mealform');
  const [amountIsValid,setAmountIsValid]=useState(true)
  const amountInputRef =useRef();
  const submitHandler=(event)=>{
    event.preventDefault();
    // console.log(amountInputRef.current.value)
    const enteredAmount= amountInputRef.current.value;//coz it is always string
    const enteredAmountNumber=+enteredAmount;
    // console.log(enteredAmountNumber)
    if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
      setAmountIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    //now note we are not using addcart function using context here box the item parameter in that function need more data rather than jus amount, such as id, name etc which we do not have 

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" input={{
          ref:amountInputRef,//since it is a custom component, we have to use forward ref
          // id:'amount',
          id: 'amount_' + props.id, // this changed!
          type: 'number',
          min:'1',
          max:'5',
          step:'1',
          defaultValue:'1'
        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p> Please Add Valid Amount (1-5)</p>}
    </form>
  )
}
