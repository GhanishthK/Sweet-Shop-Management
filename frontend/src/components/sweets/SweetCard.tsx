import React from 'react';
import type { Sweet } from '../../types/index';
import { Button } from '../common/Button';
import { ShoppingCart, Edit, Trash2, Sparkles } from 'lucide-react';

interface SweetCardProps {
  sweet: Sweet;
  onAddToCart?: (id: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const SweetCard: React.FC<SweetCardProps> = ({
  sweet,
  onAddToCart,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      }}
    >
      {/* Image header with gradient */}
      <div
        style={{
          height: '160px',
          background: randomGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {sweet.image_url ? (
          <img
            src={sweet.image_url}
            alt={sweet.name}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <Sparkles size={60} color="white" style={{ opacity: 0.3, position: 'absolute' }} />
            <span
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {sweet.name.charAt(0).toUpperCase()}
            </span>
          </>
        )}
        
        {/* Stock badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: sweet.quantity > 0 ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '4px',
            }}
          >
            {sweet.name}
          </h3>
          <span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {sweet.category}
          </span>
        </div>

        {sweet.description && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {sweet.description}
          </p>
        )}

        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}
        >
          ₹{sweet.price.toFixed(2)}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            type="button"
            variant="primary"
            disabled={sweet.quantity === 0 || !onAddToCart}
            onClick={() => onAddToCart && onAddToCart(sweet.id)}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <ShoppingCart size={16} />
            {sweet.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
          </Button>

          {isAdmin && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onEdit && onEdit(sweet)}
                style={{ padding: '8px 12px' }}
              >
                <Edit size={16} />
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => onDelete && onDelete(sweet.id)}
                style={{ padding: '8px 12px' }}
              >
                <Trash2 size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
