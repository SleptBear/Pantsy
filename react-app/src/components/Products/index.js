import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadProductThunk } from '../../store/product'
import Product from './singleProduct'
import './Products.css'

function AllProducts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => state.productsReducer.allProducts)
    const productsArr = Object.values(products || [])
    console.log("USER", user)
    // console.log("productsArr", products)

    useEffect(() => {
        dispatch(loadProductThunk())
    }, [dispatch])

    if(!productsArr) {
        return null
    }

    return (
        <div>
            {user && (
                <h1 className="welcomebanner">Welcome to Pantsy, {user?.username}</h1>

            )}

        <div className="products-container">
            {productsArr?.map(({ id, name, size, price, category, productImages }) => {
                return (
                    <div key={id}>
                    <NavLink to={`/products/${id}`}>
                     <div className="productDetails">
                    {productImages?.map(pic => {
                        return (
                            <div>
                    <img className='preview-image' src={pic?.image} alt="image not found"></img>
                        <p className="nameprice">{name}, {price}</p>
                        </div>)})}
                    </div>
                    </NavLink>
                </div>
                )
            })}
                <Switch>
                <Route path="/products/:id">
                    <Product products={productsArr} />
                </Route>
            </Switch>
        </div>
            </div>
    )
}
export default AllProducts;
