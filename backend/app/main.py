from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.database import engine

from app.api.products import router as product_router
from app.api.customers import router as customer_router
from app.api.orders import router as order_router
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title="Inventory Management API"
)

origins = [
    "http://localhost:5173",
    "https://inventory-management-plum-five.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message": "Inventory API Running"
    }