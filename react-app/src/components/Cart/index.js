import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { deleteCartThunk, loadCartThunk } from '../../store/cart'

const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => state.cartReducer.Cart.products)
    console.log("products", products)
    useEffect(() => {
        dispatch(loadCartThunk(user.id))
    }, [dispatch])

    if(!products) {
        return <h1>You have no items in your cart</h1>
    }
    return (
        <div>
            <h1>TEST</h1>
            {products.map(({id, name, price, size, color}) => {
                return <div>
                    <h1>Item</h1>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{size}</p>
                    <p>{color}</p>
                    {/* <button onClick={dispatch(deleteCartThunk(id))}>Delete</button> */}
                </div>
            })}
        </div>
    )
}

export default Cart;
