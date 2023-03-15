const ADD_ORDER = 'cart/addCart'
const LOAD_ORDER = 'cart/loadCart'

const addOrder = (item) => ({
    type: ADD_ORDER,
    payload: item
})


const loadOrder = (cart) => ({
    type:LOAD_ORDER,
    payload: cart
})


// THUNKS

export const addOrderThunk = (cartId, item) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}


export const loadOrderThunk = (cart) => async (dispatch) => {
    const response = await fetch (`api/order/`)
}



//initial state

let initialState = {
    Order:{},
}
// Reducer

export const orderReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case ADD_ORDER:
            newState = {...state}
            let newStateCopy = {...newState}

        case LOAD_ORDER:
            newState = { ...state}


        default:
            return state;
    }
}