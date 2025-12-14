import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#6b21a8',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
          🍬 Sweet Shop
        </h2>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} />
          <span>{user?.username}</span>
          {isAdmin && (
            <span style={{
              background: '#fbbf24',
              color: '#000',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ADMIN
            </span>
          )}
        </div>
        
        <Button
          variant="secondary"
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </nav>
  );
};
