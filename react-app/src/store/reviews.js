const ADD_REVIEW = 'reviews/addReview'
const READ_REVIEW = 'reviews/readReview'
const DELETE_REVIEW = 'reviews/deleteReview'
const EDIT_REVIEWS = 'reviews/editReviews' // editing/update a review


const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const readReview = (reviews) => ({
    type: READ_REVIEW,
    payload: reviews
})

export const updateReview = (reviews) => ({
    type: EDIT_REVIEWS,
    payload: reviews
})



const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

//THUNKS
export const addReviewThunk = (id, review) => async (dispatch) => {

    // console.log("REVIEW", review)
    // console.log("ID", id)
    const response = await fetch(`/api/products/${id}/reviews` , {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: review.userId,
            product_id: id,
            review: review.review,
            rating: review.rating
        })
    })
    // console.log("RESPONSE", response)
    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review))
        return review
    }
}

export const readReviewThunk = (productID) => async (dispatch) => {
    const response = await fetch(`/api/products/${productID}`)
    const reviews = await response.json()
    dispatch(readReview(reviews))
}

export const editReviewThunk = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateReview(data))
        return data
    }
}



export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
        return data
    }
}

//initial state

let initialState = {
    ProductReviews:{},
    UserReviews:{}
}
//REDUCER

export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_REVIEW:
            newState = { ...state}
            let reviewsCopy = {}

            action.payload.reviews.forEach(review => {
                reviewsCopy[review.id] = review
            })
            newState.ProductReviews = reviewsCopy
            return newState
        case ADD_REVIEW:
            newState = {...state}
            let newStateCopy = {...newState.ProductReviews}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState

        case EDIT_REVIEWS:
            const updatedReviews = { ...state.reviews }
            updatedReviews[action.payload.id] = action.payload
            return { ...state, reviews: updatedReviews }
        case DELETE_REVIEW:
            newState = {...state}
            let reviewCopy = {...newState.ProductReviews}
            delete reviewCopy[action.payload.id]
            newState.ProductReviews = reviewCopy
            return newState
        default:
            return state;
    }
}
