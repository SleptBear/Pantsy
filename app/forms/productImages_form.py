from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField, BooleanField)
from wtforms.validators import DataRequired

class ProductImagesForm(FlaskForm):
    image = StringField("Image Url", validators=[DataRequired()])
    product_id = IntegerField("Product Id", validators=[DataRequired()])
    previewImage = BooleanField("Preview Image")
    submit = SubmitField("Submit")
