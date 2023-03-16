import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory, useParams } from 'react-router-dom'
import {loadOrderThunk } from '../../store/order'

const Order = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    console.log(id)
    const user = useSelector(state => state.session.user)
    // const products = useSelector(state.orderReducer.Order)
    // console.log("products", products)
    useEffect(() => {
        dispatch(loadOrderThunk(id))
    }, dispatch)

    // if (!products) {
    //     return <h1>You have no orders</h1>
    // }
    return (
        <div>
            <h1>TEST</h1>
        </div>
    )
}


export default Order;
