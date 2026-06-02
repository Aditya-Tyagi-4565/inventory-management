from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String

from app.database.base import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True)

    sku = Column(String, unique=True, nullable=False)

    name = Column(String, nullable=False)

    price = Column(Float, nullable=False)

    stock_quantity = Column(Integer, default=0)