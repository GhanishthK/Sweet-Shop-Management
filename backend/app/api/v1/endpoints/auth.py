from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import Token, LoginRequest, RegisterRequest
from app.schemas.user import User, UserCreate
from app.crud.user import user as user_crud
from app.core.security import create_access_token
from app.core.config import settings

router = APIRouter()

@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
def register(
    user_in: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Register a new user
    
    - **email**: User's email address (must be unique)
    - **username**: User's display name
    - **password**: User's password (will be hashed)
    
    Returns access token and user info
    """
    # Check if user already exists
    user = user_crud.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_create = UserCreate(
        email=user_in.email,
        username=user_in.username,
        password=user_in.password
    )
    user = user_crud.create(db, obj_in=user_create)
    
    # Generate access token
    access_token = create_access_token({"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": User.model_validate(user)
    }

@router.post("/login", response_model=dict)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login with email and password
    
    - **email**: User's email address
    - **password**: User's password
    
    Returns access token and user info
    """
    # Authenticate user
    user = user_crud.authenticate(
        db,
        email=login_data.email,
        password=login_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate access token
    access_token = create_access_token({"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": User.model_validate(user)
    }