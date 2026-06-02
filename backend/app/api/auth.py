from fastapi import APIRouter

from app.core.security import (
    verify_password,
    create_access_token,
    hash_password
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

ADMIN_USERNAME = "admin"

ADMIN_PASSWORD_HASH = hash_password(
    "admin123"
)


@router.post("/login")
def login(data: dict):

    username = data.get(
        "username"
    )

    password = data.get(
        "password"
    )

    if username != ADMIN_USERNAME:
        return {
            "error": "Invalid credentials"
        }

    if not verify_password(
        password,
        ADMIN_PASSWORD_HASH
    ):
        return {
            "error": "Invalid credentials"
        }

    token = create_access_token(
        {
            "sub": username
        }
    )

    return {
        "access_token": token
    }