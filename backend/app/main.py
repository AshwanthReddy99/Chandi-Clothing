from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import product_routes
from app.routes import wishlist_routes
from app.auth.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_routes.router)
app.include_router(wishlist_routes.router)
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Chandi Clothing Backend Running Successfully 🚀"
    }