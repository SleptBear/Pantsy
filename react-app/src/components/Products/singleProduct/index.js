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
    // console.log("PRODUCTDETAIL", productDetail)
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    // console.log('SELLER', productDetail.seller.id)
    // console.log('USER', user)
    // console.log('USER', Object.values(productDetail))
    useEffect(() => {
        dispatch(singleProductThunk(id.id))
    }, [dispatch])

    if(Object.values(productDetail).length === 0) {
        return <div>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for doesn't exist.</p>
        </div>
    }

    if(!productDetail.productImages || id?.id != productDetail.id) {
        return null
    }

    return (
        <div className="mainProductDetail">
            <div className="product-detail">

            <div className="text">
            <h1>{productDetail.name} </h1>
            <h3 className="productdetailprice">$ {productDetail.price}</h3>
            <h3 className="productdetailsize"> Size: {productDetail.size}  </h3>
            <h3 className="productdetailcolor"> Color: {productDetail.color}</h3>
            </div>

            <div>
            </div>
                    <div className="description-detail">
                        <h3> Description:</h3>
                        <p>{productDetail.description}</p>
                    </div>
            <div className="addtocart">
                {user && user.id ? (
                    <button className="add-to-cart"
                    onClick={() => dispatch(addToCartThunk( user.id,id.id)).then(() => history.push('/cart'))}
                    > Add To Cart </button>
                    ): null }
            </div>
                </div>
                <div className="imageandreviews">

            <div className="product-images">
                {productDetail.productImages.map(image => {
                    return <img src={image.image} alt="image not found"></img>
                })}
            </div>
            {/* {console.log("USER", user?.id)}
            {console.log("SELLER", productDetail?.seller?.id)} */}
            {user && productDetail.seller?.id === user?.id ? (
                <div className="product-button">
                <button
                className="deletebutton"
                onClick={() =>
                    dispatch(deleteProductThunk(id.id)).then(() => history.push("/"))
                }
                >
                Delete Item
                </button>
                <OpenModalButton
                modalComponent={<EditProduct />}
                buttonText={"Edit Product"}
                />
            </div>
            ) : null}
            <div>
                <Reviews />
            </div>
            </div>
        </div>
    )
}

export default Product
