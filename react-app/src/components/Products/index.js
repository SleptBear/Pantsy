import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadProductThunk } from '../../store/product'
import Product from './singleProduct'
import './Products.css'

function AllProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productsReducer.allProducts)
    const productsArr = Object.values(products || [])
    console.log("productsArr", products)

    useEffect(() => {
        dispatch(loadProductThunk())
    }, [dispatch])

    if(!productsArr) {
        return null
    }
    return (
        <div>
            {/* <h1>TEST RENDER ALL LISTINGS</h1> */}
            {productsArr.map(({id, name, size, price, category, productImages}) => {
                return (
                    <div key={id}>
                        <NavLink to={`/products/${id}`}>

                        <div className="productDetails">
                        <p>{name},{size}, {price}, {category}</p>
                        {console.log("PRODUCTIMAGE", productImages)}
                        {productImages.forEach(pic => {
                            return <img src={pic.image} alt="image not found"></img>
                            console.log("IMAGE", pic.image)


                        })}
                        </div>
                        </NavLink>

                    </div>
                )
            })}
            <Switch>
                <Route path="/products/:id">
                    <Product products={productsArr}/>
                </Route>
            </Switch>
        </div>
    )
}

export default AllProducts;
