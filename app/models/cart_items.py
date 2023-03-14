from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float
from app.models import Product, Session

class CartItem(db.model):
    __tablename__="cartitems"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    session_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sessions.id")), nullable=False)
    products = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("product.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String(), nullable=False)
    updated_at = db.Column(db.String(), nullable=False)
    product = db.relationship("Product", back_populates="cartitems")