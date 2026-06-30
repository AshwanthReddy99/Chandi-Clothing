from fastapi import APIRouter
from app.database.database import db
from datetime import datetime
from bson import ObjectId

router = APIRouter()


# ==========================
# PRODUCTS
# ==========================

@router.get("/products")
def get_products():

    products = list(db.products.find())

    for product in products:
        product["_id"] = str(product["_id"])

    return products


@router.get("/product/{product_id}")
def get_product(product_id: str):

    product = db.products.find_one(
        {"_id": ObjectId(product_id)}
    )

    if product:
        product["_id"] = str(product["_id"])

    return product


@router.post("/add-product")
def add_product(product: dict):

    db.products.insert_one(product)

    return {
        "message": "Product Added Successfully"
    }


@router.put("/update-product/{product_id}")
def update_product(product_id: str, product: dict):

    db.products.update_one(
        {"_id": ObjectId(product_id)},
        {
            "$set": product
        }
    )

    return {
        "message": "Product Updated Successfully"
    }


@router.delete("/delete-product/{product_id}")
def delete_product(product_id: str):

    db.products.delete_one(
        {"_id": ObjectId(product_id)}
    )

    return {
        "message": "Product Deleted Successfully"
    }


# ==========================
# ORDERS
# ==========================

@router.post("/place-order")
def place_order(order: dict):

    order["created_at"] = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

    order["status"] = "Pending"

    db.orders.insert_one(order)

    return {
        "message": "Order Placed Successfully"
    }


@router.get("/my-orders/{email}")
def my_orders(email: str):

    orders = list(
        db.orders.find(
            {
                "customer.email": email
            },
            {
                "_id": 0
            }
        )
    )

    return orders


# ==========================
# ADMIN - GET ALL ORDERS
# ==========================

@router.get("/admin/orders")
def get_all_orders():

    orders = list(db.orders.find())

    for order in orders:
        order["_id"] = str(order["_id"])

    return orders


# ==========================
# ADMIN - UPDATE ORDER STATUS
# ==========================

@router.put("/admin/update-order-status/{order_id}")
def update_order_status(order_id: str, data: dict):

    db.orders.update_one(
        {
            "_id": ObjectId(order_id)
        },
        {
            "$set": {
                "status": data["status"]
            }
        }
    )

    return {
        "message": "Order Status Updated Successfully"
    }