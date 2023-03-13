from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, DateTimeField)
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[(DataRequired())])
    product_id = IntegerField("Product Id", validators=[(DataRequired())])
    detail = StringField("Detail", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    created_at = StringField("Created At")
    submit = SubmitField("Submit")
