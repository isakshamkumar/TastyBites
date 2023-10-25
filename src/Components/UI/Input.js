import React from 'react'
import { useRef } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props,ref)=> {
  return (
    //we are assuming that we will get a input object as a prop with keys like type,id,label,etc
    // {type:'text'}
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* <input type="" name="" id="" /> */}
        {/* <input id={props.input.id} {...props.input} /> */}
        {/* now note the above one is also correct, it means that id has to be same as html for in label so the is we are gettinh in input onject is passed,.. now this ... spread operator basically means all other properties/keys of this object i.e type,label etc is being extracted like {type:'text'}  */}
        <input ref={ref} {...props.input} />
        {/* now this one is more specific, it basically means we dont have to write id=.. coz we are getting it in soread operator on input object */}
      
    </div>
  )
})
export default Input;