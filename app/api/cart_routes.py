from flask import Blueprint, jsonify, request
from app.models import db, Product, cartJoined, User, Cart, ProductImages
from sqlalchemy.orm import joinedload, session
from flask_login import current_user

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
def readCart(id):
    # body_data = request.get_json()
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    # carts = Cart.query.filter(Cart.user_id == id).all()
    # products = Product.query.all()
    # print("products", products.productimages)
    # print("QUERY DATA!!!!", carts)

    result = []

    for cart in carts:
        # print(cart.to_dict())
        allProducts = []
        cart_object = cart.to_dict()
        products = {"products": [product.to_dict() for product in cart.products]}
        # print("CART", cart.products[0].productimages)
        for product in cart.products:
            for image in product.productimages:

                productObj = product.to_dict()

                productObj["productimages"] = []
                productObj["productimages"].append(image.to_dict())

                cart_object.update(productObj)

            result.append(cart_object)

    fullresult = {
        "products": result
    }
    print("FULLRESULT", fullresult)
    return fullresult

# discuss if we want cart to be created on user creation or on user add to cart
@cart_routes.route('/', methods=['POST'])
def createCart():
    body_data = request.get_json()
    new_cart = Cart(
        user_id = body_data['user_id']
    )
    db.session.add(new_cart)
    db.session.commit()

    return new_cart.to_dict()

@cart_routes.route('/', methods=["PUT"])
def editCart():
    body_data = request.get_json()
    product = Product.query.get(body_data["product_id"])
    # print("PRODUCT!!!!!", product)

    carts = db.session.query(Cart).filter(Cart.user_id == body_data["user_id"]).options(joinedload(Cart.products))
    # print("CARTS!!!!", carts)
    result = []
    for cart in carts:
        # print("FOR LOOP CART!!!!", cart)
        cart_object = cart.to_dict()
        # print("CART OBJECT!!!!", cart_object)
        cart.products.append(product)
        db.session.commit()  # save updates to the current cart
        result.append(cart.to_dict())

    return result


# want to refactor to take userID from body and search carts for that user id, then delete
@cart_routes.route('/<int:id>', methods=['DELETE'])
def deleteCart(id):
    body_data = request.get_json()
    print("BODY_DATA", body_data)
    carts = Cart.query.filter(Cart.id == id).all()
    for cart in carts:
        for product in cart.products:
            if product.id == body_data:
                print("product", product.id)
                db.session.delete(product)
                db.session.commit()



    return {"Cart submitted": id}

@cart_routes.route('/<int:id>', methods =['POST'])
def addItemToCart(id):
    cart = Cart.query.get(current_user.id)

    if not cart:
        return {"error": "Cart not found"}, 404

    product = Product.query.get(id)


    if not product:
        return {"error": "Product not found"}, 404

    print("CART BEFORE", cart.products)

    cart.products.append(product)
    print("CART AFTER", cart.products)

    # db.session.add(cart)
    db.session.commit()

    return {"success": "Product added to cart"}
