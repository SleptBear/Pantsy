from flask import Blueprint, jsonify, request
from app.models import Product, db, ProductImages
from app.forms import ProductImagesForm
from flask_login import login_required, current_user

productImages_routes = Blueprint('productImages', __name__)


@productImages_routes.route('/')
def allImages():
    images = ProductImages.query.all()
    return {'productImages': [image.to_dict() for image in images]}

@productImages_routes.route('/<int:id>')
def imagesById(id):
    images = ProductImages.query.get(id)
    # print("IMAGES", images.to_dict())
    return images.to_dict()

@productImages_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def  editProductImage(id):
    product_id = id
    data = request.get_json()
    # print("DATA ===================> ", data)
    user = current_user
    images = ProductImages.query.filter(ProductImages.product_id == product_id).all()
    image_obj = {}
    for image in images:
        # print("LOOOOOOK", image.image)
        image.image = data["img_url"]
        # print("LOOOOOOK", image.image)
        db.session.commit()
        image_obj = image.to_dict()

    return image_obj

@productImages_routes.route('/', methods=['POST'])
@login_required
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
