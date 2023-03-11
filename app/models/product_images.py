from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float

class ProductImages(db.Model):
    __tablename__="images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(50), nullable=False)

    product = db.relationship("Product", back_populates="images")
    product_id = db.Column(db.Integer, ForeignKey("product.id", name="fk_images_product"), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image
        }
