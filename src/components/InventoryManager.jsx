import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function InventoryManager({ onTriggerChatPrompt }) {
  const { state, dispatch } = useApp();
  const { inventory } = state;
  const [activeCategory, setActiveCategory] = useState('Fridge 🧊');
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: 'Fridge 🧊', status: 'Fresh' });
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Fridge 🧊', 'Pantry 🌾', 'Spices 🫙'];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    dispatch({
      type: 'ADD_INVENTORY_ITEM',
      payload: newItem
    });
    setNewItem({ name: '', quantity: '', category: activeCategory, status: 'Fresh' });
    setShowAddForm(false);
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_INVENTORY_ITEM', payload: id });
  };

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', quantity: '', status: 'Fresh', category: '' });

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, quantity: item.quantity, status: item.status, category: item.category });
  };

  const handleSaveEdit = (id) => {
    if (!editForm.name.trim()) return;
    dispatch({
      type: 'UPDATE_INVENTORY_ITEM',
      payload: { id, ...editForm }
    });
    setEditingId(null);
  };

  const filteredItems = inventory.filter(item => item.category === activeCategory);

  // Check if there are any expiring soon items (Innovation 3)
  const expiringSoonItems = inventory.filter(item => item.status === 'Expiring Soon');

  return (
    <div style={styles.scrollContainer} className="no-scrollbar animate-fade-in">
      {/* Page Title */}
      <div style={styles.header}>
        <h1 className="text-serif" style={styles.title}>Pantry</h1>
        <p style={styles.subtitle}>Track what you have. RAG uses it instantly.</p>
      </div>

      {/* Expiry Intelligence Banner (Innovation 3) */}
      {expiringSoonItems.length > 0 && (
        <div style={styles.expiryBanner} className="glass-card animate-pop">
          <span style={styles.expiryTag}>👵 NANI'S ZERO-WASTE RADAR</span>
          <h4 style={styles.expiryTitle}>Expiring Soon Alert!</h4>
          <p style={styles.expiryDesc}>
            Beta, your **{expiringSoonItems.map(i => i.name).join(', ')}** is about to spoil. 
            Don't let food go to waste! Tap below to ask for a recipe using these ingredients.
          </p>
          <button
            style={styles.expiryActionBtn}
            onClick={() => onTriggerChatPrompt(`I have ${expiringSoonItems.map(i => i.name).join(' and ')} that are expiring soon. Suggest a quick comforting recipe using them.`)}
          >
            Ask Nani
          </button>
        </div>
      )}

      {/* Category Segmented Control */}
      <div style={styles.tabsContainer} className="glass-panel">
        {categories.map(cat => (
          <button
            key={cat}
            style={{
              ...styles.tabBtn,
              background: activeCategory === cat ? 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#4A2C1A',
              fontWeight: activeCategory === cat ? '700' : '500'
            }}
            onClick={() => {
              setActiveCategory(cat);
              setNewItem(prev => ({ ...prev, category: cat }));
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Item Trigger */}
      {!showAddForm ? (
        <button style={styles.addTriggerBtn} className="btn-secondary" onClick={() => setShowAddForm(true)}>
          Add
        </button>
      ) : (
        <form onSubmit={handleAddItem} style={styles.addForm} className="glass-card animate-pop">
          <h4 style={styles.formTitle}>Add Item</h4>
          
          <input
            type="text"
            placeholder="Ingredient Name (e.g. Tomato, Milk)"
            style={styles.formInput}
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            required
          />

          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Quantity (e.g. 500g, 2L, 4 pieces)"
              style={{ ...styles.formInput, flex: 1, marginBottom: 0 }}
              value={newItem.quantity}
              onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            
            <select
              style={styles.formSelect}
              value={newItem.status}
              onChange={e => setNewItem({ ...newItem, status: e.target.value })}
            >
              <option value="Fresh">Fresh 🌱</option>
              <option value="Expiring Soon">Expiring Soon ⚠️</option>
              <option value="Refill">Refill Needed 🔴</option>
            </select>
          </div>

          <div style={styles.formBtnRow}>
            <button type="button" style={styles.cancelBtn} onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Items List */}
      <div style={styles.itemsList}>
        {filteredItems.length === 0 ? (
          <div style={styles.emptyState}>
            <span>🫙</span>
            <p>Empty. Add items above. RAG will use them.</p>
          </div>
        ) : (
          filteredItems.map(item => {
            let badgeBg = '#E8F5F0';
            let badgeColor = '#0D6E4E';
            if (item.status === 'Expiring Soon') {
              badgeBg = '#FEF3DC';
              badgeColor = '#C4501A';
            } else if (item.status === 'Refill') {
              badgeBg = '#FADBD8';
              badgeColor = '#C0392B';
            }

            const isEditing = editingId === item.id;

            return (
              <div key={item.id} style={styles.itemCard} className="glass-card animate-pop">
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', textAlign: 'left' }}>
                    <input
                      type="text"
                      style={styles.editInput}
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Item name"
                    />
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        style={{ ...styles.editInput, flex: 1 }}
                        value={editForm.quantity}
                        onChange={e => setEditForm({ ...editForm, quantity: e.target.value })}
                        placeholder="Quantity"
                      />
                      <select
                        style={styles.editSelect}
                        value={editForm.status}
                        onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        <option value="Fresh">Fresh 🌱</option>
                        <option value="Expiring Soon">Expiring Soon ⚠️</option>
                        <option value="Refill">Refill 🔴</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                      <button 
                        type="button" 
                        style={{ background: 'none', border: 'none', color: '#7A5540', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        style={{ background: 'linear-gradient(135deg, #0D6E4E 0%, #1B7A4E 100%)', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={styles.itemLeft}>
                      <h4 style={styles.itemName}>{item.name}</h4>
                      <span style={styles.itemQty}>{item.quantity || 'In Stock'}</span>
                    </div>

                    <div style={styles.itemRight}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          background: badgeBg,
                          color: badgeColor
                        }}
                      >
                        {item.status === 'Refill' && <span className="refill-dot">● </span>}
                        {item.status.toUpperCase()}
                      </span>
                      
                      <button style={styles.deleteBtn} onClick={() => handleStartEdit(item)} title="Edit Item">
                        ✏️
                      </button>
                      
                      <button style={styles.deleteBtn} onClick={() => handleRemoveItem(item.id)} title="Delete Item">
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  scrollContainer: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1,
    background: '#FDF8F2'
  },
  header: {
    marginBottom: '20px'
  },
  title: {
    fontSize: '28px',
    color: '#1A0E08',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#7A5540'
  },
  expiryBanner: {
    padding: '20px',
    background: '#FEF3DC',
    borderLeft: '4px solid #C4501A',
    marginBottom: '24px',
    textAlign: 'left'
  },
  expiryTag: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#C4501A',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '6px'
  },
  expiryTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#1A0E08',
    marginBottom: '4px'
  },
  expiryDesc: {
    fontSize: '13px',
    lineHeight: '1.45',
    color: '#4A2C1A',
    marginBottom: '12px'
  },
  expiryActionBtn: {
    background: '#E8692A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(232, 105, 42, 0.2)'
  },
  tabsContainer: {
    display: 'flex',
    padding: '6px',
    borderRadius: '16px',
    marginBottom: '20px',
    background: 'rgba(74, 44, 26, 0.04)'
  },
  tabBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s ease'
  },
  addTriggerBtn: {
    width: '100%',
    marginBottom: '20px'
  },
  addForm: {
    padding: '20px',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
    textAlign: 'left'
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#1A0E08'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
    background: '#fff',
    outline: 'none',
    marginBottom: '4px'
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  formSelect: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
    background: '#fff',
    outline: 'none'
  },
  formBtnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '6px'
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  cancelBtn: {
    background: '#F9F1E5',
    color: '#4A2C1A',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  emptyState: {
    padding: '40px 20px',
    textAlign: 'center',
    color: '#7A5540',
    fontSize: '14px',
    opacity: 0.8
  },
  itemCard: {
    padding: '16px 20px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    textAlign: 'left'
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A0E08'
  },
  itemQty: {
    fontSize: '12px',
    color: '#7A5540',
    marginTop: '2px',
    display: 'block'
  },
  itemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  statusBadge: {
    fontSize: '11px',
    fontWeight: '800',
    padding: '4px 8px',
    borderRadius: '10px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px'
  },
  editInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#fff'
  },
  editSelect: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '13px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#fff'
  }
};

// Add critical dot animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .refill-dot {
      animation: criticalPulse 2s infinite;
    }
    @keyframes criticalPulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}
