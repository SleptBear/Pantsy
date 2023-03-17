const ADD_CART = 'cart/addCart'
const DELETE_CART = 'cart/deleteCart'
const LOAD_CART = 'cart/loadCart'
const UPDATE_CART = 'cart/updateCart'

const addToCart = (item) => ({
    type: ADD_CART,
    payload: item
})

const deleteCart = (item) => ({
    type: DELETE_CART,
    payload: item
})

const loadCart = (cart) => ({
    type:LOAD_CART,
    payload: cart
})

const updateCart = (cart) => ({
    type: UPDATE_CART,
    payload: cart
})

// THUNKS

export const addToCartThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/cart/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    })
    if(response.ok) {
        const data = await response.json()
        dispatch(addToCart(data))
    }
    return response
}

export const deleteCartThunk = (userId,productid) => async (dispatch) => {
    console.log("USERID", userId)
    console.log("PRODUCTID", productid)
    const response = await fetch (`/api/cart/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productid)
    })
    console.log("RESPONSE", response)
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteCart(productid))
        return data
    }
}

export const loadCartThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/cart/${id}`)
    const data = await response.json()
    dispatch(loadCart(data))
    return data
}

export const updateCartThunk = (editedCart) => async (dispatch) => {
    const response = await fetch (`api/cart/`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCart)
    })

    if (response.ok){
        const data = await response.json()
        dispatch(updateCart(data))
        return data
    }
}

//initial state

let initialState = {
    Cart:{},
}
// Reducer

export const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case ADD_CART:
            newState = {...state}
            let newStateCopy = {...newState.Cart}
            newStateCopy[action.payload.id] = action.payload
            newState.Cart = newStateCopy
            return newState

        case DELETE_CART:
            newState= {...state}
            let cartCopy1 = {...newState.Cart}
            delete cartCopy1[action.payload.id]
            newState.Cart = cartCopy1
            return newState

        case LOAD_CART:
            newState = { ...state}
            newState.Cart = action.payload
            return newState

        case UPDATE_CART:
            return {...state,
                Cart: {
                    ...state.Cart,
                    ...action.payload

                }
            }

        default:
            return state;
    }
}
