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

export const createProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/??`, {
        method: 'POST',
        body: JSON.stringify(product)
    })

       if(response.ok){

        const productData = await response.json()

        const res = await fetch(`/api/??`, {
            method: 'POST',
            body: JSON.stringify({
                url: product.productImage,
                preview: true
            })
        })
        if(res.ok){

            const imageData = await res.json()

            const combinedData = {previewImage: imageData.url, ...productData}
            dispatch(createProduct(combinedData))
            return combinedData
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


export const editProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/??`, {
        method:'PUT',
        body: JSON.stringify(product)
    })

    if (response.ok){
        const data = await response.json()
        dispatch(editProduct(data))
        return data
    }
}

export const deleteProductThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/product/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(deleteProduct(id))
        return response
    }
}

const initialState = {allProducts: {}, singleProduct: {}}

export const productsReducer = (state, action) => {
    let newState;
    switch(action.type){
        case LOAD_PRODUCTS:
            newState = {...state}
            let allProductsCopy = {}
            action.payload.Products.forEach(product => {
                allProductsCopy[product.id] = product
            })
            newState.allProducts = allProductsCopy
            return newState
        case NEW_PRODUCT:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState
        case LOAD_ONE_PRODUCT:
            newState = {...state}
            newState.singleProduct = action.payload
            return newState
        case EDIT_PRODUCT:
            return {...state,
                singleSpot: {
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
