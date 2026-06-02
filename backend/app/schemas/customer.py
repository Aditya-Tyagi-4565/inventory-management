from pydantic import BaseModel, EmailStr


class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None


class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True