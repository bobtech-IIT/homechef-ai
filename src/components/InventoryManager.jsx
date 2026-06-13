import React, { useState } from 'react';
import { Plus, Trash2, Search, Thermometer, ShieldAlert, Check, ShoppingBag, AlertOctagon, Pencil } from 'lucide-react';

export default function InventoryManager({ items, onAddItem, onRemoveItem, onUpdateItem }) {
  const [activeSubTab, setActiveSubTab] = useState('Fridge');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal/Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [newItemExpiry, setNewItemExpiry] = useState('Fresh');
  const [newItemCritical, setNewItemCritical] = useState(false);

  // Filter items based on subtab + search query
  const filteredItems = items.filter(item => {
    const matchTab = item.category === activeSubTab;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    if (editingItem) {
      onUpdateItem(
        editingItem.id,
        newItemName,
        activeSubTab,
        newItemQty || '1 unit',
        newItemExpiry,
        newItemCritical
      );
      setEditingItem(null);
    } else {
      onAddItem(
        newItemName,
        activeSubTab,
        newItemQty || '1 unit',
        newItemExpiry,
        newItemCritical
      );
    }
    
    // reset form
    setNewItemName('');
    setNewItemQty('');
    setNewItemExpiry('Fresh');
    setNewItemCritical(false);
    setShowAddForm(false);
  };

  return (
    <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Search & Filter Header Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Real-time search bar */}
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <input 
            type="text"
            placeholder="Samaan search karein... (e.g. Paneer)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '12px',
              border: '1px solid var(--border-sand)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-masala)',
              backgroundColor: 'var(--bg-card)',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <Search size={18} style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-light)'
          }} />
        </div>

        {/* Sub-tabs Row (Fridge, Pantry, Spices) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          backgroundColor: 'var(--pill-soft)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-sand)'
        }}>
          {['Fridge', 'Pantry', 'Spices'].map(tab => {
            const isSel = activeSubTab === tab;
            return (
              <button 
                key={tab}
                type="button"
                onClick={() => setActiveSubTab(tab)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isSel ? '#FFFFFF' : 'transparent',
                  color: isSel ? 'var(--primary-saffron)' : 'var(--text-muted)',
                  fontWeight: isSel ? 800 : 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'var(--transition-cozy)',
                  fontFamily: 'inherit',
                  boxShadow: isSel ? '0 2px 6px rgba(44, 26, 17, 0.05)' : 'none'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Critical Alert Bar for low stock items */}
      {items.some(i => i.category === activeSubTab && i.critical) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--accent-tomato-light)',
          border: '1px solid rgba(192, 57, 43, 0.2)',
          borderRadius: '12px',
          padding: '10px 14px',
          color: 'var(--accent-tomato)',
          fontSize: '12px',
          fontWeight: 700
        }}>
          <AlertOctagon size={18} />
          Some critical items are low or expiring soon! Stock them immediately.
        </div>
      )}

      {/* Main Inventory Shelf items list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => {
            const isExpiring = item.expiryText === 'Expiring soon';
            const isRefill = item.expiryText === 'Refill' || item.critical;
            
            return (
              <div 
                key={item.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  border: isRefill 
                    ? '1.5px solid var(--accent-tomato)' 
                    : (isExpiring ? '1.5px solid var(--secondary-turmeric)' : '1px solid var(--border-sand)'),
                  boxShadow: 'var(--shadow-warm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition-cozy)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h5 style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: 'var(--text-masala)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {item.name}
                    
                    {/* Critical low dot indicator */}
                    {item.critical && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-tomato)',
                        display: 'inline-block'
                      }}></span>
                    )}
                  </h5>
                  
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Quantity: {item.quantity}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Freshness / Stock Badge status indicator */}
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: isRefill 
                      ? 'var(--accent-tomato-light)' 
                      : (isExpiring ? 'var(--secondary-light)' : 'var(--accent-coriander-light)'),
                    color: isRefill 
                      ? 'var(--accent-tomato)' 
                      : (isExpiring ? '#D35400' : 'var(--accent-coriander)'),
                    border: '1px solid currentColor'
                  }}>
                    {isRefill ? 'Refill' : item.expiryText}
                  </span>

                  {/* Edit button trigger */}
                  <button 
                    onClick={() => {
                      setEditingItem(item);
                      setNewItemName(item.name);
                      setNewItemQty(item.quantity);
                      setNewItemExpiry(item.expiryText);
                      setNewItemCritical(item.critical);
                      setShowAddForm(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-light)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-cozy)',
                      marginRight: '6px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-saffron)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                    title="Edit Item"
                  >
                    <Pencil size={15} />
                  </button>

                  {/* Remove button trigger */}
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-light)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-cozy)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-tomato)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px dashed var(--border-sand)',
            color: 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '13px'
          }}>
            No items found in {activeSubTab}. Add some below!
          </div>
        )}
      </div>

      {/* Floating Add Item Form drawer trigger */}
      {!showAddForm ? (
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
          style={{
            marginTop: '10px',
            padding: '12px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Plus size={18} />
          Add Item in {activeSubTab}
        </button>
      ) : (
        <form 
          onSubmit={handleAddItem}
          className="warm-card fade-in-slide"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: '20px',
            border: '1.5px solid var(--primary-saffron)'
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)' }}>
            {editingItem ? "Edit Ingredient" : `New ${activeSubTab} Ingredient`}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {/* Name Input */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                INGREDIENT NAME
              </label>
              <input 
                type="text" 
                placeholder="e.g. Fresh Paneer"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  outline: 'none',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Qty Input */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                QUANTITY / WEIGHT
              </label>
              <input 
                type="text" 
                placeholder="e.g. 200g, 1 Packet, 2 Litres"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  outline: 'none',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Expiry Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  EXPIRY STATUS
                </label>
                <select 
                  value={newItemExpiry}
                  onChange={(e) => setNewItemExpiry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-sand)',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    outline: 'none',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Fresh">Fresh</option>
                  <option value="Expiring soon">Expiring soon</option>
                  <option value="Refill">Refill</option>
                </select>
              </div>

              {/* Critical Low Stock Option */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--text-masala)', cursor: 'pointer', marginTop: '16px' }}>
                  <input 
                    type="checkbox" 
                    checked={newItemCritical}
                    onChange={(e) => setNewItemCritical(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--primary-saffron)'
                    }}
                  />
                  Mark Critical / Low
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button 
              type="button"
              onClick={() => {
                setEditingItem(null);
                setNewItemName('');
                setNewItemQty('');
                setNewItemExpiry('Fresh');
                setNewItemCritical(false);
                setShowAddForm(false);
              }}
              className="btn-secondary"
              style={{ flex: 1, padding: '10px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn-primary"
              style={{ flex: 2, padding: '10px', fontSize: '13px' }}
            >
              {editingItem ? "Save Changes" : "Add to shelf"}
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
