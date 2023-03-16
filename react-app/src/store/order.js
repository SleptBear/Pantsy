const ADD_ORDER = 'cart/addCart'
const LOAD_ORDER = 'cart/loadCart'
const DELETE_ORDER = 'cart/deleteCart'

const addOrder = (item) => ({
    type: ADD_ORDER,
    payload: item
})

const loadOrder = (cart) => ({
    type:LOAD_ORDER,
    payload: cart
})

const deleteOrder = (cart) => ({
    type: DELETE_ORDER,
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

    if (response.ok) {
        const data = await response.json()
        dispatch(addOrder(data))
        return data
    }
}


export const loadOrderThunk = (id) => async (dispatch) => {
    console.log('id', id)
    const response = await fetch (`api/orders/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    dispatch(loadOrder(data))
    return data
}

export const deleteOrderThunk = (id) => async (dispatch) => {
    const response = await fetch (`api/orders/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteOrder(id))
        return data
    }
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
            let newStateCopy = {...newState.Order}
            newStateCopy[action.payload.id] = action.payload
            newState.Order = newStateCopy
            return newState

        case LOAD_ORDER:
            newState = { ...state}

            let orderCopy = {}
            action.payload.order.forEach(order => {
                orderCopy = order
            });
            newState.Order = orderCopy
            return newState


        default:
            return state;
    }
}
