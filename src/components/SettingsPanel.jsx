import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SettingsPanel({ isOpen, onClose }) {
  const { state, dispatch } = useApp();
  const { profile } = state;
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleDietChange = (e) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { dietType: e.target.value }
    });
  };

  const handleArchetypeChange = (e) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { culinaryArchetype: e.target.value }
    });
  };

  const handleHardReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
    } else {
      dispatch({ type: 'RESET_ALL' });
      localStorage.removeItem('homechef_v3_state');
      localStorage.removeItem('homechef_ai_cache_v3');
      setResetConfirm(false);
      onClose();
      // Reload to restart Setup Wizard
      window.location.reload();
    }
  };

  return (
    <div style={styles.overlay} className="animate-fade-in">
      <div style={styles.sidebar} className="animate-slide-up">
        {/* Header */}
        <div style={styles.header}>
          <h2 className="text-serif" style={styles.title}>Settings</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Profile Card Summary */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>🏡</div>
          <div style={styles.profileInfo}>
            <h3 style={styles.profileName}>{(profile?.familyName || 'Sharma')} Family</h3>
            <span style={styles.profileDetails}>
              {(profile?.regionalPalate || 'general').toUpperCase()} Cuisine • {profile?.dietType || 'Vegetarian 🌱'}
            </span>
          </div>
        </div>

        {/* Configurations List */}
        <div style={styles.sectionsList}>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Active Diet Preferences</h4>
            <div style={styles.preferenceRow}>
              <span style={{ alignSelf: 'center' }}>Diet:</span>
              <select
                value={profile.dietType}
                onChange={handleDietChange}
                style={styles.selectInput}
              >
                <option value="Vegetarian 🌱">Vegetarian 🌱</option>
                <option value="Non-Vegetarian 🍗">Non-Vegetarian 🍗</option>
                <option value="Jain (No Onion/Garlic) 🧅❌">Jain (No Onion/Garlic) 🧅❌</option>
                <option value="Vegan 🌱">Vegan 🌱</option>
              </select>
            </div>
            <div style={styles.preferenceRow}>
              <span style={{ alignSelf: 'center' }}>Culinary Archetype:</span>
              <select
                value={profile.culinaryArchetype || 'standard'}
                onChange={handleArchetypeChange}
                style={styles.selectInput}
              >
                <option value="standard">Standard Household 🏠</option>
                <option value="biohacker">European VC's Wife (Bio-Hacker) 🌿</option>
                <option value="cognitive">Shark Tank Judge (Cognitive Hustler) 🔥</option>
              </select>
            </div>
            <div style={styles.preferenceRow}>
              <span>Cuisine style:</span>
              <strong style={{ color: '#E8692A' }}>{profile.regionalPalate.toUpperCase()}</strong>
            </div>
            <div style={styles.preferenceRow}>
              <span>Size:</span>
              <strong>{profile.familySize}</strong>
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Privacy & Policies</h4>
            <p style={styles.policyText}>
              HomeChef AI v3 utilizes secure <strong style={{ color: '#E8692A' }}>Advanced Cloud AI</strong>. All cooking data stays in your browser cache.
            </p>
          </div>

          {/* Dangerous Zone (de-emphasized as requested in audit) */}
          <div style={styles.dangerZone}>
            <h4 style={styles.dangerTitle}>Danger Zone</h4>
            <p style={styles.dangerDesc}>Deletes all setup data, cached menus, and reset preferences.</p>
            <button
              style={{
                ...styles.resetBtn,
                background: resetConfirm ? '#C0392B' : '#F9F1E5',
                color: resetConfirm ? '#fff' : '#C0392B',
                borderColor: resetConfirm ? '#C0392B' : 'rgba(192, 57, 43, 0.2)'
              }}
              onClick={handleHardReset}
            >
              {resetConfirm ? '⚠️ Tap again to confirm deletion' : 'Clear Saved Data & Reset'}
            </button>
            {resetConfirm && (
              <button style={styles.cancelResetBtn} onClick={() => setResetConfirm(false)}>
                Cancel Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(26, 14, 8, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 100
  },
  sidebar: {
    width: '100%',
    maxHeight: '80%',
    background: '#FDF8F2',
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(74, 44, 26, 0.1)',
    paddingBottom: '12px'
  },
  title: {
    fontSize: '24px',
    color: '#1A0E08',
    margin: 0
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#7A5540',
    cursor: 'pointer'
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'linear-gradient(135deg, #FEF3DC 0%, #F9F1E5 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    textAlign: 'left'
  },
  avatar: {
    fontSize: '32px'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#1A0E08'
  },
  profileDetails: {
    fontSize: '12px',
    color: '#7A5540',
    fontWeight: '700',
    marginTop: '2px'
  },
  sectionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#E8692A',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '4px'
  },
  preferenceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#4A2C1A',
    borderBottom: '1px solid rgba(74, 44, 26, 0.05)',
    paddingBottom: '6px'
  },
  policyText: {
    fontSize: '13px',
    lineHeight: '1.45',
    color: '#7A5540'
  },
  dangerZone: {
    borderTop: '1px dashed rgba(192, 57, 43, 0.2)',
    paddingTop: '16px',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  dangerTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#C0392B',
    textTransform: 'uppercase'
  },
  dangerDesc: {
    fontSize: '12px',
    color: '#7A5540',
    lineHeight: '1.4'
  },
  resetBtn: {
    width: '100%',
    border: '1px solid',
    borderRadius: '12px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  cancelResetBtn: {
    background: 'none',
    border: 'none',
    color: '#7A5540',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '4px',
    alignSelf: 'center'
  },
  selectInput: {
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    background: '#fff',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '13px',
    fontWeight: '700',
    color: '#4A2C1A',
    outline: 'none',
    cursor: 'pointer'
  }
};
