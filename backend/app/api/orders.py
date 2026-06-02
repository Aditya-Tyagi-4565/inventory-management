from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order import *

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):

    orders = db.query(Order).all()

    result = []

    for order in orders:

        customer = db.query(Customer).filter(
            Customer.id == order.customer_id
        ).first()

        result.append({
            "id": order.id,
            "customer_name": customer.name if customer else "Unknown",
            "total_amount": order.total_amount
        })

    return result


@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    total = 0

    db_order = Order(
        customer_id=order.customer_id,
        total_amount=0
    )

    db.add(db_order)

    db.commit()

    db.refresh(db_order)

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        product.stock_quantity -= item.quantity

        subtotal = (
            product.price *
            item.quantity
        )

        total += subtotal

        db_item = OrderItem(
            order_id=db_order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price
        )

        db.add(db_item)

    db_order.total_amount = total

    db.commit()

    return {
        "message": "Order created",
        "order_id": db_order.id,
        "total": total
    }