import React from 'react';
import type { Sweet } from '../../types/index';
import { Button } from '../common/Button';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase?: (id: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const SweetCard: React.FC<SweetCardProps> = ({
  sweet,
  onPurchase,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
      }}
    >
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price.toFixed(2)}</p>
      <p>
        {sweet.quantity > 0 ? `In stock: ${sweet.quantity}` : 'Out of stock'}
      </p>
      {sweet.description && <p>{sweet.description}</p>}

      <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
        <Button
          type="button"
          disabled={sweet.quantity === 0 || !onPurchase}
          onClick={() => onPurchase && onPurchase(sweet.id)}
        >
          <ShoppingCart size={16} /> Buy
        </Button>

        {isAdmin && (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onEdit && onEdit(sweet)}
            >
              <Edit size={16} /> Edit
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => onDelete && onDelete(sweet.id)}
            >
              <Trash2 size={16} /> Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
