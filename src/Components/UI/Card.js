import React from 'react'
import classes from './Card.module.css'

export default function Card(props) {
  console.log('card.js');
  return (
    <div className={classes.card}>
        {props.children}
      
    </div>
  )
}
