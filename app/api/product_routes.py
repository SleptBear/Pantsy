from flask import Blueprint, jsonify, request
from app.models import Product, db
from app.forms import ProductForm
# from app.api.auth_routes import authenticate

product_routes = Blueprint('products', __name__)


# gets all the products
@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    allProducts = []
    for product in products:
        pd = product.to_dict()

        pdImages = {'productImages': [productImages.to_dict() for productImages in product.productImages]}
        print("LIST COMP", pdImages)
        pd.update(pdImages)
        print("PD", pd)
        allProducts.append(pd)
    print("ALLPRODUCTS", allProducts)
    # return {'products': [product.to_dict() for product in products]}
    return {'products': allProducts}

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


#EDIT PRODUCT 
@product_routes.route('/<int:id>', methods=['PUT'])
def updateProduct(id):
    product = Product.query.get(id)
    data = request.get_json()
    # print("DATA", data)
    if product:
            product.name = data["name"]
            product.description = data["description"]
            product.price = str(data["price"])
            product.category = data["category"]
            product.color = data["color"]
            product.size = data["size"]
            db.session.commit()
            return product.to_dict()
    else:
        return {"error: Product Does not Exist"}

# Creates a product
# @authenticate
@product_routes.route('/', methods=['POST'])
def createProduct():
    data = request.get_json() # retrieves JSON data that was sent in POST request from client
    form = ProductForm()
    print("DATA from request", data)
    print("request", request)
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    if form.validate_on_submit():
        new_product = Product(
            name = data["name"],
            description = data["description"],
            price = data["price"],
            seller = data["seller"],
            category = data["category"],
            color = data["color"],
            size = data["size"]
        )
        print(new_product.to_dict()) # for debugging purposes
        db.session.add(new_product) # adds to database session
        db.session.commit() # commits changes to database

        return new_product.to_dict()
    else:
        return form.errors

# Delete a product by id
@product_routes.route('/<int:id>', methods=['DELETE'])
def removeProduct(id):
    product = Product.query.get(id)
    if not product:
        return ("Product not found"), 404

    db.session.delete(product)
    db.session.commit()

    return {"Product successfully Deleted": id}
