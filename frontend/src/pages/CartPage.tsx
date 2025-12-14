import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/common/Button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import { purchaseSweetApi } from '../api/sweets.api';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);
    try {
      for (const item of cartItems) {
        await purchaseSweetApi(item.id, item.cartQuantity);
      }
      
      clearCart();
      alert('Purchase successful! 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  if (cartItems.length === 0) {
    return (
      <DashboardLayout>
        <div style={{ 
          padding: '60px 24px', 
          background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
          minHeight: 'calc(100vh - 64px)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          <ShoppingBag size={100} color="#9ca3af" style={{ marginBottom: '24px' }} />
          <h2 style={{ 
            fontSize: '28px', 
            color: '#374151', 
            marginBottom: '12px',
            fontWeight: 'bold',
          }}>
            Your cart is empty
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '16px' }}>
            Add some delicious sweets to get started!
          </p>
          <Button 
            onClick={() => navigate('/dashboard')} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={18} />
            Start Shopping
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ 
        padding: '24px', 
        background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '32px', 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Shopping Cart
            </h1>
            <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '16px' }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/dashboard')} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 400px',
          gap: '24px' 
        }}>
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  opacity: removingId === item.id ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {/* Sweet Image */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Sweet Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '6px' }}>
                    {item.name}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    {item.category}
                  </span>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', margin: '8px 0' }}>
                    ₹{item.price.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                    Available: {item.quantity} units
                  </p>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                    disabled={item.cartQuantity <= 1}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      cursor: item.cartQuantity <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      opacity: item.cartQuantity <= 1 ? 0.5 : 1,
                    }}
                  >
                    <Minus size={18} color={item.cartQuantity <= 1 ? '#9ca3af' : '#667eea'} />
                  </button>

                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    minWidth: '50px', 
                    textAlign: 'center',
                    color: '#667eea',
                  }}>
                    {item.cartQuantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                    disabled={item.cartQuantity >= item.quantity}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      cursor: item.cartQuantity >= item.quantity ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      opacity: item.cartQuantity >= item.quantity ? 0.5 : 1,
                    }}
                  >
                    <Plus size={18} color={item.cartQuantity >= item.quantity ? '#9ca3af' : '#667eea'} />
                  </button>
                </div>

                {/* Item Total */}
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                    Subtotal
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                    ₹{(item.price * item.cartQuantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#fee2e2',
                    color: '#dc2626',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fecaca';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '24px',
              }}
            >
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#6b7280', fontSize: '16px' }}>
                    Items ({cartItems.length})
                  </span>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>
                    ₹{getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '16px' }}>Delivery</span>
                  <span style={{ fontWeight: '600', color: '#10b981', fontSize: '16px' }}>FREE</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</span>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading}
                style={{ width: '100%', padding: '16px', fontSize: '16px', marginBottom: '12px' }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Clear all items from cart?')) {
                    clearCart();
                  }
                }}
                style={{ width: '100%', padding: '14px' }}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
