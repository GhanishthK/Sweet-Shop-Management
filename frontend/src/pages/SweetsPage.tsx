import React, { useEffect, useState } from 'react';
import type { Sweet } from '../types/index';
import {
  getSweetsApi,
  deleteSweetApi,
  createSweetApi,
  updateSweetApi,
} from '../api/sweets.api';
import { SweetCard } from '../components/sweets/SweetCard';
import { AddSweetModal } from '../components/sweets/AddSweetModal';
import { EditSweetModal } from '../components/sweets/EditSweetModal';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/common/Button';
import { Plus } from 'lucide-react';

export const SweetsPage: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await getSweetsApi();
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (id: string) => {
    const sweet = sweets.find(s => s.id === id);
    if (sweet) {
      addToCart(sweet, 1);
      alert(`${sweet.name} added to cart!`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await deleteSweetApi(id);
      await loadSweets();
      alert('Sweet deleted successfully!');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Delete failed');
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
  };

  const handleUpdateSweet = async (id: string, sweetData: any) => {
    try {
      await updateSweetApi(id, sweetData);
      await loadSweets();
      alert('Sweet updated successfully!');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to update sweet');
      throw err;
    }
  };

  const handleAddSweet = async (sweetData: any) => {
    try {
      await createSweetApi(sweetData);
      await loadSweets();
      alert('Sweet added successfully!');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to add sweet');
      throw err;
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: '24px' }}>Loading sweets...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div style={{ padding: '24px', color: 'red' }}>{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', background: '#f9fafb', minHeight: 'calc(100vh - 64px)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Available Sweets</h1>

          {isAdmin && (
            <Button
              onClick={() => setShowAddModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={18} />
              Add Sweet
            </Button>
          )}
        </div>

        {sweets.length === 0 ? (
          <p style={{ color: '#6b7280' }}>
            No sweets found. {isAdmin && 'Click "Add Sweet" to create one!'}
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onAddToCart={handleAddToCart}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSweetModal onClose={() => setShowAddModal(false)} onSubmit={handleAddSweet} />
      )}

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSubmit={handleUpdateSweet}
        />
      )}
    </DashboardLayout>
  );
};
