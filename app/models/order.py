from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer

from app.models.product import Product

orderJoined = db.Table(
    "orderjoined",
    db.Model.metadata,
    db.Column("product_id", db.ForeignKey(add_prefix_for_prod("product.id")), primary_key=True),
    db.Column("order_id", db.ForeignKey(add_prefix_for_prod("order.id")), primary_key=True),
)

class Order(db.Model):
    __tablename__ = "order"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
    date = db.Column(db.String)
    ## relationship attributes
    products = db.relationship("Order", back_populates="orderjoined", secondary=orderJoined)

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id
        }
