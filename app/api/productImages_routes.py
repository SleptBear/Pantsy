from flask import Blueprint, jsonify
from app.models import Product, db, ProductImages

productImages_routes = Blueprint('productImages', __name__)


@productImages_routes.route('/')
def allImages():
    images = ProductImages.query.all()
    return {'productImages': [image.to_dict() for image in images]}

@productImages_routes.route('/<int:id>')
def imagesById(id):
    images = ProductImages.query.get(id)
    print("IMAGES", images.to_dict())
    return images.to_dict()
