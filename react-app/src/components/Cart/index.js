import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { deleteCartThunk, loadCartThunk } from '../../store/cart'
import "./cart.css"

const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => state.cartReducer.Cart)
    if(!user) {
        <h1>You are not logged in!</h1>
    }
    useEffect(() => {
        dispatch(loadCartThunk(user?.id))
    }, [dispatch])

    // const productsArr = Object.values(products) || []
    console.log("Products", products)
    // console.log("productsArr", productsArr)
    if(!products) {
        return <h1>You have no items in your cart</h1>
    }
    return (
        <div>
            <h1>My Cart</h1>
            {products.products?.map(({id, name, price, size, color, productimages}) => {
                return <div>
                    <h1>Item</h1>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{size}</p>
                    <p>{color}</p>
                    {productimages?.map(image => {

                        return <img className="cart-image"src={image.image} alt="no image"></img>
                    })}
                <button onClick={() => dispatch(deleteCartThunk(user.id, id))}>Delete</button>
                </div>
            })}
        </div>
    )
}

export default Cart;
