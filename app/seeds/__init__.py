from flask.cli import AppGroup
from .users import seed_users, undo_users
from .product import seed_products, undo_products
from .product_images import seed_productImages, undo_productImages
from .review import seed_reviews, undo_reviews
from .shopping_cart import seed_cart, undo_cart
from .order import seed_order, undo_order

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_products()
        undo_productImages()
        undo_reviews()
        undo_cart()
        undo_order()
    seed_users()
    seed_products()
    seed_productImages()
    seed_reviews()
    seed_cart()
    seed_order()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_products()
    undo_productImages()
    undo_reviews()
    undo_cart()
    undo_order()
    # Add other undo functions here
