import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { seedWeeklyMenu } from '../utils/mealSeeder';

const CUISINES = ['Punjab 🌾', 'Gujarat 🫓', 'Bangladeshi (East Bengal) 🇧🇩', 'West Bengal 🐟', 'Odisha 🦐🌾', 'Maharashtra 🍛', 'South Indian 🥥', 'Rajasthani 🏜️', 'Italian 🍕', 'Chinese 🍜', 'Mexican 🌮', 'Thai 🌶️'];
const ALLERGENS = ['Nuts 🥜', 'Dairy 🥛', 'Gluten 🌾', 'Soy 🫘', 'Seafood 🍤'];

export default function SetupWizard() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    familyName: '',
    familySize: '3-4 Members 👨‍👩‍👧‍👦',
    regionalPalate: 'general',
    dietType: 'Vegetarian 🌱',
    occasions: [],
    cuisineInterests: [],
    culinaryArchetype: 'standard'
  });

  // Gujarati Veg Lock: force diet to Vegetarian if Gujarati palate selected
  useEffect(() => {
    if (formData.regionalPalate === 'gujarat') {
      setFormData(prev => ({ ...prev, dietType: 'Vegetarian 🌱' }));
    }
  }, [formData.regionalPalate]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      handleBypassLogin();
    }
  };

  const handleBypassLogin = () => {
    // No login/guest prompt on "Start". 
    // The researched one-time random guest token (attempt_temp_user_creation) is triggered 
    // exactly once later on the user's first "Ask Nani" gesture in chat (see AIChatPlanner + puterAI.triggerPuterGuestOnce).
    // This prevents "login on every step". All core features (RAG, archetypes, map, plans) work immediately with local intelligence.

    // Finalize and seed the weekly meal plan!
    const initialPlan = seedWeeklyMenu(formData);
    dispatch({ type: 'COMPLETE_SETUP', payload: formData });
    dispatch({ type: 'SEED_WEEKLY_PLAN', payload: initialPlan });
  };



  const handleBack = () => {
    if (step > 1 && step <= 5) setStep(step - 1);
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const list = prev[field];
      const newList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [field]: newList };
    });
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Progress Indicator */}
      <div style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map(s => (
          <div
            key={s}
            style={{
              ...styles.progressBar,
              background: s <= step ? 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)' : '#E5E4E7',
              transform: s === step ? 'scaleY(1.5)' : 'none'
            }}
          ></div>
        ))}
      </div>

      <div style={styles.card} className="glass-card animate-slide-up">
        {step === 1 && (
          <div>
            <span style={styles.stepNum}>1 / 5</span>
            <h2 className="text-serif" style={styles.title}>Your Family</h2>
            <p style={styles.desc}>Set your profile. Example: Sharma Family West Bengal Non-Veg.</p>
            <input
              type="text"
              placeholder="e.g. Sharma Family"
              style={styles.input}
              value={formData.familyName}
              onChange={e => setFormData({ ...formData, familyName: e.target.value })}
            />
            
            <p style={styles.label}>Size</p>
            <div style={styles.grid}>
              {['1-2', '3-4', '5+'].map(opt => (
                <button
                  key={opt}
                  style={{
                    ...styles.gridBtn,
                    borderColor: formData.familySize.includes(opt) ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                    background: formData.familySize.includes(opt) ? '#FEF3DC' : '#fff'
                  }}
                  onClick={() => setFormData({ ...formData, familySize: `${opt} Members` })}
                >
                  {opt} Members
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <span style={styles.stepNum}>2 / 5</span>
            <h2 className="text-serif" style={styles.title}>Regional Palate</h2>
            <p style={styles.desc}>Locks recipes and RAG to your tastes.</p>
            <div style={styles.verticalList}>
              {[
                { id: 'general', name: 'Others' },
                { id: 'punjab', name: 'Punjab' },
                { id: 'gujarat', name: 'Gujarat' },
                { id: 'maharashtra', name: 'Maharashtra' },
                { id: 'kolkata', name: 'West Bengal' },
                { id: 'odisha', name: 'Odisha' },
                { id: 'tamilnadu', name: 'Tamil Nadu' },
                { id: 'kerala', name: 'Kerala' }
              ].map(opt => (
                <button
                  key={opt.id}
                  style={{
                    ...styles.listBtn,
                    borderColor: formData.regionalPalate === opt.id ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                    background: formData.regionalPalate === opt.id ? '#FEF3DC' : '#fff'
                  }}
                  onClick={() => setFormData({ ...formData, regionalPalate: opt.id })}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <span style={styles.stepNum}>3 / 5</span>
            <h2 className="text-serif" style={styles.title}>Diet</h2>
            <p style={styles.desc}>RAG and suggestions respect this strictly.</p>
            <div style={styles.verticalList}>
              {['Vegetarian', 'Non-Vegetarian', 'Jain', 'Vegan'].map(opt => {
                const isLocked = formData.regionalPalate === 'gujarat' && opt !== 'Vegetarian' && opt !== 'Vegan';
                const full = opt === 'Vegetarian' ? 'Vegetarian' : opt === 'Non-Vegetarian' ? 'Non-Vegetarian' : opt === 'Jain' ? 'Jain (No Onion/Garlic)' : 'Vegan';
                return (
                  <button
                    key={opt}
                    disabled={isLocked}
                    style={{
                      ...styles.listBtn,
                      opacity: isLocked ? 0.45 : 1,
                      borderColor: formData.dietType === full ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                      background: formData.dietType === full ? '#FEF3DC' : '#fff',
                      cursor: isLocked ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => !isLocked && setFormData({ ...formData, dietType: full })}
                  >
                    {full} {isLocked && '(Locked)'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <span style={styles.stepNum}>4 / 5</span>
            <h2 className="text-serif" style={styles.title}>Culinary Archetype</h2>
            <p style={styles.desc}>Transforms every recipe via RAG + persona. Your superpower.</p>
            <div style={styles.verticalList}>
              {[
                { id: 'standard', name: 'Classic', desc: 'Timeless regional home cooking.' },
                { id: 'biohacker', name: 'Biohacker', desc: 'Low glycemic. Clean. Zen.' },
                { id: 'cognitive', name: 'Cognitive', desc: 'High protein. Brain fuel. Bold.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  style={{
                    ...styles.archetypeBtn,
                    borderColor: formData.culinaryArchetype === opt.id ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                    background: formData.culinaryArchetype === opt.id ? '#FEF3DC' : '#fff'
                  }}
                  onClick={() => setFormData({ ...formData, culinaryArchetype: opt.id })}
                >
                  <div style={styles.archetypeTitle}>{opt.name}</div>
                  <div style={styles.archetypeDesc}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
            <span style={styles.stepNum}>5 / 5</span>
            <h2 className="text-serif" style={styles.title}>Interests</h2>
            
            <p style={styles.label}>Cuisines</p>
            <div style={styles.tagCloud}>
              {CUISINES.map(c => {
                const isSelected = formData.cuisineInterests.includes(c);
                return (
                  <button
                    key={c}
                    style={{
                      ...styles.tagBtn,
                      background: isSelected ? '#E8692A' : '#fff',
                      color: isSelected ? '#fff' : '#1A0E08',
                      borderColor: isSelected ? '#E8692A' : 'rgba(74, 44, 26, 0.1)'
                    }}
                    onClick={() => toggleSelection('cuisineInterests', c)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <p style={{ ...styles.label, marginTop: '20px' }}>Allergens</p>
            <div style={styles.tagCloud}>
              {ALLERGENS.map(alg => {
                const isSelected = formData.occasions.includes(alg);
                return (
                  <button
                    key={alg}
                    style={{
                      ...styles.tagBtn,
                      background: isSelected ? '#C0392B' : '#fff',
                      color: isSelected ? '#fff' : '#1A0E08',
                      borderColor: isSelected ? '#C0392B' : 'rgba(74, 44, 26, 0.1)'
                    }}
                    onClick={() => toggleSelection('occasions', alg)}
                  >
                    {alg}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Buttons Row */}
        {step <= 5 && (
          <div style={styles.btnRow}>
            {step > 1 && (
              <button style={styles.secondaryBtn} onClick={handleBack}>
                Back
              </button>
            )}
            <button
              style={{
                ...styles.primaryBtn,
                width: step === 1 ? '100%' : 'auto'
              }}
              onClick={handleNext}
            >
              {step === 5 ? 'Start' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    background: '#FDF8F2'
  },
  progressContainer: {
    display: 'flex',
    gap: '6px',
    marginBottom: '24px'
  },
  progressBar: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    transition: 'all 0.3s ease'
  },
  card: {
    padding: '28px',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  stepNum: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#E8692A',
    letterSpacing: '1px'
  },
  title: {
    fontSize: '28px',
    margin: '6px 0 10px 0',
    color: '#1A0E08'
  },
  desc: {
    fontSize: '14px',
    lineHeight: '1.45',
    color: '#7A5540',
    marginBottom: '16px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#4A2C1A',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '16px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.2s ease',
    marginBottom: '16px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  gridBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  verticalList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '320px',
    overflowY: 'auto',
    paddingRight: '4px'
  },
  listBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  tagCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tagBtn: {
    padding: '10px 16px',
    borderRadius: '20px',
    border: '1px solid',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '12px'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px 24px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    flex: 1
  },
  secondaryBtn: {
    background: '#F9F1E5',
    color: '#4A2C1A',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    borderRadius: '14px',
    padding: '14px 20px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer'
  },
  googleSetupBtn: {
    background: '#FFFFFF',
    color: '#1A0E08',
    border: '1.5px solid rgba(74, 44, 26, 0.15)',
    borderRadius: '24px',
    padding: '14px 24px',
    fontSize: '15px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    transition: 'all 0.2s ease'
  },
  offlineSetupBtn: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#E8692A',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '18px',
    textDecoration: 'underline'
  },
  archetypeBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '8px'
  },
  archetypeTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#1A0E08'
  },
  archetypeDesc: {
    fontSize: '12.5px',
    color: '#7A5540',
    lineHeight: '1.4'
  }
};
