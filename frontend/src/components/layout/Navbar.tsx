import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Button } from '../common/Button';
import { LogOut, User, Sparkles, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = getTotalItems();

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          cursor: 'pointer' 
        }} 
        onClick={() => navigate('/dashboard')}
      >
        <Sparkles size={28} color="white" />
        <h2 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)' 
        }}>
          Shudh Sweets
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Cart Icon with Badge */}
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            transition: 'all 0.2s',
          }}
          onClick={() => navigate('/cart')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ShoppingCart size={24} color="white" />
          {cartItemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                color: 'white',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                border: '2px solid white',
              }}
            >
              {cartItemCount}
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '30px',
          }}
        >
          <User size={20} color="white" />
          <span style={{ fontWeight: '600', color: 'white' }}>{user?.username}</span>
          {isAdmin && (
            <span
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#000',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              ⭐ ADMIN
            </span>
          )}
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </nav>
  );
};
