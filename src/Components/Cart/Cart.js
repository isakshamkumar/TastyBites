import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal, { Backdrop, ModalOverlay } from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'


export default function Cart(props) {
    console.log('cart.sj');
    const cartCtx = useContext(CartContext)
    const totalAmount = cartCtx.totalAmount.toFixed(2)
    const hasItems = cartCtx.items.length > 0;
    // const cartItems = <ul className={classes['cart-items']}>
    //     {[
    //         {
    //             id: 'c1',
    //             name: 'sushi',
    //             amount: 2,
    //             price: 12.55,
    //         }
    //     ].map((item) => <li>{item.name}</li>)}
    // </ul>
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)

    }
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })

    }
    const [isCheckout, setIsCheckout] = useState(false)
    const orderCartHandler = () => {
        setIsCheckout(true)

    }
    const [submitting, setissubmitting] = useState(false);
    const [didsubmit, setdidsubmit] = useState(false)
    const submitOrderHandler = async (userData) => {
        setissubmitting(true)
        //now note: bina await ke pehle kaam chal jata but for is submitting state ,await isliye dala bcoz jb tk koi response ni aata hum wait krna chahte h and koi text/animation vgera dikhanachahte h. but agar bina await kre krte tau fetch background me schedule ho jati 
        await fetch('https://hooksss-c4d70-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
                //cartctx.items ...cart mejo bhi items h
                //this is the power of context api
            })
        })
        setissubmitting(false)
        setdidsubmit(true)
        cartCtx.clearCart()


    }
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)}
    </ul>
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>

        {hasItems && <button className={classes.button} onClick={orderCartHandler}>Order</button>}
    </div>
    const cartModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            {/* <span>35.62</span> */}
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </>
    const isSubmittingModalContent = <p>Sending Order Data...</p>
    const didSubmitModalContent = <><p>Successfully sent the order!
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
        </p></>


    return (
        <>
            {/* <Backdrop/>
    <ModalOverlay> */}
    

            <Modal onClick={props.onClick}>
                {!submitting && !didsubmit &&cartModalContent}
                {submitting &&  isSubmittingModalContent}
                {didsubmit && !submitting &&didSubmitModalContent}

            </Modal>



            {/* </ModalOverlay> */}
        </>
    )
}
