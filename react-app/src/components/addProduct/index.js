import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { createProductThunk } from '../../store/product'

const AddProduct = () => {
    const user = useSelector(state => state.session.user)
    console.log("USERSELECTOR", user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [image, setImage] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        return dispatch(createProductThunk({name, description, price, category, color, size, image, seller: user.id}))
    }

    return(
        <div>
            <form className="addproductform" onSubmit={handleSubmit}>
                <h1>Add a Product</h1>
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
            value={price}
            placeholder="Price"
            maxLength={50}
            onChange={(e) => {
                setPrice(e.target.value)
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
            value={image}
            placeholder="Image"
            maxLength={255}
            onChange={(e) => {
                setImage(e.target.value)
            }}
            required

            ></input>
            </label>
            <button className="submit-form" type="Submit" >Submit</button>
            </form>





        </div>
    )
}

export default AddProduct;
