import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory, useParams } from 'react-router-dom'
import {loadOrderThunk } from '../../store/order'

const Order = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.orderReducer.Order.orders)
    console.log("orders", orders)
    useEffect(() => {
        dispatch(loadOrderThunk(user.id))
    }, [dispatch])

    if (!orders || orders.length === 0) {
        return <h1>You have no orders</h1>
    }
    return (
        <div>
          <h1>Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Product</th>
                <th>Shipping Address</th>
                <th>Shipping City</th>
                <th>Shipping State</th>
                <th>Shipping Zip Code</th>
                <th>Shipping Country</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.products[0].name}</td>
                  <td>{order.shipping_address}</td>
                  <td>{order.shipping_city}</td>
                  <td>{order.shipping_state}</td>
                  <td>{order.shipping_zip_code}</td>
                  <td>{order.shipping_country}</td>
                  <td>{order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Order;
