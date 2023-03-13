from app.models import db, Review, environment, SCHEMA, User, Product
from sqlalchemy.sql import text
import datetime


def seed_reviews():
    demo1 = Review(
        user_id=1, product_id=1, detail='TEST 1', rating=4,
        created_at=datetime.datetime.now()
    )
    demo2 = Review(
        user_id=2, product_id=2, detail='TEST 2', rating=2,
        created_at=datetime.datetime.now()
    )
    demo3 = Review(
        user_id=3, product_id=3, detail='TEST 3', rating=5,
        created_at=datetime.datetime.now()
    )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
