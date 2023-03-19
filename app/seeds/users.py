from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    vian = User(
        username='Vian', email='vian@aa.io', password='password')
    leandro = User(
        username='Leandro', email='leandro@aa.io', password='password')
    sam = User(
        username='Sam', email='sam@aa.io', password='password')
    kian = User(
        username='Kian', email='kian@aa.io', password='password')
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(vian)
    db.session.add(leandro)
    db.session.add(sam)
    db.session.add(kian)
    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()