from flask import Blueprint, jsonify, request
from app.models import db, Product, cartJoined, User, Cart
from sqlalchemy.orm import joinedload, session


cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).options(joinedload(Cart.products))
    print("QUERY DATA!!!!", carts)
    result = []
    for cart in carts:
        print(cart.to_dict())
        cart_object = cart.to_dict()
        products = {"products": [product.to_dict() for product in cart.products]}
        cart_object.update(products)
        result.append(cart_object)

    return {"cart": result}


@cart_routes.route('/<int:id>', methods=['POST'])
def createCart(id):
    new_cart = Cart(
        user_id = id
    )
    db.session.add(new_cart)
    db.session.commit()

    return new_cart.to_dict()

@cart_routes.route('/<int:id>', methods=["PUT"])
def editCart(id):
    body_data = request.get_json()
    product = Product.query.get(body_data["product_id"])
    print("PRODUCT!!!!!", product)

    carts = db.session.query(Cart).filter(Cart.user_id == body_data["user_id"]).options(joinedload(Cart.products))
    print("CARTS!!!!", carts)
    result = []
    for cart in carts:
        print("FOR LOOP CART!!!!", cart)
        cart_object = cart.to_dict()
        print("CART OBJECT!!!!", cart_object)
        cart.products.append(product)
        db.session.commit()  # save updates to the current cart
        result.append(cart.to_dict())

    return result



@cart_routes.route('/<int:id>', methods=['DELETE'])
def deleteCart(id):
    cart = Cart.query.get(id)
    if not cart:
        return ("cart does not exist"), 404
    db.session.delete(cart)
    db.session.commit()

    return {"Cart submitted": id}
