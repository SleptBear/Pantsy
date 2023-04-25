from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField, BooleanField)
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.awshelpers_routes import ALLOWED_EXTENSIONS

class ProductImagesForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    product_id = IntegerField("Product Id", validators=[DataRequired()])
    previewImage = BooleanField("Preview Image", validators=[DataRequired()])
    submit = SubmitField("Submit")
