from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer



# Base = declarative_base()
cartJoined = db.Table(
    "cartjoined",
    db.Model.metadata,
    db.Column("product_id", db.ForeignKey(add_prefix_for_prod("product.id")), primary_key=True),
    db.Column("cart_id", db.ForeignKey(add_prefix_for_prod("cart.id")), primary_key=True),
)
if environment == "production":
    cartJoined.schema = SCHEMA

class Cart(db.Model):
    __tablename__ = "cart"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    products = db.relationship("Product", back_populates="cartJoined", secondary=cartJoined)
    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
        }
