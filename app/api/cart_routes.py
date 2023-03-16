from flask import Blueprint, jsonify, request
from app.models import db, Product, cartJoined, User, Cart
from sqlalchemy.orm import joinedload, session
from flask_login import login_required


cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
@login_required
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).options(joinedload(Cart.products))
    # print("QUERY DATA!!!!", carts)
    result = []
    for cart in carts:
        # print(cart.to_dict())
        cart_object = cart.to_dict()
        products = {"products": [product.to_dict() for product in cart.products]}
        cart_object.update(products)
        result.append(cart_object)

    return {"cart": result}

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
@login_required
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
@login_required
def deleteCart(id):
    body_data = request.get_json()
    cart = Cart.query.get(id)
    if not cart:
        return ("cart does not exist"), 404
    db.session.delete(cart)
    db.session.commit()

    return {"Cart submitted": id}
