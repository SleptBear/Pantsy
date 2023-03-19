 const CREATE_SEARCH = "search/create"

const createSearch = (search) => ({
    type: CREATE_SEARCH,
    payload: search
})

//THUNK

export const searchThunk = (search) => async (dispatch) => {
    const response = await fetch(`/api/search/${search}`);

    if (response.ok){
        const data = await response.json()
        dispatch(createSearch(data))
        return data
    }

}

//initial state

const initialState = {}

export const searchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_SEARCH:
            newState= {}
            action.payload.forEach(result => 
                newState[result.id] = result)
            return newState


      default:
        return state;  
    }
}