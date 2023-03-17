import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOrderThunk } from '../../store/order';

const Order = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const orders = useSelector((state) => state.orderReducer.orders);

    useEffect(() => {
      if (user && user.id) {
        dispatch(loadOrderThunk(user.id));
      }
    }, [dispatch, user]);

    if (!orders || orders.length === 0) {
      return <h1>You have no orders</h1>;
    }

    const totalPrice = orders.reduce((total, order) => {
      const orderPrice = order.total_price ? Number(order.total_price) : order.products.reduce((orderTotal, product) => {
        const productPrice = Number(product.price);
        return orderTotal + (isNaN(productPrice) ? 0 : productPrice)
      }, 0);

      return total + (isNaN(orderPrice) ? 0 : orderPrice)
    }, 0);


    return (
      <div>
        <h1>Orders</h1>
        <table>
          <tbody>
          {orders.map((order) => (
          <tr key={order.id}>
            <td>Order Date: {order.date}</td>
            {order.products.map((prod) => (
              <td key={prod.id}>Order Price: {Number(prod.price)}</td>
            ))}
          </tr>
        ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Spent so far:</td>
              <td>{totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };


  export default Order;
