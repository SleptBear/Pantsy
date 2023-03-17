import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { deleteCartThunk, loadCartThunk } from '../../store/cart'
import "./cart.css"

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const products = useSelector(state => state.cartReducer.Cart)
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

  return (
    <div>
      <h1>Cart ({cartItemCount})</h1>
      {products.products?.map(({ id, name, price, size, color, productimages }) => {
        return (
          <div key={id}>
            <h2>{name}</h2>
            <p>{size}, {color}</p>
            <p>${price.toFixed(2)}</p>
            {productimages?.map(image => (
              <img className="cart-image" src={image.image} alt="no image" key={image.id} />
            ))}
            <button onClick={() => handleDeleteItem(id, price)}>Delete</button>
          </div>
        )
      })}
      <div>
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div>
        <button> CheckOut</button>
      </div>
    </div>
  )
}

export default Cart;
