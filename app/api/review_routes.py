from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
from app.forms import ReviewForm
import datetime
review_routes = Blueprint('reviews', __name__)


# get all reviews, mainly for testing
@review_routes.route('/')
def allReviews():
    reviews = Review.query.all()
    reviewList = []
    for review in reviews:
        print(review.to_dict())
        reviewList.append(review.to_dict())
    # reviewsDict = [reviews.to_dict() for review in reviews]
    return {'reviews': reviewList}

# get reviews by product id
# @review_routes.route('/<int:id>')
# def productReviews(id):
#     product = Product.query.get(id)
#     print("PRODUCT", product)
#     pd = product.to_dict()
#     user = product.users.to_dict()
#     reviews = product.reviews
#     pdReviews = {'reviews': [reviews.to_dict() for reviews in reviews]}
#     pdUser = {'seller': user}
#     pd.update(pdUser)
#     pd.update(pdReviews)
#     return pd

# get reviews by user


# create a review
@review_routes.route('/', methods=['POST'])
def createReview():
    date = datetime.datetime.now()
    print("DATE", date)
    data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    if form.validate_on_submit():
        new_review = Review(
            detail = data["detail"],
            rating = data["rating"],
            product_id = data["product_id"],
            user_id = data["user_id"],
            created_at = date
        )
        print(new_review.to_dict())
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return "Bad data, try again", 404



# delete review by review id
@review_routes.route('/<int:id>', methods=['DELETE'])
def deleteReview(id):
    review = Review.query.get(id)
    if not review:
        return ("Review not found"), 404

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully Deleted": id}
