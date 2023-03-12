from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField)
from wtforms.validators import DataRequired

class ProductImagesForm(FlaskForm):
    image = StringField("Image Url", validators=[DataRequired()])
    product_id = IntegerField("Product Id", validators=[DataRequired()])
    submit = SubmitField("Submit")
