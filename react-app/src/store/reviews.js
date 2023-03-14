const ADD_REVIEW = 'reviews/addReview'
const READ_REVIEW = 'reviews/readReview'
const DELETE_REVIEW = 'reviews/deleteReview'


const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const readReview = (reviews) => ({
    type: READ_REVIEW,
    payload: reviews
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
}) 

//THUNKS
export const addReviewThunk = (newReview, productID) => async (dispatch) => {
    const response = await fetch(`/api/products/${productID}/reviews` , {
        method: 'POST',
        body: JSON.stringify(newReview)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review))
        return review
    }
}

export const readReviewThunk = (productID) => async (dispatch) => {
    const response = await fetch(`/api/products/${productID}/`)
    const reviews = await response.json()
    dispatch(readReview(reviews))
}

export const deleteReviewThunk = (productID) => async (dispatch) => {
    const response = await fetch(`/api/products/${productID}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
        return data
    }
}

//initial state

initialState = {
    ProductReviews:{},
    UserReviews:{}
}
//REDUCER

export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case ADD_REVIEW:
            newState = { ...state}
            

        default:
            return state;
    }
}