import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { createProductThunk } from '../../../store/product'
import "./addproduct.css"
const AddProduct = () => {
    const user = useSelector(state => state.session.user)
    // console.log("USERSELECTOR", user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stringprice, setstringPrice] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    const dispatch = useDispatch()
    const history = useHistory()
    const price = parseInt(stringprice)



    const ProductData = {
        name,
        description,
        price,
        category,
        color,
        size,
        seller: user?.id
    };

    const imgData = {
        image,
        preview: true
    }

    if(!user) {
       return <h4>User not logged in</h4>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

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
        if (image.length === 0) {
            setErrors(errors => [...errors, 'Please include a image url'])
            return
        }
        // try {
        // const imageUrl = new URL(image)
        //   if (imageUrl.protocol !== 'http:' && imageUrl.protocol !== 'https:') {
        //     setErrors(errors => [...errors, 'Please enter a valid image link (http/https protocol)']);
        //     return;
        //   }
        //     } catch (error) {
        //           setErrors(errors => [...errors, 'Please enter a valid image link']);
        //           return;
        //       }

        // const formData = new FormData();
        // formData.append("image", image);

        // setImageLoading(true);

        // const res = await fetch("/api/productImages/", {
        //     method: "POST",
        //     body: formData,
        // });
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     history.push("/productImages");
        // } else {
        //     setImageLoading(false);
        //     console.log("error");
        // }

              //     const response = await fetch(image, { method: 'HEAD' });
              //     const contentType = response.headers.get('content-type');
              //     if (!contentType || !contentType.startsWith('image/')) {
              //         setErrors(errors => [...errors, 'Please enter a valid image link']);
              //         return;
              //     }

        dispatch(createProductThunk({ProductData, imgData}))
        .then(() => history.push("/"))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
          });
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    return(
        <div className= "addproductmain">

            <form className="addproductform" onSubmit={handleSubmit} noValidate>
                <h1>Add a Product</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>
            <label className="namelabel">
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
            <label className="descriptionlabel">
                Description
            <textarea className="description-form"

            value={description}

            placeholder="Describe your product here"
            maxLength={255}
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            required

            ></textarea>
            </label>
            <label className="pricelabel">
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
            <label className="categorylabel">
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
            <label className="colorlabel">
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
            {/* <label className="sizelabel">
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
            <label className="sizelabel">
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

            {/* <label className="imagelabel">
                Image
            <input className="size-form"
            type="url"
            value={image}
            placeholder="Image"
            required
            onChange={(e) => {
                setImage(e.target.value)
            }}

            ></input>
            </label> */}
            <label className="imagelabel">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            </label>
            <button className="submit-form" type="Submit" >Submit</button>
            {/* {imageLoading && <p>Loading...</p>} */}
            </form>
            {/* <button className="demo-add-item"
            onClick={() => dispatch(createProductThunk(({name: "Demo Pants",description: "This is a description",price: 19.99, category: "pants" , color: "Demo Color", size: "Demo Size", seller: user?.id},
            {
                image: "https://target.scene7.com/is/image/Target/GUEST_b42925ba-d115-4575-b10d-c354a55bfaca?wid=1000&hei=1000&qlt=80&fmt=webp",
                preview: true
            }
            )))}
            >Demo Add Item</button> */}

        </div>
    )
}

export default AddProduct;
