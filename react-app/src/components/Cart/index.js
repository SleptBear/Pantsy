import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { deleteCartThunk, loadCartThunk } from '../../store/cart'

const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => state.cartReducer.Cart)
    useEffect(() => {
        dispatch(loadCartThunk(user.id))
    }, [dispatch])

    // const productsArr = Object.values(products) || []
    console.log("Products", products)
    // console.log("productsArr", productsArr)

    if(!products) {
        return <h1>You have no items in your cart</h1>
    }
    return (
        <div>
            <h1>TEST</h1>
            {/* {productsArr?.map(({id, name, price, size, color, productimages}) => {
                return <div>
                    <h1>Item</h1>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{size}</p>
                    <p>{color}</p>
                    {productimages?.map(image => {
                        <img src={image} alt="no image"></img>
                    })}
                </div>
            })} */}
            {/* <button onClick={dispatch(deleteCartThunk(id))}>Delete</button> */}
        </div>
    )
}

export default Cart;
