from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.sweet import Sweet
from app.schemas.sweet import SweetCreate, SweetUpdate

class CRUDSweet(CRUDBase[Sweet, SweetCreate, SweetUpdate]):
    """CRUD operations for Sweet model"""
    
    def search(
        self,
        db: Session,
        *,
        name: Optional[str] = None,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Sweet]:
        """
        Search sweets by name, category, or price range
        """
        query = db.query(Sweet)
        
        if name:
            query = query.filter(Sweet.name.ilike(f"%{name}%"))
        if category:
            query = query.filter(Sweet.category.ilike(f"%{category}%"))
        if min_price is not None:
            query = query.filter(Sweet.price >= min_price)
        if max_price is not None:
            query = query.filter(Sweet.price <= max_price)
        
        return query.offset(skip).limit(limit).all()

    def purchase(self, db: Session, *, sweet_id: str, quantity: int = 1) -> Optional[Sweet]:
        """
        Purchase a sweet (decrease quantity)
        """
        sweet = self.get(db, id=sweet_id)
        if not sweet or sweet.quantity < quantity:
            return None
        
        sweet.quantity -= quantity
        db.add(sweet)
        db.commit()
        db.refresh(sweet)
        return sweet

    def restock(self, db: Session, *, sweet_id: str, quantity: int) -> Optional[Sweet]:
        """
        Restock a sweet (increase quantity) - Admin only
        """
        sweet = self.get(db, id=sweet_id)
        if not sweet:
            return None
        
        sweet.quantity += quantity
        db.add(sweet)
        db.commit()
        db.refresh(sweet)
        return sweet

# Create instance
sweet = CRUDSweet(Sweet)