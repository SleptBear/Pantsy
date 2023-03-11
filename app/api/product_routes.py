from flask import Blueprint, jsonify
from app.models import Product, db

product_routes = Blueprint('products', __name__)



@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    pd = product.to_dict()
    user = product.users.to_dict()
    print('SELLER', product.users.to_dict())
    # print('IMAGES', product.productImages[0].to_dict())
    productImages = product.productImages
    pdImages = {'productImages': [productImages.to_dict() for productImages in productImages]}
    pdUser = {'seller': user}
    pd.update(pdUser)
    pd.update(pdImages)
    return pd

# @product_routes.route('/', methods=['POST'])
# def createProduct(id):



@product_routes.route('/<int:id>', methods=['DELETE'])
def removeProduct(id):
    product = Product.query.get(id)
    if not product:
        return ("Product not found"), 404

    db.session.delete(product)
    db.session.commit()

    return {"Product successfully Deleted": id}
