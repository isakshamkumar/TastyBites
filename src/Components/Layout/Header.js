import React from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

export default function Header(props) {
  console.log('header.js');
  return (
    <>
    <header className={classes.header}>
        <h1>Meals</h1>
        {/* <button> */}
            {/* now we will create a btn component coz this is just dummy */}
           
            {/* </button>  */}
            <HeaderCartButton onClick={props.onShowCart}/>
            {/* currently this onclick does not work coz it is custom component so we need to pass again this btn component the props we recieve */}
    </header>
    {/* <div className={classes.main-image}></div> since there is a hypen in class name so we use it in a array format*/}
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="foood" />
    </div>
    </>
  )
}
