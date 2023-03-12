from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DATETIME
from app.models import User, Product

class Review(db.Model):
    __tablename__="reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    product_id = db.relationship("Product", back_populates="product", cascade='all, delete')
    detail = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DATETIME)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.user_id,
            'detail': self.detail,
            'rating': self.rating,
            'created_at': self.created_at,
        }
