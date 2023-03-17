const ADD_ORDER = 'order/addOrder'
const LOAD_ORDER = 'order/loadOrder'
const DELETE_ORDER = 'order/deleteOrder'

const addOrder = (item) => ({
    type: ADD_ORDER,
    payload: item
})

const loadOrder = (order) => ({
    type:LOAD_ORDER,
    payload: order
})

const deleteOrder = (order) => ({
    type: DELETE_ORDER,
    payload: order
})


// THUNKS

export const addOrderThunk = (order) => async (dispatch) => {
    const response = await fetch(`/api/orders/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addOrder(data))
        return data
    }
}


export const loadOrderThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/orders/${id}`)
    const data = await response.json()
    dispatch(loadOrder(data))
    return data
}

export const deleteOrderThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/orders/`, {
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
    Order:[],
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
            // newState = { ...state}
            // console.log('ACTION', action.payload)
            // newState.Order = action.payload
            // console.log('NEWSTATE', newState.Order)
            // return newState
            return {
                ...state,
                orders: action.payload.orders,
            }
        default:
            return state;
    }
}
