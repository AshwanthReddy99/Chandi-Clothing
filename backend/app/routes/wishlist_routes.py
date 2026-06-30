from fastapi import APIRouter
from app.database.database import db

router = APIRouter()


# ==========================
# ADD TO WISHLIST
# ==========================

@router.post("/wishlist")
def add_to_wishlist(data: dict):

    email = data["email"]
    product = data["product"]

    existing = db.wishlist.find_one(
        {
            "email": email,
            "product._id": product["_id"]
        }
    )

    if existing:
        return {
            "message": "Already in Wishlist"
        }

    db.wishlist.insert_one(
        {
            "email": email,
            "product": product
        }
    )

    return {
        "message": "Added to Wishlist"
    }


# ==========================
# GET USER WISHLIST
# ==========================

@router.get("/wishlist/{email}")
def get_wishlist(email: str):

    wishlist = list(
        db.wishlist.find(
            {
                "email": email
            },
            {
                "_id": 0
            }
        )
    )

    return wishlist


# ==========================
# REMOVE FROM WISHLIST
# ==========================

@router.delete("/wishlist/{email}/{product_id}")
def remove_from_wishlist(email: str, product_id: str):

    db.wishlist.delete_one(
        {
            "email": email,
            "product._id": product_id
        }
    )

    return {
        "message": "Removed from Wishlist"
    }