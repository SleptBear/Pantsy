from flask import Blueprint, jsonify, request
from app.models import Product, db, ProductImages
from app.forms import ProductImagesForm
productImages_routes = Blueprint('productImages', __name__)


@productImages_routes.route('/')
def allImages():
    images = ProductImages.query.all()
    return {'productImages': [image.to_dict() for image in images]}

@productImages_routes.route('/<int:id>')
def imagesById(id):
    images = ProductImages.query.get(id)
    print("IMAGES", images.to_dict())
    return images.to_dict()

@productImages_routes.route('/', methods=['POST'])
def createProductImage():
    data = request.get_json()
    form = ProductImagesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_productImage = ProductImages(
            image = data["image"],
            product_id = data["product_id"],
            previewImage= data['previewImage']
        )
        print(new_productImage.to_dict())
        db.session.add(new_productImage)
        db.session.commit()

        return new_productImage.to_dict()
    else:
        return "Bad Data"
