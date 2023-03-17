from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer

orderJoined = db.Table(
    "orderjoined",
    db.Model.metadata,
    db.Column("product_id", db.ForeignKey(add_prefix_for_prod("product.id")), primary_key=True),
    db.Column("order_id", db.ForeignKey(add_prefix_for_prod("order.id")), primary_key=True),
    # db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
)
if environment == "production":
    orderJoined.schema = SCHEMA

class Order(db.Model):
    __tablename__ = "order"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    date = db.Column(db.String)

    ## relationship attributes
    products = db.relationship("Product", back_populates="orderJoined", secondary=orderJoined)
    user = db.relationship("User", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "date": self.date
        }
