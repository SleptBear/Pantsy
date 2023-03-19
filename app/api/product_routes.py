from flask import Blueprint, jsonify, request
from app.models import Product, db, Review
from app.forms import ProductForm
from app.forms import ReviewForm
import datetime
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)


# gets all the products
@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    allProducts = []
    for product in products:
        pd = product.to_dict()
        pdImages = {'productImages': [productimages.to_dict() for productimages in product.productimages]}
        pd.update(pdImages)
        allProducts.append(pd)
    return {'products': allProducts}

# Gets the product by id
@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    pd = product.to_dict()
    user = product.users.to_dict()
    productimages = product.productimages
    pdImages = {'productImages': [productimages.to_dict() for productimages in productimages]}
    pdReviews = {'reviews': [reviews.to_dict() for reviews in product.reviews]}
    pdUser = {'seller': user}
    pd.update(pdUser)
    pd.update(pdImages)
    pd.update(pdReviews)
    return pd


#EDIT PRODUCT
# should be able to take product id from params OR request body
# discuss if we need form validations here or not
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateProduct(id):
    product = Product.query.get(id)
    data = request.get_json()
    # print("DATA", data)
    # seller:{email: 'demo@aa.io', id: 1, username: 'Demo'}
    # print("PRODUCT============>", product.users.to_dict())
    seller = product.users.to_dict()
    if product:
            product.name = data["name"]
            product.description = data["description"]
            product.price = str(data["price"])
            product.category = data["category"]
            product.color = data["color"]
            product.size = data["size"]
            db.session.commit()
            product_obj = product.to_dict()
            product_obj['seller'] = seller
            # print("RETURN===========>", product_obj)

            return product_obj
    else:
        return {"error: Product Does not Exist"}

# Creates a product
# @authenticate
@product_routes.route('/', methods=['POST'])
@login_required
def createProduct():
    data = request.get_json() # retrieves JSON data that was sent in POST request from client
    form = ProductForm()
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
        db.session.add(new_product) # adds to database session
        db.session.commit() # commits changes to database

        return new_product.to_dict()
    else:
        return form.errors

# Delete a product by id
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeProduct(id):
    product = Product.query.get(id)
    if not product:
        return ("Product not found"), 404

    db.session.delete(product)
    db.session.commit()

    return {"Product successfully Deleted": id}


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def createReview(id):
    date = datetime.datetime.now()
    print("DATE", date)
    data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object
    if form.validate_on_submit():
        old_review = Review.query.filter_by(product_id=data["product_id"], user_id=current_user.id).first()
        if old_review:
            return {"message": "You have already reviewed this product. You can't submit another review"}, 400
        new_review = Review(
            review = data["review"],
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
