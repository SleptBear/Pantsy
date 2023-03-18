import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOrderThunk } from '../../store/order';

const Order = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const orders = useSelector((state) => state.orderReducer.orders);
    console.log('ORDERs-------------------------', orders)

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


    return (
      <div>
        <h1>Orders</h1>
        <div className='Orders-Container'>
          {console.log("orders", orders)}
          {orders.map((order) => (
            <div key={order.id}>
            <div>Order Date: {order.date}</div>
            {order.products.map((prod) => (
              <div key={prod.id}>Order Price: {Number(prod.price)}</div>
              ))}
          </div>
        ))}

        </div>
      </div>
    );
  };


  export default Order;
