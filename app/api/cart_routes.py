from flask import Blueprint, jsonify, request
from app.models import db, Product, cartJoined, User, Cart, ProductImages
from sqlalchemy.orm import joinedload, session
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
# @login_required
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    result = []
    for cart in carts:
        allProducts = []
        for product in cart.products:
            productObj = product.to_dict()
            productObj["productimages"] = []
            for image in product.productimages:
                productObj["productimages"].append(image.to_dict())
            allProducts.append(productObj)

    cart_object = cart.to_dict()
    cart_object.update({"products": allProducts})
    result.append(cart_object)

    fullresult = {
        "products": result
    }
    # print("FULLRESULT", fullresult)
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
# @cart_routes.route('/<int:id>', methods=['DELETE'])
# def deleteCartItem(id):
#     body_data = request.get_json()
#     # print("BODY_DATA-------------", body_data)
#     carts = Cart.query.filter(Cart.id == id).all()
#     left_overs = []
#     for cart in carts:
#         print("CART===================>", cart.to_dict())
#         cart_obj = cart.to_dict()
#         cart_obj['products'] = []
#         # cart.products.remove(product)
#         for product in cart.products:
#             # if product.id == body_data:
#             #     continue
#             print("BODY DATA ============>", body_data)
#             product_obj = product.to_dict()
#             imagearray = [image.to_dict() for image in product.productimages]
#             product_obj['productimages'] = imagearray
#             cart_obj['products'].append(product_obj)
#             print("AFTER UPDATE===========>", cart_obj)
#                 # print("PRODUCT====================>", product.to_dict())
#                 # print("PRODUCTImages====================>", product.productimages)
#                 # print("ImagesARRAY====================>", imagearray)

#                 # print("IMAGE???????", product.productimages)
#                 # left_overs = [product.to_dict() for product in cart.products]
#                 # left_overs = cart.products
#                 # db.session.commit()
#                 # cart_obj['products'] = left_overs
#                 # print("CART!!!!!!", cart_obj)
#                 # print("LEFT OVERS!!!", left_overs)

#             return cart_obj

#     return {"cart": id}
@cart_routes.route('/<int:id>', methods=['DELETE'])
def deleteCartItem(id):
    body_data = request.get_json()
    cart = Cart.query.get(id)
    if not cart:
        return {'message': 'Cart not found'}, 404

    for product in cart.products:
        if product.id == body_data:
            cart.products.remove(product)

    db.session.commit()

    # carts = Cart.query.filter(Cart.id == id).all()
    # for cart in carts:
    cart_obj = cart.to_dict()
    cart_obj['products'] = []
    for product in cart.products:
        if product.id == body_data:
            continue
        product_obj = product.to_dict()
        imagearray = [image.to_dict() for image in product.productimages]
        product_obj['productimages'] = imagearray
        cart_obj['products'].append(product_obj)
    # left_overs = [product.to_dict() for product in cart.products if product.id == body_data]
    # print("AFTER===========>", cart_obj)
    # db.session.commit()
    return cart_obj


@cart_routes.route('/<int:cart_id>/product/<int:product_id>', methods=['POST'])
def addItemToCart(cart_id, product_id):
    cart = Cart.query.get(cart_id)
    product = Product.query.get(product_id)
    # Check if the cart exists
    if not cart:
        return {"error": "Cart not found"}, 404

    # Retrieve the product object from the database
    # product = Product.query.get(body_data['product_id'])

    # Check if the product exists
    if not product:
        return {"error": "Product not found"}, 404

    # Check if the product is already in the cart
    for item in cart.products:
        if item.id == product.id:
            return {"error": "Item is already in cart"}, 400

    # If the product is not already in the cart, add it
    cart.products.append(product)
    db.session.commit()

    return {"success": "Product added to cart"}

@cart_routes.route('/deletecart')
def clearCart(id):
    body_data = request.get_json()
    print("BODY_DATA", body_data)
    carts = Cart.query.filter(Cart.id == id).all()
    for cart in carts:
        if body_data == 'all':  # if body_data is 'all', delete all products from the cart
            cart.products.clear()  # remove all products from the cart
        else:
            for product in cart.products:
                if product.id == body_data:
                    print("product", product.id)
                    cart.products.remove(product)  # remove the product from the cart
        db.session.commit()

    return {"Cart submitted": id}
