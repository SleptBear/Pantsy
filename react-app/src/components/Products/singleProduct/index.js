import { useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './singleProduct.css'
import { singleProductThunk } from "../../../store/product";

function Product () {
    const dispatch = useDispatch()
    const id = useParams()
    const idValues = Object.values(id)
    const productDetail = useSelector(state => state.productsReducer.singleProduct)


    console.log("PRODUCT", productDetail)

    useEffect(() => {
        dispatch(singleProductThunk(id.id))
    }, [dispatch])

    return (
        <div className="mainProductDetail">
            <div>
                    <p>product name: {productDetail.name}, product price:{productDetail.price}, Seller Name: </p>
            </div>
            <div>
                <p> dropdown for size and color,  SIZE: {productDetail.size}  COLOR: {productDetail.color}</p>
            </div>
            <div>
                <button> ADD TO CART </button>
            </div>
            <div>
                <h3>product description: {productDetail.description}</h3>
            </div>
            <div>
                <h1>IMAGE PLACEHOLDER</h1>
            </div>
            <div>
                <h1> TOTAL REVIEWS PLACEHOLDER</h1>
            </div>
            <div>
                <h1> USER REVIEWS PLACEHOLDER</h1>
            </div>
        </div>
    )
}

export default Product