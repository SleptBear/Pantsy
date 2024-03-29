import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { clearCartThunk, deleteCartThunk, loadCartThunk } from '../../store/cart'
import { addOrderThunk } from '../../store/order'
import "./cart.css"
import "../Icons/trashcan"
import TrashIcon from '../Icons/trashcan'

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const products = useSelector(state => state.cartReducer.Cart)
  const cartId = useSelector(state => state.cartReducer.Cart)
//   console.log("CART ID", cartId)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0.00)
  const history = useHistory()

  if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    dispatch(loadCartThunk(user?.id))
  }, [dispatch])

  useEffect(() => {
    if (products) {
      let itemCount = 0
      let price = 0.00
      products.products?.forEach(({ id, price: itemPrice }) => {
        itemCount += 1
        price += itemPrice
      })
      setCartItemCount(itemCount)
      setTotalPrice(price)
    }
  }, [products])

  if (!products) {
    return <h1>You have no items in your cart</h1>
  }

  const handleDeleteItem = (itemId, itemPrice) => {
    dispatch(deleteCartThunk(user.id, itemId))
    setCartItemCount(prevCount => prevCount - 1)
    setTotalPrice(prevPrice => prevPrice - itemPrice)
  }

  if (cartItemCount === 0) {
    return (
      <div className="empty-cart">
        <p className="empty-cart-message">Oops, your cart is empty! Time to go shopping.</p>
        <img className="image-gif" src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="Empty cart" />
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      await dispatch(addOrderThunk(user.id));
      await dispatch(clearCartThunk(cartId.id))
      await history.push("/orders");
    } catch (error) {
      console.log('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h1>Cart ({cartItemCount})</h1>
      {products.products?.map(({ id, name, price, size, color, productimages }) => {
        return (
          <div className='cart-item' key={id}>
            {productimages?.map(image => (
              <img className="cart-image" src={image.image} alt="no image" key={image.id} />
            ))}
            <h3>{name}</h3>
            <p>{size}</p>
            <p>{color}</p>
            <p>${price.toFixed(2)}</p>
            <div>
            <button className="cartdeletebutton"onClick={() => handleDeleteItem(id, price)}><TrashIcon /></button>
            </div>


          </div>
        )
      })}
      <div>
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div>
      <div>
      <button className="checkoutbutton"onClick={handleCheckout}>CheckOut</button>
    </div>
      </div>
    </div>
  )
}

export default Cart;
