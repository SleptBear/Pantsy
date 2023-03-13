import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { editProductThunk } from '../../../store/product'
// import { editProductThunk } from '../../store/product'


const EditProduct = () => {
    const user = useSelector(state => state.session.user)
    const stateProduct = useSelector(state => state.productsReducer.singleProduct)
    // console.log("USERSELECTOR", user)
    console.log(stateProduct)
    const [name, setName] = useState('asd')
    const [description, setDescription] = useState('asd')
    const [stringprice, setstringPrice] = useState(123)
    const [category, setCategory] = useState('asd')
    const [color, setColor] = useState('asd')
    const [size, setSize] = useState('asd')
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()

    const price = parseInt(stringprice)
    const ProductData = {
        name,
        description,
        price,
        category,
        color,
        size,
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(editProductThunk(ProductData))

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
    value={stringprice}
    placeholder="Price"
    maxLength={50}
    onChange={(e) => {
        setstringPrice(e.target.value)
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
    <button className="submit-form" type="Submit" >Submit</button>
    </form>
</div>
)





}


export default EditProduct
