from app.models import db, Review, environment, SCHEMA, User, Product
from sqlalchemy.sql import text
import datetime


def seed_reviews():
    reviews = [
        Review(
            user_id=1, product_id=1, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=1, review='THE GOOD', rating=3,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=1, review='THE BAD 1', rating=1,
            created_at=datetime.datetime.now()
        ),
       Review(
            user_id=1, product_id=2, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=2, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=2, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=3, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=3, review='THE GOOD', rating=3,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=3, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=4, review='terrible would not buy again', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=4, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=4, review='its meh', rating=3,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=5, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=5, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=5, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=6, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=6, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=6, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=7, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=7, review='THE GOOD', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=7, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=8, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=8, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=8, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=9, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=9, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=9, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=10, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=10, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=10, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=11, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=11, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=11, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=12, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=12, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=12, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=13, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=13, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=13, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=14, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=14, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=14, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=15, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=15, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=15, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=16, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=16, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=16, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=17, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=17, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=17, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=18, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=18, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=18, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=19, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=19, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=19, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=22, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=22, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=22, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=21, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=21, review='THE GOOD', rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=21, review='Terrible product, dont buy it', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=20, review='DAY MAN (AH-AH-AH) ', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=20, review='FIGHTER OF THE NIGHTMAN (AH-AH-AH)', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=20, review='DAYMAN (AH-AH-AH)', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, product_id=23, review='GREAT PRODUCT 10/10 would buy again', rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, product_id=23, review='i wish it came with scissors', rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, product_id=23, review='should have gotten shorts', rating=1,
            created_at=datetime.datetime.now()
        ),
    ]

    for review in reviews:
        db.session.add(review)
    
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
