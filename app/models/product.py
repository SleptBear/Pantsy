from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float
from app.models import User

class Product(db.Model):
    __tablename__="product"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    seller = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(25), nullable=False)
    size = db.Column(db.String(25), nullable=False)
    # user_id = db.Column(db.Integer, ForeignKey("users.id"))
    users = db.relationship("User", back_populates="product")
    productImages = db.relationship("ProductImages", back_populates="product", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'seller': self.seller,
            'category': self.category,
            'color': self.color,
            'size': self.size,
        }
