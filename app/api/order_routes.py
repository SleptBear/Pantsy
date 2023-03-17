from flask import Blueprint, jsonify, request
from app.models import Order, db, Product, orderJoined, User, Cart
from sqlalchemy.orm import joinedload, session
import datetime
from flask_login import login_required, current_user

order_routes = Blueprint('orders', __name__)
@order_routes.route('/allOrders')
def allOrders():
    orders = db.session.query(Order).options(joinedload(Order.products))
    result = []
    for order in orders:
        date = order.date
        order_object = order.to_dict()
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        result.append(order_object)

    return {"orders": result}

@order_routes.route('/<int:id>')
@login_required
def usersOrders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).options(joinedload(Order.products))
    result = []
    for order in orders:
        order_object = order.to_dict()
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}

@login_required
@order_routes.route('/', methods=['POST'])
def create_order():
    # body_data = request.get_json()
    
    query_cart = db.session.query(Cart).filter(Cart.user_id == current_user.id).options(joinedload(Cart.products))
    carts = query_cart.all()
    if not carts:
        return {'message': 'Order not found'}, 404
    products_arr = []
    new_order = Order(
        user_id = current_user.id,
        date = datetime.datetime.now()
    )
    for cart in carts:
        cart_obj = cart.to_dict()
        cart_obj['products'] = []
        for product in cart.products:
            product_obj = product.to_dict()
            products_arr.append(product_obj)
            new_order.products.append(product)

        db.session.add(new_order)
        db.session.commit()

    # Return the response
    return {"products": products_arr}




# refactor or make sure front end body can send orderId
@order_routes.route('/', methods=['DELETE'])
@login_required
def removeOrder():
    body_data = request.get_json()
    order = Order.query.get(body_data['order_id'])
    if not order:
        return ("order does not exist"), 404
    db.session.delete(order)
    db.session.commit()

    return {"Order successfully Canceled": id}
