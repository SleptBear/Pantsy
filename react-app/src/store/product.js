const NEW_PRODUCT = 'product/NEW_PRODUCT'
const LOAD_PRODUCT = 'product/LOAD_PRODUCT'
const EDIT_PRODUCT = 'product/EDIT_PRODUCT'
const DELETE_PRODUCT = 'product/DELETE_PRODUCT'
const SINGLE_PRODUCT = 'product/SINGLE_PRODUCT'

const createProduct = (product) => ({
    type: NEW_PRODUCT,
    payload: product
})

const loadProduct = (products) => ({
    type: LOAD_PRODUCT,
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
    type: SINGLE_PRODUCT,
    payload: product
})

// Thunks

export const createProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/??`, {
        method: 'POST',
        body: JSON.stringify(product)
    })

    if(response.ok){
        const data = await response.json()
        dispatch(createProduct(data))
        return response

    }
}

export const loadProductThunk = () => async (dispatch) => {
    const response = await fetch(`/api/??`)
    const data = await response.json()
    dispatch(loadProduct(data))
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

export const deleteProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/??`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(deleteProduct(product.id))
        return response
    }
}

const initialState = {allProducts: {}, singleProduct: {}}

export const productsReducer = (state, action) => {
    let newState;
    switch(action.type){

    }
}
