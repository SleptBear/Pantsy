from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    demo1 = Product(
        name="Jeans", description="Sleek looking Blue jeans", price="12.99", seller=1, category="jeans", color='Blue', size='Small'
    )
    demo2 = Product(
        name="Jeans", description="Sleek looking Red jeans", price="12.99", seller=1, category="jeans", color='Red', size='Medium'
    )
    demo3 = Product(
        name="Jeans", description="Sleek looking Black jeans", price="12.99", seller=2, category="jeans", color='Black', size='Large'
    )
    demo4 = Product(
        name="Slacks", description="Perfect Black slacks for a Casual setting", price="15.99", seller=2, category="casual", color='Black', size='Small'
    )
    demo5 = Product(
        name="Slacks", description="Perfect White slacks for a Casual setting", price="15.99", seller=3, category="casual", color='White', size='Medium'
    )
    demo6 = Product(
        name="Slacks", description="Perfect Teal slacks for a Casual setting", price="15.99", seller=4, category="casual", color='Teal', size='Large'
    )
    demo7 = Product(
        name="Khakis", description="These Beige khakis will make your work uniform look great and your job less miserable!", price="19.99", seller=3, category="pants", color='Beige', size='Small'
    )
    demo8 = Product(
        name="Khakis", description="These Black khakis will make your work uniform look great and your job less miserable!", price="19.99", seller=4, category="pants", color='Black', size='Medium'
    )
    demo9 = Product(
        name="Khakis", description="These Grey khakis will make your work uniform look great and your job less miserable!", price="19.99", seller=1, category="pants", color='Grey', size='Large'
    )
    demo10 = Product(
        name="Joggers", description="Unique joggers, can be worn as a fashion statement or to workout!", price="9.99", seller=2, category="jogger", color='Green', size='Small'
    )
    demo11 = Product(
        name="Joggers", description="Unique joggers, can be worn as a fashion statement or to workout!", price="9.99", seller=3, category="jogger", color='Black', size='Medium'
    )
    demo12 = Product(
        name="Joggers", description="Unique joggers, can be worn as a fashion statement or to workout!", price="9.99", seller=4, category="jogger", color='Grey', size='Large'
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()
