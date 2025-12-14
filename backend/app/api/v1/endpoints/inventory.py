from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from app.database import get_db
from app.schemas.sweet import Sweet
from app.crud.sweet import sweet as sweet_crud
from app.api.deps import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()

class PurchaseRequest(BaseModel):
    """Request body for purchasing"""
    quantity: int = Field(default=1, ge=1, description="Quantity to purchase")

class RestockRequest(BaseModel):
    """Request body for restocking"""
    quantity: int = Field(ge=1, description="Quantity to add to stock")

@router.post("/{sweet_id}/purchase", response_model=Sweet)
def purchase_sweet(
    sweet_id: str,
    purchase_data: PurchaseRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Purchase a sweet (decreases quantity)
    """
    sweet = sweet_crud.purchase(db, sweet_id=sweet_id, quantity=purchase_data.quantity)
    if not sweet:
        raise HTTPException(
            status_code=400,
            detail="Not enough quantity in stock or sweet not found"
        )
    return sweet

@router.post("/{sweet_id}/restock", response_model=Sweet)
def restock_sweet(
    sweet_id: str,
    restock_data: RestockRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """
    Restock a sweet (increases quantity) - Admin only
    """
    sweet = sweet_crud.restock(db, sweet_id=sweet_id, quantity=restock_data.quantity)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet