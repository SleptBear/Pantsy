import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
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
    const [imgUrl, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()



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
        setErrors([])
        if (!user) {
            setErrors(errors => [...errors, 'User must be signed in to edit a spot'])
            return
        }
        if (name.length === 0 || name.length > 25) {
            setErrors(errors => [...errors, 'Please enter a valid name (less than 25 characters)'])
            return
        }
        if (description.length === 0 || description.length > 255) {
            setErrors(errors => [...errors, 'Please enter a valid description (less than 255 characters)'])
            return
        }
        if (price <= 0 || !price || price > 50000) {
            setErrors(errors => [...errors, 'Please enter a valid price (must be a positive number between 0 and 50000'])
            return
        }
        if (!Number(price)) {
            setErrors(errors => [...errors, "Price must be a number"])
            return
        }
        if (category.length === 0 || category.length > 30) {
            setErrors(errors => [...errors, "Please enter a valid category (less than 30 characters)"])
            return
        }
        if (color.length === 0 || color.length > 20) {
            setErrors(errors => [...errors, "Please enter a valid color (less than 20 characters)"])
            return
        }
        if (size.length === 0 || size.length > 15) {
            setErrors(errors => [...errors, "Please enter a valid size (less than 15 characters)"])
            return
        }

        dispatch(editProductThunk(stateProduct.id, ProductData, updatedImgData))
            .then(() => closeModal())
            // .history.push(`/products/${stateProduct.id}`)

            .catch(async (res) => {
                const data = await res.json();
                // console.log("data from api", data)
                if (data && data.errors) setErrors(data.errors)
                // console.log('ERRORS', errors)
            });
        return
    }

    return (
        <div>
            <form className="editproductform" onSubmit={handleSubmit}>
                <h1>Edit Product</h1>
                <ul className="ul">
                    {Array.isArray(errors) && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
                        // maxLength={50}
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
                {/* <label>
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
                </label> */}
                <label>
                    Category
                    <select
                        className="category-form"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="slacks">Slacks</option>
                        <option value="jeans">Jeans</option>
                        <option value="trousers">Trousers</option>
                        <option value="leggings">Leggings</option>
                        <option value="shorts">Shorts</option>
                        <option value="cargo pants">Cargo Pants</option>
                        <option value="khakis">Khakis</option>
                    </select>
                </label>

                {/* <label>
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
                </label> */}
                <label>
                    Color
                    <select className="color-form" value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="">Select a color</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="brown">Brown</option>
                        <option value="gray">Gray</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                    </select>
                </label>
                {/* <label>
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
    </label> */}
                <label>
                    Size
                    <select className="size-form"
                        value={size}
                        onChange={(e) => {
                            setSize(e.target.value)
                        }}
                        required
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
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
