from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField)
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = StringField("Price", validators=[DataRequired()])
    # seller = IntegerField("Seller")
    category = StringField("Category")
    color = StringField("Color")
    size = StringField("Size")
    submit = SubmitField("Submit")
