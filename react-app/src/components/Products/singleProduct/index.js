import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './singleProduct.css'
import { singleProductThunk, deleteProductThunk } from "../../../store/product";
import EditProduct from "../editProduct";
import { useModal } from "../../../context/Modal"
import OpenModalButton from "../../OpenModalButton"
import { Reviews } from "../../Reviews";
import { addToCartThunk, createCartThunk } from "../../../store/cart";

function Product () {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const id = useParams()
    const productDetail = useSelector(state => state.productsReducer.singleProduct)
    const user = useSelector(state => state.session.user)
    const history = useHistory()

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
                {user && user.id ? (
                    <button
                    onClick={() => dispatch(addToCartThunk( user.id,id.id)).then(() => history.push('/cart'))}

                    > ADD TO CART </button>


                ): null }
            </div>
            <div>

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
            <div>
            <button className="deletebutton"
                        onClick={() => dispatch(deleteProductThunk(id.id)).then(() => history.push("/"))}>
                            Delete Item
                        </button>
            </div>
            <OpenModalButton
            modalComponent={<EditProduct/>}
            buttonText={"Edit Product"}
            />
            <div>
                <Reviews />
            </div>
        </div>
    )
}

export default Product
