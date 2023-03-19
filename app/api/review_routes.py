from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
from app.forms import ReviewForm
import datetime
from flask_login import login_required, current_user
review_routes = Blueprint('reviews', __name__)

# get all reviews, mainly for testing
@review_routes.route('/')
def allReviews():
    reviews = Review.query.all()
    reviewList = []
    for review in reviews:
        print(review.to_dict())
        reviewList.append(review.to_dict())
    return {'reviews': reviewList}

# create a review
@review_routes.route('/', methods=['POST'])
@login_required
def createReview():
    date = datetime.datetime.now()
    data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object

    if form.validate_on_submit():
        old_review = Review.query.filter_by(product_id=data["product_id"], user_id=current_user.id).first()
        if old_review:
            return {"message": "You have reviewed this product. You can't submit another review"}, 400
        new_review = Review(
            review = data["review"],
            rating = data["rating"],
            product_id = data["product_id"],
            user_id=current_user.id,
            created_at=date
        )
        print(new_review.to_dict())
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return {"message": "Bad data, try again"}, 400



@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editReview(id):
    date = datetime.datetime.now()
    data = request.get_json()
    form = ReviewForm()
    review = Review.query.filter_by(id=id).first()

    if review is None:
        return "Review not found", 404

    if review.user_id != current_user.id:
        return "You can't edit this review", 401

    if form.validate_on_submit():
        review.review = data["review"]
        review.rating = data["rating"]
        review.product_id = data["product_id"]
        review.user_id = data["user_id"]
        review.created_at = date

        db.session.commit()

        return review.to_dict()
    else:
        return "Bad data, try again", 404




# delete review by review id
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):
    review = Review.query.get(id)
    if not review:
        return ("Review not found"), 404

    if review.user_id != current_user.id:
        return {"error": "You can't delete this review."}, 401

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully Deleted": id}
