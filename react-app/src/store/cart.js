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

export const addToCartThunk = (cartId, item) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export const deleteCartThunk = (item) => async (dispatch) => {
    const response = await fetch (`/api/cart/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteCart(data))
        return data
    }
}

export const loadCartThunk = (cart) => async (dispatch) => {
    const response = await fetch (``)
}

export const updateCartThunk = (cartID, editedCart) => async (dispatch) => {
    const response = await fetch (`api/cart/${cartID}`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( editedCart)
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
            let newStateCopy = {...newState}

        case DELETE_CART:
            newState= {...state}

        case LOAD_CART:
            newState = { ...state}

        case UPDATE_CART: 

        default:
            return state;
    }
}