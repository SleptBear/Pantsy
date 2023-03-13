import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './singleProduct.css'
import { singleProductThunk } from "../../../store/product";
import EditProduct from "../editProduct";

function Product () {
    const dispatch = useDispatch()
    const id = useParams()
    const productDetail = useSelector(state => state.productsReducer.singleProduct)


    useEffect(() => {
        dispatch(singleProductThunk(id.id))
    }, [dispatch])

    if(!productDetail.productImages) {
        return null
    }



    return (
        <div className="mainProductDetail">
            <div>
            <p>product name: {productDetail.name}, product price:{productDetail.price}, Seller Name:</p>
            </div>

            <div>
            </div>

            <div>
                <button> ADD TO CART </button>
            </div>
            <div>
                <h3>product description: {productDetail.description}</h3>
            </div>

            <div>
                <h1> TOTAL REVIEWS PLACEHOLDER</h1>
            </div>
            <div>
                <h1> USER REVIEWS PLACEHOLDER</h1>
            </div>
            <div className="product-images">
                {productDetail.productImages.map(image => {
                 return <img src={image.image} alt="image not found"></img>
                })}
                <p> dropdown for size and color,  SIZE: {productDetail.size}  COLOR: {productDetail.color}</p>
            </div>
            <button><EditProduct></EditProduct></button>
        </div>
    )
}

export default Product
