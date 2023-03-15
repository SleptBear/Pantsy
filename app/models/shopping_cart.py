from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer

from app.models.product import Product

# Base = declarative_base()
cartJoined = db.Table(
    "cart_joined",
    db.Model.metadata,
    db.Column("product_id", db.ForeignKey(add_prefix_for_prod("product.id")), primary_key=True),
    db.Column("carts_id", db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
)

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    # session_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("session.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("product.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    # session = db.relationship("Session", back_populates="cartitem")
    product = db.relationship("Product", back_populates="cart_joined", secondary=cartJoined)

    def to_dict(self):
        return {
            'id': self.id,
            "session_id": self.session_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product
        }

# class OrderItem(Base):
#     __tablename__ = "orderitems"

#     id = db.Column(Integer, primary_key=True)
#     allItem = db.Column(String(500), nullable=False)

#     cartitem = db.relationship("CartItem", secondary="cart_joined", back_populates="orderitems")


# class Session(Base):
#     __tablename__="sessions"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(Integer, primary_key=True)
#     user_id = db.Column(Integer, ForeignKey(('users.id')), nullable=False)
#     created_at = db.Column(String(), nullable=False)
#     user = db.relationship("User", back_populates="sessions")
