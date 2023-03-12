from flask import Blueprint, jsonify, request
from app.models import Product, db
from app.forms import ProductForm

product_routes = Blueprint('products', __name__)


# gets all the products
@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

# Gets the product by id
@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    pd = product.to_dict()
    user = product.users.to_dict()
    print('SELLER', product.users.to_dict())
    print('IMAGES', product.productImages[0].to_dict())
    productImages = product.productImages
    pdImages = {'productImages': [productImages.to_dict() for productImages in productImages]}
    pdUser = {'seller': user}
    pd.update(pdUser)
    pd.update(pdImages)
    return pd

# Creates a product
@product_routes.route('/', methods=['POST'])
def createProduct():
    data = request.get_json()
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            name = data["name"],
            description = data["description"],
            price = str(data["price"]),
            seller = data["seller"],
            category = data["category"],
            color = data["color"],
            size = data["size"]
        )
        print(new_product.to_dict())
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    else:
        return "Bad Data"

# Delete a product by id
@product_routes.route('/<int:id>', methods=['DELETE'])
def removeProduct(id):
    product = Product.query.get(id)
    if not product:
        return ("Product not found"), 404

    db.session.delete(product)
    db.session.commit()

    return {"Product successfully Deleted": id}
