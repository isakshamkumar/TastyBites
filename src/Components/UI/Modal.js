import React from 'react'
import classes from './Modal.module.css'
import ReactDom from 'react-dom'

const Backdrop = (props) => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {  //this is the contsiner for cart.js
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>

        </div>
    )
}
const portalElement =document.getElementById('overlays')

export default function Modal(props) {
    return (
        <>
        {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>,portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    {/* <Backdrop/>
    <ModalOverlay>{props.children}</ModalOverlay> */}
    </>
  )
}
export {Backdrop,ModalOverlay}
