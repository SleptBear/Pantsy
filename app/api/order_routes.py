from flask import Blueprint, jsonify, request
from app.models import Order, db, Product, orderJoined, User
from sqlalchemy.orm import joinedload, session

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
def allOrders():
    orders = db.session.query(Order).options(joinedload(Order.products))
    print("QUERY DATA!!!!", orders)
    result = []
    for order in orders:
        print(order.date)
        date = order.date
        order_object = order.to_dict()
        print(order_object)
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        # order_object.update(date)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}

@order_routes.route('/<int:id>')
def usersOrders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).options(joinedload(Order.products))
    print("QUERY DATA!!!!", orders)
    result = []
    for order in orders:
        print(order.date)
        date = order.date
        order_object = order.to_dict()
        print(order_object)
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        # order_object.update(date)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}



@order_routes.route('/<int:id>', methods=['DELETE'])
def removeOrder(id):
    order = Order.query.get(id)
    if not order:
        return ("order does not exist"), 404
    db.session.delete(order)
    db.session.commit()

    return {"Order successfully Canceled": id}
