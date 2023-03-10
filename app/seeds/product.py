from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    demo1 = Product(
        name="Jeans", description="Description of our first item", price="12.99", seller=1, category="pants", color='Blue', size='Large'
    )
    demo2 = Product(
        name="Slacks", description="Description of our second item", price="15.99", seller=2, category="pants", color='Black', size='Medium'
    )
    demo3 = Product(
        name="Khakis", description="Description of our third item", price="19.99", seller=1, category="pants", color='Tan', size='Large'
    )
    demo4 = Product(
        name="Shorts", description="Description of our fourth item", price="9.99", seller=3, category="pants", color='Green', size='Small'
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
