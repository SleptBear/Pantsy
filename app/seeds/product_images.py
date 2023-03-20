from app.models import db, Product, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text

def seed_productImages():
    products = Product.query.all()
    for product in products:
        if product.id == 1:
            image_url = 'https://www.mrporter.com/variants/images/42247633208788868/in/w560_q60.jpg'
        elif product.id == 2:
            image_url = 'https://www.mrporter.com/variants/images/42247633208788793/in/w560_q60.jpg'
        elif product.id == 3:
            image_url = 'https://www.mrporter.com/variants/images/42247633208789050/in/w560_q60.jpg'
        elif product.id == 4:
            image_url = 'https://m.media-amazon.com/images/I/61tAwCibGmL._AC_UL1500_.jpg'
        elif product.id == 5:
            image_url = 'https://m.media-amazon.com/images/I/71dkrFUXxpL._AC_UL1500_.jpg'
        elif product.id == 6:
            image_url = 'https://m.media-amazon.com/images/I/71LxEaS4EUL._AC_UL1500_.jpg'
        elif product.id == 7:
            image_url = 'https://cdn-images.farfetch-contents.com/18/53/46/68/18534668_40002032_1000.jpg'
        elif product.id == 8:
            image_url = 'https://cdn-images.farfetch-contents.com/18/53/46/68/18534668_40002037_1000.jpg'
        elif product.id == 9:
            image_url = 'https://cdn-images.farfetch-contents.com/18/53/46/68/18534668_40002048_1000.jpg'
        elif product.id == 10:
            image_url = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fbdfeb72-5999-4e84-8fa7-a1e7af07b6ce/life-mens-double-panel-pants-HQZXNF.png'
        elif product.id == 11:
            image_url = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fbdfeb72-5999-4e84-8fa7-a1e7af07b6ce/life-mens-double-panel-pants-HQZXNF.png'
        elif product.id == 12:
            image_url = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fbdfeb72-5999-4e84-8fa7-a1e7af07b6ce/life-mens-double-panel-pants-HQZXNF.png'
        elif product.id == 13:
            image_url = 'https://img.ltwebstatic.com/images3_pi/2022/05/31/16539600226836728528dad87c6e2a426e5011fa85_thumbnail_600x.webp'
        elif product.id == 14:
            image_url = 'https://img.ltwebstatic.com/images3_pi/2022/06/20/165570466646b7d8f6c878383dd33a91402aba8abe_thumbnail_600x.webp'
        elif product.id == 15:
            image_url = 'https://img.ltwebstatic.com/images3_pi/2021/11/11/1636607288630425494be09e3a9b3c3ff34040a01d_thumbnail_600x.webp'
        elif product.id == 16:
            image_url = 'https://img.ltwebstatic.com/images3_pi/2021/11/11/1636607288630425494be09e3a9b3c3ff34040a01d_thumbnail_600x.webp'
        elif product.id == 17:
            image_url = 'https://assets.ajio.com/medias/sys_master/root/h22/hb3/11845767397406/-473Wx593H-440872996-yellow-MODEL.jpg'
        elif product.id == 18:
            image_url = 'https://assets.ajio.com/medias/sys_master/root/h22/hb3/11845767397406/-473Wx593H-440872996-yellow-MODEL.jpg'
        elif product.id == 19:
            image_url = 'https://assets.ajio.com/medias/sys_master/root/h22/hb3/11845767397406/-473Wx593H-440872996-yellow-MODEL.jpg'
        elif product.id == 20:
            image_url = 'https://metro.co.uk/wp-content/uploads/2015/01/image1xxl.jpg?quality=90&strip=all'
        elif product.id == 21:
            image_url = 'https://metro.co.uk/wp-content/uploads/2015/01/image1xxl.jpg?quality=90&strip=all'
        elif product.id == 22:
            image_url = 'https://metro.co.uk/wp-content/uploads/2015/01/image1xxl.jpg?quality=90&strip=all'
        # elif product.id == 00:
        #     image_url = ''
        else:
            # If I want to add more, add more condition seeders here
            continue
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
