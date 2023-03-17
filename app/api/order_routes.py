from flask import Blueprint, jsonify, request
from app.models import Order, db, Product, orderJoined, User, Cart
from sqlalchemy.orm import joinedload, session
import datetime
from flask_login import login_required, current_user

order_routes = Blueprint('orders', __name__)
@order_routes.route('/allOrders')
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
        # order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}
# refactor to take userID from request body
@order_routes.route('/<int:id>')
@login_required
def usersOrders(id):
    orders = db.session.query(Order).filter(Order.user_id == id).options(joinedload(Order.products))
    # orders = db.session.query(Order).filter(Order.user_id == body_data['user_id']).options(joinedload(Order.products))
    # print("QUERY DATA!!!!", orders)
    result = []
    for order in orders:
        order_object = order.to_dict()
        # print(order_object)
        products = {"products": [product.to_dict() for product in order.products]}
        order_object.update(products)
        order_object['date'] = order.date
        result.append(order_object)

    return {"orders": result}

@login_required
@order_routes.route('/', methods=['POST'])
def create_order():
    body_data = request.get_json()
    query_cart = db.session.query(Cart).filter(Cart.user_id == body_data["user_id"]).options(joinedload(Cart.products))
    carts = query_cart.all()
    result = []

    for cart in carts:
        allProducts = []
        for product in cart.products:
            productObj = product.to_dict()
            productObj["price"] = product.price
            allProducts.append(productObj)

        new_order = Order(
            user_id = body_data["user_id"],
            date = datetime.datetime.now()
        )
        db.session.add(new_order)
        db.session.commit()

        cartObj = cart.to_dict()
        cartObj.update({"products": allProducts})
        orderObj = new_order.to_dict()
        orderObj.update(cartObj)
        result.append(orderObj)

    full_result = {"products": result}
    return full_result



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
