from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    demo1 = Product(
        name="Twill Chinos", description="Sleek looking Beige chinos in Small size", price="45.99", seller=1, category="Chinos", color='Beige', size='Small'
    )
    demo2 = Product(
        name="Twill Chinos", description="Sleek looking Navy chinos in Medium size", price="45.99", seller=1, category="Chinos", color='Navy', size='Medium'
    )
    demo3 = Product(
        name="Twill Chinos", description="Sleek looking Black chinos in Large size", price="45.99", seller=2, category="Chinos", color='Black', size='Large'
    )
    demo4 = Product(
        name="Mens Adicross Chino Pants", description="Unique Black chinos for outdoor wear, in Small size", price="15.99", seller=2, category="Chinos", color='Black', size='Small'
    )
    demo5 = Product(
        name="Mens Adicross Chino Pants", description="Unique Grey chinos for outdoor wear, in Medium size", price="15.99", seller=3, category="Chinos", color='Grey', size='Medium'
    )
    demo6 = Product(
        name="Mens Adicross Chino Pants", description="Unique Alumina chinos for casual wear, in Large size", price="15.99", seller=4, category="Chinos", color='Alumina', size='Large'
    )
    demo7 = Product(
        name="Relaxed Jeans", description="These Beige relaxed jeans will make your work uniform look great and your job less miserable!", price="19.99", seller=3, category="jeans", color='Beige', size='Small'
    )
    demo8 = Product(
        name="Relaxed Jeans", description="These Beige relaxed jeans will make your work uniform look great and your job less miserable!", price="19.99", seller=4, category="jeans", color='Beige', size='Medium'
    )
    demo9 = Product(
        name="Relaxed Jeans", description="These Beige relaxed jeans will make your work uniform look great and your job less miserable!", price="19.99", seller=1, category="jeans", color='Beige', size='Large'
    )
    demo10 = Product(
        name="Green Pants", description="Generic green pants, dirt cheap will shrink after 1 wash", price="6.99", seller=2, category="jogger", color='Green', size='Small'
    )
    demo11 = Product(
        name="Green Pants", description="Generic green pants, dirt cheap will shrink after 1 wash", price="6.99", seller=3, category="jogger", color='Black', size='Medium'
    )
    demo12 = Product(
        name="Green Pants", description="Generic green pants, dirt cheap will shrink after 1 wash", price="6.99", seller=4, category="jogger", color='Grey', size='Large'
    )
    demo13 = Product(
        name="Cargo Pants", description="you would think there would be more pockets in these", price="24.99", seller=2, category="cargo", color='green', size='small'
    )
    demo14 = Product(
        name="Beige Cargo pants Pants", description="you would think there would be more pockets in these", price="24.99", seller=2, category="cargo", color='beige', size='small'
    )
    demo15 = Product(
        name="High Waisted Dress Pants", description="High waisted pleated pants perfect for business and casual setting", price="85.99", seller=3, category="dress", color='Grey', size='Small'
    )
    demo16 = Product(
        name="High Waisted Dress Pants", description="High waisted pleated pants perfect for business and casual setting", price="85.99", seller=3, category="dress", color='Grey', size='Small'
    )
    demo17 = Product(
        name="High Waisted Dress Pants", description="High waisted pleated pants perfect for business and casual setting", price="85.99", seller=3, category="dress", color='Grey', size='Small'
    )
    demo18 = Product(
        name="Yellow Pants", description="This is just a gag item, please dont wear it in public setting", price="23.99", seller=1, category="jeans", color='yellow', size='Small'
    )
    demo19 = Product(
        name="Yellow Pants", description="This is just a gag item, please dont wear it in public setting", price="23.99", seller=1, category="jeans", color='yellow', size='Medium'
    )
    demo20 = Product(
        name="Yellow Pants", description="This is just a gag item, please dont wear it in public setting", price="23.99", seller=1, category="jeans", color='yellow', size='Large'
    )
    demo21 = Product(
        name="Just buy shorts instead", description="Buy this so you can finish converting these into shorts", price="99.99", seller=2, category="jeans", color='blue', size='Small'
    )
    demo22 = Product(
        name="Just buy shorts instead", description="Buy this so you can finish converting these into shorts", price="99.99", seller=2, category="jeans", color='blue', size='Medium'
    )
    demo23 = Product(
        name="Just buy shorts instead", description="Buy this so you can finish converting these into shorts", price="99.99", seller=2, category="jeans", color='blue', size='Large'
    )
    # demo20 = Product(
    #     name="", description="", price="", seller=4, category="", color='', size=''
    # )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()
