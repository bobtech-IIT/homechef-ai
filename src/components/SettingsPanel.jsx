import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { clearAICache, getAIStatus, getBYOK, saveBYOK, clearBYOK } from '../utils/puterAI';

const PALATE_NAMES = {
  general: 'Others',
  punjab: 'Punjab',
  gujarat: 'Gujarat',
  maharashtra: 'Maharashtra',
  kolkata: 'West Bengal',
  odisha: 'Odisha',
  tamilnadu: 'Tamil Nadu',
  kerala: 'Kerala'
};

export default function SettingsPanel({ isOpen, onClose }) {
  const { state, dispatch } = useApp();
  const { profile } = state;
  const [resetConfirm, setResetConfirm] = useState(false);

  // BYOK state
  const existingBYOK = getBYOK();
  const [byokProvider, setByokProvider] = useState(existingBYOK?.provider || 'cerebras');
  const [byokKey, setByokKey] = useState(existingBYOK?.key || '');
  const [byokSaved, setByokSaved] = useState(!!existingBYOK);
  const [byokVisible, setByokVisible] = useState(false);

  const PROVIDER_META = {
    cerebras: {
      label: 'Cerebras (Fastest)',
      placeholder: 'csk-...',
      hint: 'Auto-chain: gpt-oss-120b → gpt-oss-20b → qwen-3-32b → llama-4-scout',
      url: 'https://api.cerebras.ai',
    },
    groq: {
      label: 'Groq (Ultra-Fast)',
      placeholder: 'gsk_...',
      hint: 'Auto-chain: llama-3.3-70b → llama-4-scout → llama3-70b → llama-3.1-8b',
      url: 'https://console.groq.com',
    },
    openai: {
      label: 'OpenAI',
      placeholder: 'sk-...',
      hint: 'Uses: gpt-4o-mini',
      url: 'https://platform.openai.com/api-keys',
    },
    gemini: {
      label: 'Google Gemini (Free)',
      placeholder: 'AIza...',
      hint: 'Auto-detects free model: gemini-3.5-flash → 3.1-flash-lite → 3.1-pro',
      url: 'https://aistudio.google.com/apikey',
    },
  };

  const handleSaveBYOK = () => {
    if (!byokKey.trim() || byokKey.trim().length < 8) {
      alert('Please enter a valid API key.');
      return;
    }
    saveBYOK(byokProvider, byokKey.trim());
    setByokSaved(true);
    alert(`✅ ${PROVIDER_META[byokProvider].label} key saved!\nAI will now use this as primary.`);
  };

  const handleClearBYOK = () => {
    clearBYOK();
    setByokKey('');
    setByokSaved(false);
    alert('BYOK key removed. Falling back to Puter guest AI.');
  };

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
      localStorage.removeItem('homechef_state_v4');
      localStorage.removeItem('homechef_ai_cache_v2'); // correct key (v2 used by puterAI)
      clearAICache(); // also invoke exported for status side-effects + logs
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
          <button style={styles.closeBtn} onClick={onClose}>Close</button>
        </div>

        {/* Profile Card Summary */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>🏡</div>
          <div style={styles.profileInfo}>
            <h3 style={styles.profileName}>{profile?.familyName ? (profile.familyName.toLowerCase().includes('family') ? profile.familyName : `${profile.familyName} Family`) : 'My Family'}</h3>
            <span style={styles.profileDetails}>
              {(profile?.regionalPalate || 'general').toUpperCase()} • {profile?.dietType || 'Vegetarian'}
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
                <option value="standard">Classic</option>
                <option value="biohacker">Biohacker</option>
                <option value="cognitive">Cognitive</option>
              </select>
            </div>
            <div style={styles.preferenceRow}>
              <span>Cuisine style:</span>
              <strong style={{ color: '#E8692A' }}>
                {(PALATE_NAMES[profile.regionalPalate] || profile.regionalPalate).toUpperCase()}
              </strong>
            </div>
            <div style={styles.preferenceRow}>
              <span>Size:</span>
              <strong>{profile.familySize}</strong>
            </div>
          </div>

          {/* Slice 3: Small visible AI status + Force Reconnect control (available from Settings too) */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>AI Health & Reconnect</h4>
            <div style={{ fontSize: '12px', color: '#4A2C1A', marginBottom: '6px' }}>
              {(() => {
                try {
                  const s = getAIStatus();
                  const rawArch = profile.culinaryArchetype || 'standard';
                  const archLabel = rawArch === 'biohacker' ? 'Biohacker' : rawArch === 'cognitive' ? 'Cognitive' : 'Classic';
                  return `Zero-login RAG • ${archLabel}`;
                } catch { return 'Local RAG ready (no login)'; }
              })()}
            </div>
            <button
              onClick={() => {
                const ok = clearAICache();
                alert(ok ? 'Cache cleared. Next chat uses fresh RAG.' : 'Attempted');
              }}
              style={{
                ...styles.selectInput,
                width: '100%',
                padding: '8px 10px',
                background: '#FEF3DC',
                border: '1px solid #E8692A',
                color: '#C4501A',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              Clear Cache
            </button>
            <p style={{ fontSize: '10px', color: '#7A5540', marginTop: '4px' }}>
              Archetype transforms every RAG retrieval.
            </p>
          </div>

          {/* BYOK — Bring Your Own Key */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>🔑 AI Key (BYOK)</h4>
            <p style={{ fontSize: '12px', color: '#7A5540', marginBottom: '6px', lineHeight: '1.45' }}>
              Set your own AI key. Used as primary — Puter guest is the free fallback.
            </p>

            {/* Provider selector */}
            <div style={styles.preferenceRow}>
              <span style={{ alignSelf: 'center', fontWeight: '700' }}>Provider:</span>
              <select
                value={byokProvider}
                onChange={e => { setByokProvider(e.target.value); setByokSaved(false); setByokKey(''); }}
                style={styles.selectInput}
              >
                <option value="cerebras">🧠 Cerebras (Fastest)</option>
                <option value="groq">⚡ Groq (Ultra-Fast)</option>
                <option value="openai">🟢 OpenAI</option>
                <option value="gemini">🔵 Google Gemini (Free)</option>
              </select>
            </div>

            {/* Dynamic model hint */}
            <div style={{ background: '#FEF3DC', borderRadius: '8px', padding: '8px 10px', fontSize: '11px', color: '#7A5540', lineHeight: '1.5', marginBottom: '4px' }}>
              <strong style={{ color: '#C4501A' }}>Auto-fallback chain:</strong><br />
              {PROVIDER_META[byokProvider].hint}
            </div>

            {/* Key input */}
            <div style={{ position: 'relative', marginTop: '2px' }}>
              <input
                type={byokVisible ? 'text' : 'password'}
                placeholder={PROVIDER_META[byokProvider].placeholder}
                value={byokKey}
                onChange={e => { setByokKey(e.target.value); setByokSaved(false); }}
                style={{
                  width: '100%',
                  padding: '9px 38px 9px 10px',
                  borderRadius: '8px',
                  border: byokSaved ? '1.5px solid #0D6E4E' : '1px solid rgba(74,44,26,0.2)',
                  fontFamily: 'Outfit, monospace',
                  fontSize: '12px',
                  background: byokSaved ? '#E8F5F0' : '#fff',
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#1A0E08',
                }}
              />
              <button
                onClick={() => setByokVisible(v => !v)}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
                title={byokVisible ? 'Hide key' : 'Show key'}
              >
                {byokVisible ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Get key link */}
            <p style={{ fontSize: '10px', color: '#7A5540', marginTop: '3px' }}>
              Get free key: <a href={PROVIDER_META[byokProvider].url} target="_blank" rel="noreferrer" style={{ color: '#E8692A', fontWeight: '700' }}>{PROVIDER_META[byokProvider].url.replace('https://', '')}</a>
            </p>

            {/* Save / Remove buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                onClick={handleSaveBYOK}
                style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: byokSaved ? '#0D6E4E' : 'linear-gradient(135deg, #E8692A, #C4501A)', color: '#fff', fontWeight: '800', fontSize: '13px', cursor: 'pointer', letterSpacing: '0.3px' }}
              >
                {byokSaved ? `✅ ${PROVIDER_META[byokProvider].label} Active` : `Save ${PROVIDER_META[byokProvider].label} Key`}
              </button>
              {byokSaved && (
                <button
                  onClick={handleClearBYOK}
                  style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(192,57,43,0.3)', background: '#fff', color: '#C0392B', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              )}
            </div>

            <p style={{ fontSize: '10px', color: '#7A5540', marginTop: '4px' }}>
              🔒 Stored only in your browser. Never sent to any server.
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Privacy</h4>
            <p style={styles.policyText}>
              All data lives in your browser. Offline RAG runs locally.
            </p>
          </div>

          {/* Danger Zone */}
          <div style={styles.dangerZone}>
            <h4 style={styles.dangerTitle}>Reset</h4>
            <p style={styles.dangerDesc}>Clear all data and restart setup.</p>
            <button
              style={{
                ...styles.resetBtn,
                background: resetConfirm ? '#C0392B' : '#F9F1E5',
                color: resetConfirm ? '#fff' : '#C0392B',
                borderColor: resetConfirm ? '#C0392B' : 'rgba(192, 57, 43, 0.2)'
              }}
              onClick={handleHardReset}
            >
              {resetConfirm ? 'Confirm Reset' : 'Reset App'}
            </button>
            {resetConfirm && (
              <button style={styles.cancelResetBtn} onClick={() => setResetConfirm(false)}>
                Cancel
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
