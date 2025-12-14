from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional

class SweetBase(BaseModel):
    """Base sweet schema"""
    name: str
    category: str
    price: float = Field(gt=0, description="Price must be greater than 0")
    quantity: int = Field(ge=0, description="Quantity must be 0 or greater")
    description: Optional[str] = None
    image_url: Optional[str] = None

class SweetCreate(SweetBase):
    """Schema for creating a sweet"""
    pass

class SweetUpdate(BaseModel):
    """Schema for updating a sweet (all fields optional)"""
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)
    description: Optional[str] = None
    image_url: Optional[str] = None

class Sweet(SweetBase):
    """Schema for returning sweet data"""
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)