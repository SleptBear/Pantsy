from app.models import db, Product, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text

def seed_productImages():
    products = Product.query.all()
    for product in products:
        if product.id == 1:
            image_url = 'https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw77bf8fbb/images/alternate/9101334_Ca/2020/9101334_Canyon_MTB_Pant_Alternate1.jpg?sw=750&sh=750&sm=fit&sfrm=jpg&q=80&bgcolor=F2F2F2'
        elif product.id == 2:
            image_url = 'https://www.oprah.com/g/image-resizer?width=670&link=https://static.oprah.com/images/beauty/fashion/fashion_pants_201_284x426.jpg'
        elif product.id == 3:
            image_url = 'https://m.media-amazon.com/images/I/61gSPPfg0QL._AC_UY1000_.jpg'
        elif product.id == 4:
            image_url = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fbdfeb72-5999-4e84-8fa7-a1e7af07b6ce/life-mens-double-panel-pants-HQZXNF.png'
        else:
            # If I want to add more, add more condition seeders here
            continue

    # demo1 = ProductImages(
    #     images = 'https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw77bf8fbb/images/alternate/9101334_Ca/2020/9101334_Canyon_MTB_Pant_Alternate1.jpg?sw=750&sh=750&sm=fit&sfrm=jpg&q=80&bgcolor=F2F2F2'
    # )
    # demo2 = ProductImages(
    #     images ='https://www.oprah.com/g/image-resizer?width=670&link=https://static.oprah.com/images/beauty/fashion/fashion_pants_201_284x426.jpg'
    # )
    # demo3 = ProductImages(
    #     images = 'https://m.media-amazon.com/images/I/61gSPPfg0QL._AC_UY1000_.jpg'
    # )
    # demo4 = ProductImages(
    #     images = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fbdfeb72-5999-4e84-8fa7-a1e7af07b6ce/life-mens-double-panel-pants-HQZXNF.png'
    # )

    # db.session.add(demo1)
    # db.session.add(demo2)
    # db.session.add(demo3)
    # db.session.add(demo4)
        product_image = ProductImages(
            image = image_url,
            product_id=product.id
        )
        db.session.add(product_image)
    db.session.commit()

def undo_productImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productImages"))

    db.session.commit()
