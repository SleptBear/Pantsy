from app.models import db, Product, environment, SCHEMA, Cart
from sqlalchemy.sql import text

def seed_shopping_cart():
    product1 = Cart(name='Product 1', description='A great product', price=99.99, seller=1, category='Clothing', color='Red', size='M')
    product2 = Cart(name='Product 2', description='Another great product', price=149.99, seller=2, category='Electronics', color='Black', size='L')

    db.session.add_all([product1, product2])
    db.session.commit()


def undo_shopping_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()
