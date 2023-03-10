from flask import Blueprint, jsonify
from app.models import Product

product_routes = Blueprint('products', __name__)



@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    return product.to_dict()
