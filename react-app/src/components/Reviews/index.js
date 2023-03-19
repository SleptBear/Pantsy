import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { readReviewThunk, addReviewThunk, deleteReviewThunk } from '../../store/reviews'

export const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    const [review, setReviews] = useState()
    const [rating, setRating] = useState(5)
    const reviewsObj = useSelector(state => state.reviewsReducer.ProductReviews)
    const sellerObj = useSelector(state => state.productsReducer.singleProduct.seller)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const reviews = Object.values(reviewsObj)
    const [errors, setErrors] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(readReviewThunk(ID))
    }, [dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (!review) {
            setErrors(["Please enter a review"])
            setTimeout(() => {
                setErrors([])
            }, 2000)
            return
        }
        return dispatch(addReviewThunk(ID, { userId, id, review, rating }))
            .then(() => {
                dispatch(readReviewThunk(id.id))
                setShowForm(false)
                setReviews("")
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                } else if (data && data.message) {
                  setErrors([data.message]);
                }
                setShowForm(true);
                setTimeout(() => {
                  setErrors([]);
                }, 2000);
              });
    }
    const userHasReview = reviews.some(({user_id}) => user_id === userId)
    const loggedIn = () => {
        if(!user) {
           return <p>Please log in to post a review.</p>
        } else {
            return null;
        }
    }
    const reviewCheck = () => {
        if(Object.keys(reviewsObj).length === 0) {
            return <p>There are no reviews for this product yet!</p>
        } else {
            return null;
        }
    }

    const avgReview = () => {
      console.log("REVIEWOBJ==========>", Object.values(reviewsObj))
      let reviewsArray = Object.values(reviewsObj)
      let ratingsArray = []
      reviewsArray.forEach(review => {
        ratingsArray.push(review.rating)
      })
      let initialValue = 0
      let avgRating = ratingsArray.reduce((a, b) => a + b, initialValue);

      return(avgRating/ratingsArray.length).toFixed(2)
    }
    return (
        <div>
          {/* <h2>Reviews</h2> */}
          <h2>{Object.values(reviewsObj).length} Shop Reviews <i className="fa-solid fa-star"></i>{avgReview()} </h2>
          {reviews.map(({ id, review, rating, user_id }) => {
            return (
              <div key={id}>
                <p>Review: {review}</p>
                <p>Rating: {rating}</p>
                {user_id === userId && (
                  <button
                    className="delete button"
                    onClick={() =>
                      dispatch(deleteReviewThunk(id)).then(() => {
                        dispatch(readReviewThunk(ID));
                      })
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
          <div>
            {console.log("REVIEWSOBJ", reviewsObj)}
            {user && sellerObj?.id !== userId ? (
              userHasReview ? null : (
                showForm ? (
                  <div>
                    <form className="reviewsform" onSubmit={handleSubmit} noValidate>
                      <ul className="ul">
                        {errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                      <textarea
                        className="reviewtextbox"
                        type="textbox"
                        defaultValue="Post a review here!"
                        onFocus={(e) => {
                          if (e.target.defaultValue === "Post a review here!") {
                            setReviews("");
                          }
                        }}
                        value={review}
                        maxLength={255}
                        onChange={(e) => {
                          setReviews(e.target.value);
                        }}
                        required
                      ></textarea>
                      <select
                        className="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button className="submitbutton" type="submit">
                        Submit
                      </button>
                    </form>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setShowForm(true)}>Add a Review</button>
                )
              )
            ) : (
              null
            )}
           <p>{loggedIn()}</p>
           <p>{reviewCheck()}</p>
          </div>


        </div>
      );



}
