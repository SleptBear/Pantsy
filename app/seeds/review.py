from app.models import db, Review, environment, SCHEMA, User, Product
from sqlalchemy.sql import text
import datetime


def seed_reviews():
    demo1 = Review(
        user_id=1, product_id=1, review='GREAT PRODUCT 10/10 would buy again', rating=5,
        created_at=datetime.datetime.now()
    )
    demo2 = Review(
        user_id=2, product_id=1, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo3 = Review(
        user_id=3, product_id=1, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo4 = Review(
        user_id=4, product_id=1, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo5 = Review(
        user_id=1, product_id=2, review='GREAT PRODUCT 10/10 would buy again', rating=5,
        created_at=datetime.datetime.now()
    )
    demo6 = Review(
        user_id=2, product_id=2, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo7 = Review(
        user_id=3, product_id=2, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo8 = Review(
        user_id=4, product_id=2, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo9 = Review(
        user_id=1, product_id=3, review='GREAT PRODUCT 10/10 would buy again', rating=5,
        created_at=datetime.datetime.now()
    )
    demo10 = Review(
        user_id=2, product_id=3, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo11 = Review(
        user_id=3, product_id=4, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo12 = Review(
        user_id=4, product_id=4, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo13 = Review(
        user_id=2, product_id=5, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo14 = Review(
        user_id=3, product_id=5, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo15 = Review(
        user_id=4, product_id=6, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo16 = Review(
        user_id=2, product_id=6, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo17 = Review(
        user_id=3, product_id=7, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo18 = Review(
        user_id=4, product_id=7, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo19 = Review(
        user_id=4, product_id=8, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo20 = Review(
        user_id=2, product_id=8, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo21 = Review(
        user_id=3, product_id=9, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo22 = Review(
        user_id=4, product_id=9, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo23 = Review(
        user_id=2, product_id=10, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo24 = Review(
        user_id=3, product_id=10, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo25 = Review(
        user_id=4, product_id=10, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo26 = Review(
        user_id=2, product_id=11, review='THE GOOD', rating=4,
        created_at=datetime.datetime.now()
    )
    demo27 = Review(
        user_id=3, product_id=11, review='THE BAD 1', rating=1,
        created_at=datetime.datetime.now()
    )
    demo28 = Review(
        user_id=4, product_id=12, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
    )
    demo29 = Review(
        user_id=4, product_id=12, review='THE UGLY', rating=2,
        created_at=datetime.datetime.now()
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
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.add(demo24)
    db.session.add(demo25)
    db.session.add(demo26)
    db.session.add(demo27)
    db.session.add(demo28)
    db.session.add(demo29)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
