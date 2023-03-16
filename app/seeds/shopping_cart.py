from app.models import db, Product, environment, SCHEMA, Cart, cartJoined
from sqlalchemy.sql import text
import datetime
from random import choice

def seed_cart():
    products = Product.query.all()
    products_list = list(products)
    print("product", products_list)
     # create some sample cart items
    cart1 = Cart(user_id=1, products=[choice(products)])
    cart2 = Cart(user_id=2, products=[choice(products)])
    cart3 = Cart(user_id=3, products=[choice(products)])

    # add the cart items to the database
    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()

    print("Cart items seeded successfully!")


def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart"))

    db.session.commit()
