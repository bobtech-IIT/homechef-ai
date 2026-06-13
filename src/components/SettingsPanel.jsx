import React, { useState } from 'react';
import { Users, RefreshCw, UserPlus, Trash2, ShieldCheck } from 'lucide-react';

export default function SettingsPanel({
  profile,
  members,
  restrictions,
  onAddMember,
  onDeleteMember,
  onToggleRestriction,
  onResetWizard,
  onHardReset,
  onUpdateArchetype
}) {

  const [memberName, setMemberName] = useState('');
  const [memberAge, setMemberAge] = useState('Adult');
  const [memberRestrictions, setMemberRestrictions] = useState('');
  const [memberFavDish, setMemberFavDish] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    onAddMember(memberName, memberAge, memberRestrictions, memberFavDish);
    // reset form
    setMemberName('');
    setMemberAge('Adult');
    setMemberRestrictions('');
    setMemberFavDish('');
  };

  return (
    <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      

      {/* 2. Family Members Profiles manager */}
      <div className="warm-card" style={{ padding: '18px 20px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Users size={18} style={{ color: 'var(--primary-saffron)' }} />
          Manage Family Profiles
        </h4>

        {/* Members list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
          {members.map(member => (
            <div 
              key={member.id}
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-warm)',
                border: '1px solid var(--border-sand)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-masala)' }}>
                  {member.name} ({member.ageGroup})
                </h5>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {member.restrictions ? `Avoids: ${member.restrictions}` : 'No food constraints'}
                  {member.favDish && ` • Fav: ${member.favDish}`}
                </p>
              </div>

              {/* Prevent deleting standard seeds for demo stability */}
              <button 
                onClick={() => onDeleteMember(member.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-cozy)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-tomato)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Member inline form */}
        <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-sand)', paddingTop: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <UserPlus size={14} style={{ color: 'var(--primary-saffron)' }} />
            Add Family Member
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <input 
                type="text" 
                placeholder="Name (e.g. Grandpa)"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div>
              <select 
                value={memberAge}
                onChange={(e) => setMemberAge(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
                <option value="Elderly">Elderly</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <input 
                type="text" 
                placeholder="Allergy (e.g. No Salt)"
                value={memberRestrictions}
                onChange={(e) => setMemberRestrictions(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Favorite dish"
                value={memberFavDish}
                onChange={(e) => setMemberFavDish(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-sand)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="btn-secondary"
            style={{
              padding: '8px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: 'var(--pill-soft)'
            }}
          >
            Add Profile
          </button>
        </form>
      </div>

      {/* 3. Cooking Style & Lifestyle Profile */}
      <div className="warm-card" style={{ padding: '18px 20px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <ShieldCheck size={18} style={{ color: 'var(--primary-saffron)' }} />
          Cooking Style & Lifestyle Profile
        </h4>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Select global rules active in your home kitchen. Homechef AI adapts suggestions automatically.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            'Vegetarian',
            'Non-Vegetarian',
            'Jain',
            'Vegan',
            'Dairy Free',
            'No Spicy',
            'Gluten Free',
            'Low Sodium',
            'Sugar Free',
            'Peanut Free'
          ].map(rule => {
            const isDietRule = rule === 'Vegetarian' || rule === 'Non-Vegetarian' || rule === 'Jain' || rule === 'Vegan';
            const isActive = isDietRule
              ? profile.dietaryPreference === rule
              : restrictions.includes(rule);
            const isDisabled = profile.regionalPalate === 'Gujarat' && rule === 'Non-Vegetarian';
            return (
              <label 
                key={rule}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: isDisabled ? 'var(--text-muted)' : 'var(--text-masala)',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                  padding: '6px 0'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={isActive}
                  disabled={isDisabled}
                  onChange={() => !isDisabled && onToggleRestriction(rule)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary-saffron)',
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                  }}
                />
                {rule} {isDisabled && '🔒'}
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Cooking Style & Lifestyle Mode */}
      <div className="warm-card" style={{ padding: '18px 20px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <ShieldCheck size={18} style={{ color: 'var(--primary-saffron)' }} />
          Cooking Style &amp; Lifestyle Mode
        </h4>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Select a lifestyle mode to dynamically tailor ingredients, spice levels, and presentation aesthetics across all recipes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { key: 'STANDARD', label: 'Standard Household Mode 🏠', desc: 'Standard regional recipe preparation.' },
            { key: 'EUROPEAN_VC_WIFE', label: 'Health-Conscious Bio-Hacker 🌿', desc: 'Low glycemic, adaptogenic, extra virgin oils, clean plating.' },
            { key: 'SHARK_TANK_JUDGE', label: 'High-Performance Cognitive Mode 🔥', desc: 'Ragi/quinoa base, high protein, Brahmi ghee, dramatic plating.' }
          ].map(arch => (
            <label 
              key={arch.key}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-masala)',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '10px',
                border: profile.archetype === arch.key ? '2px solid var(--primary-saffron)' : '1px solid var(--border-sand)',
                backgroundColor: profile.archetype === arch.key ? 'var(--secondary-light)' : 'transparent',
                transition: 'var(--transition-cozy)'
              }}
            >
              <input 
                type="radio" 
                name="archetype"
                checked={profile.archetype === arch.key}
                onChange={() => onUpdateArchetype(arch.key)}
                style={{ marginTop: '3px', accentColor: 'var(--primary-saffron)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span>{arch.label}</span>
                <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)' }}>{arch.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>


      {/* 5. Reset & Wizard Actions config options */}
      <div className="no-print" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '14px', 
        marginTop: '10px', 
        marginBottom: '20px' 
      }}>
        <button 
          onClick={onResetWizard}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-saffron)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
        >
          <RefreshCw size={12} />
          Re-run Setup Wizard preferences
        </button>

        <button 
          onClick={onHardReset}
          className="btn-primary"
          style={{
            backgroundColor: 'var(--accent-tomato)',
            boxShadow: '0 2px 8px rgba(192, 57, 43, 0.2)',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            width: 'auto'
          }}
        >
          <Trash2 size={16} />
          Hard Reset / Clear All Saved Data
        </button>
      </div>

    </div>
  );
}
