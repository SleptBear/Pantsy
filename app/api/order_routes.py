from flask import Blueprint, jsonify, request
from app.models import Order, db, Product, orderJoined, User
from sqlalchemy.orm import joinedload, session
import datetime
from flask_login import login_required

order_routes = Blueprint('orders', __name__)
@order_routes.route('')
def allOrders():
    orders = db.session.query(Order).options(joinedload(Order.products))
    print("QUERY DATA!!!!", orders)
    result = []
    for order in orders:
        print("Key into date", order.date)
        date = order.date
        order_object = order.to_dict()
        print("order object", order_object)
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        # order_object.update(date)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}
# refactor to take userID from request body
@order_routes.route('/')
@login_required
def usersOrders():
    body_data = request.get_json()
    # orders = db.session.query(Order).filter(Order.user_id == id).options(joinedload(Order.products))
    orders = db.session.query(Order).filter(Order.user_id == body_data['user_id']).options(joinedload(Order.products))
    # print("QUERY DATA!!!!", orders)
    result = []
    for order in orders:
        # print(order.date)
        date = order.date
        order_object = order.to_dict()
        # print(order_object)
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        # order_object.update(date)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}

@order_routes.route('/', methods=['POST'])
@login_required
def createOrder():
    body_data = request.get_json()
    product_ids = body_data["product_ids"]

    new_order = Order(
        user_id = body_data["user_id"],
        date = datetime.datetime.now()
    )
    # order_obj = new_order.to_dict()
    # products = {"products": [Product.query.get(id) for id in product_ids]}
    # order_obj.update(products)
    new_order.products = [Product.query.get(id) for id in product_ids]


    print("NEW ORDER", new_order)
    # print("NEW ORDER", order_obj['products'])
    print("NEW ORDER", new_order.products)

    db.session.add(new_order)
    db.session.commit()

    return new_order.to_dict()

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
