from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    total_inventory_value = sum(
        p.price * p.stock_quantity
        for p in products
    )

    low_stock = len([
        p for p in products
        if p.stock_quantity < 10
    ])

    return {
        "total_products":
            len(products),

        "total_customers":
            db.query(Customer).count(),

        "total_orders":
            db.query(Order).count(),

        "inventory_value":
            total_inventory_value,

        "low_stock":
            low_stock
    }