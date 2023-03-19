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

    if (!user) {
      return <h1>Login or Create an account</h1>
    }

    if (!orders || orders.length === 0) {
      return <h1>You have no orders</h1>;
    }


    const totalPrice = (order) => {
      console.log("order", order)
      let total = 0.00
      order.products.forEach(product => {
        console.log(product.price)
        total += Number(product.price)
      });
      return total
    }

      return (
        <div>
          <h1>Orders</h1>
          <div className='Orders-Container'>
            <hr></hr>
            {orders.map((order) => (
              <div key={order.id}>
              <div>Order Date: {order.date.slice(0, 10)}</div>
              {order.products.map((prod) => (
                <div key={prod.id}>Item ID: {prod.id} Price: ${Number(prod.price)}</div>
                ))}
                <div>Total: {totalPrice(order)}</div>
                <hr></hr>

            </div>
          ))}

          </div>
        </div>
      );
    };


    export default Order;
