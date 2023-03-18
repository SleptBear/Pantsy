import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { editProductThunk } from '../../../store/product'
import { useModal } from "../../../context/Modal"
// import { editProductThunk } from '../../store/product'


const EditProduct = () => {
    const user = useSelector(state => state.session.user)
    const stateProduct = useSelector(state => state.productsReducer.singleProduct)
    const [name, setName] = useState(stateProduct.name)
    const [description, setDescription] = useState(stateProduct.description)
    const [stringPrice, setStringPrice] = useState(stateProduct.price)
    const [category, setCategory] = useState(stateProduct.category)
    const [color, setColor] = useState(stateProduct.color)
    const [size, setSize] = useState(stateProduct.size)
    const [imgUrl ,setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()



    const handleSubmit = (e) => {
        e.preventDefault()

        const price = parseInt(stringPrice)
        const ProductData = {
            name,
            description,
            price,
            category,
            color,
            size,
        };

        const updatedImgData = {
            img_url: imgUrl,
          };

        dispatch(editProductThunk(stateProduct.id, ProductData, updatedImgData))
        .then(() => closeModal())
        // .history.push(`/products/${stateProduct.id}`)

        // .catch(async (res) => {
        //     const data = await res.json();
        //     console.log("data from api", data)
        //     if (data && data.errors) setErrors(data.errors)
        //     console.log('ERRORS', errors)
        //   });
        return
    }

    return(

        <div>
    <form className="editproductform" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>
    <label>
        Name
    <input className="name-form"
    type="text"
    value={name}
    placeholder="Name"
    maxLength={50}
    onChange={(e) => {
        setName(e.target.value)
    }}
    required

    ></input>
    </label>
    <label>
        Description
    <input className="description-form"
    type="text"
    value={description}
    placeholder="Description"
    maxLength={50}
    onChange={(e) => {
        setDescription(e.target.value)
    }}
    required

    ></input>
    </label>
    <label>
        Price
    <input className="price-form"
    type="text"
    value={stringPrice}
    placeholder="Price"
    maxLength={50}
    onChange={(e) => {
        setStringPrice(e.target.value)
    }}
    required

    ></input>
    </label>
    <label>
        Category
    <input className="category-form"
    type="text"
    value={category}
    placeholder="Category"
    maxLength={50}
    onChange={(e) => {
        setCategory(e.target.value)
    }}
    required

    ></input>
    </label>
    <label>
        Color
    <input className="color-form"
    type="text"
    value={color}
    placeholder="Color"
    maxLength={50}
    onChange={(e) => {
        setColor(e.target.value)
    }}
    required

    ></input>
    </label>
    <label>
        Size
    <input className="size-form"
    type="text"
    value={size}
    placeholder="Size"
    maxLength={50}
    onChange={(e) => {
        setSize(e.target.value)
    }}
    required
    ></input>
    </label>
    <label>
                Image
            <input className="size-form"
            type="text"
            value={imgUrl}
            placeholder="Image (optional)"
            maxLength={255}
            onChange={(e) => {
                setImgUrl(e.target.value)
            }}

            ></input>
            </label>
    <button className="submit-form" type="Submit" >Submit</button>
    </form>
</div>
)





}


export default EditProduct
