from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    username: str

class UserCreate(UserBase):
    """Schema for creating a user (includes password)"""
    password: str

class UserUpdate(BaseModel):
    """Schema for updating a user (all fields optional)"""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None

class UserInDB(UserBase):
    """Schema for user in database"""
    id: str
    is_admin: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class User(UserInDB):
    """Schema for returning user data (no sensitive info)"""
    pass