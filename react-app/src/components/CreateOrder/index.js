// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { addOrderThunk, loadOrderThunk } from '../../store/order';

// const CreateOrder = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.session.user)
//     const orders = useSelector((state) => state.orderReducer.orders)

//     useEffect(() => {
//         if (!user) {
//             return <h1>Please log in to view your cart</h1>
//         }
//         dispatch(loadOrderThunk(user.id))
//     }, [dispatch])
//     console.log("ORDERS------", orders)

//     if (!orders) {
//         return <h1>You don't have any orders</h1>
//     }

//     const handleCreate = () => {
//         const newOrder = {
//             user_id: user.id,
//             date: new Date()
//         }
//         dispatch(addOrderThunk(newOrder))
//     }


//     return (
//         // <h1>TEST</h1>
//         <button onClick={handleCreate}>Checkout</button>
//     )
// }

// export default CreateOrder;
