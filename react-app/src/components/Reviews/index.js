import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route, useParams } from 'react-router-dom'
import { readReviewThunk, addReviewThunk } from '../../store/reviews'

export const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    console.log("ID", ID)
    const [ review, setReviews ] = useState()
    const [rating, setRating] = useState(5)
    const reviewsObj = useSelector(state => state.reviewsReducer.ProductReviews)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    console.log("USERID", userId)
    const reviews = Object.values(reviewsObj)
    // console.log("REVIEWS", reviews)

    useEffect(() => {
        dispatch(readReviewThunk(ID))
    }, [dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()

        return dispatch(addReviewThunk(ID, {userId, id, review, rating}))
        .then(() => {
            dispatch(readReviewThunk(id.id))
        })
    }


    return(
        <div>
            <h2>Reviews</h2>
            {reviews.map(({id, review, rating, user_id}) => {
                return <div>
                    <p>Review: {review}</p>
                    <p>Rating: {rating}</p>
                    </div>
            })}
            <div>
                <form className="reviewsform" onSubmit={handleSubmit}>
                    <textarea className="reviewtextbox"
                     type='textbox'
                     defaultValue="Post a review here!"
                     onFocus={(e) => {
                        if(e.target.defaultValue === "Post a review here!") {
                            setReviews("")
                        }
                     }}
                     value={review}
                     maxLength={255}
                     onChange={(e) => {
                        setReviews(e.target.value)
                     }}
                     required
                    ></textarea>
                    <select className="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                     <button className='submitbutton' type="Submit">Submit</button>
                </form>
            </div>
        </div>

    )
}
