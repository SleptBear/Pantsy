const NEW_PRODUCT = 'product/newProduct'
const LOAD_PRODUCTS = 'product/loadProducts'
const EDIT_PRODUCT = 'product/editProduct'
const DELETE_PRODUCT = 'product/deleteProduct'
const LOAD_ONE_PRODUCT = 'product/loadOneProduct'
const ADD_IMAGE = 'product/addImage'

const createProduct = (product) => ({
    type: NEW_PRODUCT,
    payload: product
})

const loadProduct = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products
})

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
})

const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id
})

const singleProduct = (product) => ({
    type: LOAD_ONE_PRODUCT,
    payload: product
})

const addImages = (product) => ({
    type: ADD_IMAGE,
    payload: product
})
// Thunks

export const createProductThunk = ({ProductData, imgData}) => async (dispatch) => {
    // console.log("THUNK", product)
    // console.log("imgData", product.imgData)
    const response = await fetch(`/api/products/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ProductData)
    })
    // let ProductData;
    if(response.ok){
        ProductData = await response.json()
        // const productData = await response.json()
        // console.log("PRODUCTDATA", productData)
        const formData = new FormData()
        formData.append("previewImage", imgData.preview)
        formData.append("product_id", ProductData.id)
        formData.append("image", imgData.image)
        const res = await fetch(`/api/productImages/`, {
            method: 'POST',
            body: formData,
        })

        if(res.ok){
            const resData = await res.json()
            ProductData.productImages = [resData]
            // console.log("PRODUCTDATA", ProductData)

            dispatch(createProduct(ProductData))
            return
        }

    }
}

export const loadProductThunk = () => async (dispatch) => {
    const response = await fetch(`/api/products/`)
    const data = await response.json()
    dispatch(loadProduct(data))
    return response
}

export const singleProductThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    const data = await response.json()

    dispatch(singleProduct(data))
    return response
}


export const editProductThunk = (currentProductID, editedProduct, imgData) => async (dispatch) => {
    // console.log('CURRENT PRODUCT ID', currentProductID)
    // console.log("EDIT PRODUCT", editedProduct)
    const response = await fetch(`/api/products/${currentProductID}`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedProduct)
    })
    // console.log("RESOK", response)
    let data = await response.json()
    let data2;
    // console.log("IMAGE DATA========", imgData)
    if (response.ok && imgData.img_url.length > 5 ) {
        const response2 = await fetch(`/api/productImages/${currentProductID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imgData)
        })
        data2 = await response2.json()
    }

    if (response.ok){

        // console.log("DATA==================", data)
        // console.log("DATA2===================", data2)
        if(data2) data.productImages = [data2]
        dispatch(editProduct(data))
    }
    return data

}

export const deleteProductThunk = (id) => async (dispatch) => {
    // console.log("ID", id)
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(deleteProduct(id))
        return response
    }
}

const initialState = {allProducts: {}, singleProduct: {}}

export const productsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_PRODUCTS:
            newState = {...state}
            let allProductsCopy = {}
            action.payload.products.forEach(product => {
                allProductsCopy[product.id] = product
            })
            newState.allProducts = allProductsCopy
            // console.log("allproductscopy", allProductsCopy)
            return newState
        case NEW_PRODUCT:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState
        case LOAD_ONE_PRODUCT:
            newState = {...state}
            // console.log("Action", action)
            newState.singleProduct = action.payload
            return newState
        case EDIT_PRODUCT:
            return {...state,
                singleProduct: {
                    ...state.singleProduct,
                    ...action.payload
                }
            }
        case DELETE_PRODUCT:
            newState={...state}
            let productsCopy = {...newState.allProducts}
            delete productsCopy[action.id]
            newState.allProducts = productsCopy
            newState.singleProduct = {}

            return newState
        case ADD_IMAGE:
            newState = {...state}
            const newProductImage = {...state.singleProduct}
            newProductImage[action.payload.singleProduct] = action.payload.singleProduct
            newState.products = newProductImage
            return newState
        default:
            return state;
    }
}

export default productsReducer
