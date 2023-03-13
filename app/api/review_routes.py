from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms import ProductForm

review_routes = Blueprint('reviews', __name__)


# get all reviews, mainly for testing
@review_routes.route('/')
def allReviews():
    reviews = Review.query.all()
    reviewList = []
    for review in reviews:
        print(review.to_dict())
        reviewList.append(review.to_dict())
    []

    # reviewsDict = [reviews.to_dict() for review in reviews]
    return {'reviews': reviewList}


# get reviews by product id
@review_routes.route('/<int:id>')
def productReviews(id):
    pass


# get reviews by user
