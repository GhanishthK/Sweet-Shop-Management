from pydantic import BaseModel, EmailStr
from typing import Optional

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Schema for data stored in JWT token"""
    email: Optional[str] = None

class LoginRequest(BaseModel):
    """Schema for login request"""
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    """Schema for registration request"""
    email: EmailStr
    username: str
    password: str