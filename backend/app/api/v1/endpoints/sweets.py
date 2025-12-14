from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.sweet import Sweet, SweetCreate, SweetUpdate
from app.crud.sweet import sweet as sweet_crud
from app.api.deps import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Sweet, status_code=status.HTTP_201_CREATED)
def create_sweet(
    sweet_in: SweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new sweet (authenticated users only)
    """
    sweet = sweet_crud.create(db, obj_in=sweet_in)
    return sweet

@router.get("/", response_model=List[Sweet])
def get_sweets(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get list of all sweets (authenticated users only)
    """
    sweets = sweet_crud.get_multi(db, skip=skip, limit=limit)
    return sweets

@router.get("/search", response_model=List[Sweet])
def search_sweets(
    name: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Search sweets by name, category, or price range
    """
    sweets = sweet_crud.search(
        db,
        name=name,
        category=category,
        min_price=min_price,
        max_price=max_price,
        skip=skip,
        limit=limit
    )
    return sweets

@router.get("/{sweet_id}", response_model=Sweet)
def get_sweet(
    sweet_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific sweet by ID
    """
    sweet = sweet_crud.get(db, id=sweet_id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet

@router.put("/{sweet_id}", response_model=Sweet)
def update_sweet(
    sweet_id: str,
    sweet_in: SweetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a sweet's details
    """
    sweet = sweet_crud.get(db, id=sweet_id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    
    sweet = sweet_crud.update(db, db_obj=sweet, obj_in=sweet_in)
    return sweet

@router.delete("/{sweet_id}", response_model=Sweet)
def delete_sweet(
    sweet_id: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """
    Delete a sweet (Admin only)
    """
    sweet = sweet_crud.get(db, id=sweet_id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    
    sweet = sweet_crud.delete(db, id=sweet_id)
    return sweet