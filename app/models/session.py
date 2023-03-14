from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float
from app.models import User

class Session(db.model):
    __tablename__="sessions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.String(), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "created_at": self.created_at
        }