from fastapi import APIRouter, HTTPException

from app.database.database import db
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter()


@router.post("/register")
def register(user: dict):

    existing_user = db.users.find_one(
        {"email": user["email"]}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    user["password"] = hash_password(
        user["password"]
    )

    db.users.insert_one(user)

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(user: dict):

    db_user = db.users.find_one(
        {"email": user["email"]}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email",
        )

    if not verify_password(
        user["password"],
        db_user["password"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password",
        )

    token = create_access_token(
        {
            "email": db_user["email"],
            "name": db_user["name"],
        }
    )

    return {
        "message": "Login Successful",
        "token": token,
        "user": {
            "name": db_user["name"],
            "email": db_user["email"],
        },
    }