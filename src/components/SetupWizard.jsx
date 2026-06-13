import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { seedWeeklyMenu } from '../utils/mealSeeder';

const CUISINES = ['Punjabi 🌾', 'Gujarati 🫓', 'Bangladeshi (East Bengal) 🇧🇩', 'Kolkata (West Bengal) 🐟', 'Oriya 🦐🌾', 'Maharashtrian 🍛', 'South Indian 🥥', 'Rajasthani 🏜️', 'Italian 🍕', 'Chinese 🍜', 'Mexican 🌮', 'Thai 🌶️'];
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
    cuisineInterests: []
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
      // Go to Google Login / Offline Activation Step 6
      setStep(6);
    }
  };

  const handleBypassLogin = () => {
    // Finalize and seed the weekly meal plan!
    const initialPlan = seedWeeklyMenu(formData);
    dispatch({ type: 'COMPLETE_SETUP', payload: formData });
    dispatch({ type: 'SEED_WEEKLY_PLAN', payload: initialPlan });
  };

  const handlePuterLogin = () => {
    if (window.puter && window.puter.auth) {
      window.puter.auth.signIn()
        .then(() => {
          handleBypassLogin(); // Proceed on success
        })
        .catch(err => {
          console.warn("Puter login failed, continuing to offline mode gracefully", err);
          handleBypassLogin(); // Graceful fallback
        });
    } else {
      handleBypassLogin();
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 6) setStep(step - 1);
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
        {[1, 2, 3, 4, 5, 6].map(s => (
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
            <span style={styles.stepNum}>STEP 1 OF 5</span>
            <h2 className="text-serif" style={styles.title}>Your Kitchen Identity</h2>
            <p style={styles.desc}>Let's personalize your HomeChef experience. What is your family's surname?</p>
            <input
              type="text"
              placeholder="e.g. Sharma, Patel, Banerjee"
              style={styles.input}
              value={formData.familyName}
              onChange={e => setFormData({ ...formData, familyName: e.target.value })}
            />
            
            <p style={styles.label}>Family Size</p>
            <div style={styles.grid}>
              {['1-2 Members 🍳', '3-4 Members 👨‍👩‍👧‍👦', '5+ Members 🍲'].map(opt => (
                <button
                  key={opt}
                  style={{
                    ...styles.gridBtn,
                    borderColor: formData.familySize === opt ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                    background: formData.familySize === opt ? '#FEF3DC' : '#fff'
                  }}
                  onClick={() => setFormData({ ...formData, familySize: opt })}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <span style={styles.stepNum}>STEP 2 OF 5</span>
            <h2 className="text-serif" style={styles.title}>Select Regional Palate</h2>
            <p style={styles.desc}>This aligns the automatic meal seeder with your regional tastes.</p>
            <div style={styles.verticalList}>
              {[
                { id: 'general', name: 'General Indian Classic 🍲' },
                { id: 'punjab', name: 'Punjabi Dhaba Style 🌾' },
                { id: 'gujarat', name: 'Gujarati Kathiyawadi 🫓' },
                { id: 'maharashtra', name: 'Maharashtrian Thali 🍛' },
                { id: 'bangladesh', name: 'Bangladeshi (East Bengal Cuisines) 🇧🇩🍗' },
                { id: 'kolkata', name: 'Kolkata (West Bengal Cuisines) 🐟🌾' },
                { id: 'odisha', name: 'Odisha Oriya Heirloom (Orissa) 🦐🌾' },
                { id: 'tamilnadu', name: 'Tamil Nadu Kalyana Feast 🥥' },
                { id: 'kerala', name: 'Kerala Nadan Malabar 🌴' }
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
            <span style={styles.stepNum}>STEP 3 OF 5</span>
            <h2 className="text-serif" style={styles.title}>Dietary Preference</h2>
            <p style={styles.desc}>Custom meal filter locks will be automatically established.</p>
            <div style={styles.verticalList}>
              {['Vegetarian 🌱', 'Non-Vegetarian 🍗', 'Jain (No Onion/Garlic) 🧅❌'].map(opt => {
                const isLocked = formData.regionalPalate === 'gujarat' && opt !== 'Vegetarian 🌱';
                return (
                  <button
                    key={opt}
                    disabled={isLocked}
                    style={{
                      ...styles.listBtn,
                      opacity: isLocked ? 0.45 : 1,
                      borderColor: formData.dietType === opt ? '#E8692A' : 'rgba(74, 44, 26, 0.1)',
                      background: formData.dietType === opt ? '#FEF3DC' : '#fff',
                      cursor: isLocked ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => !isLocked && setFormData({ ...formData, dietType: opt })}
                  >
                    {opt} {isLocked && '🔒 (Gujarati Diet Locked)'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <span style={styles.stepNum}>STEP 4 OF 5</span>
            <h2 className="text-serif" style={styles.title}>Allergens & Preferences</h2>
            <p style={styles.desc}>We will flag ingredients matching these allergens in the main dashboard.</p>
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

        {step === 5 && (
          <div>
            <span style={styles.stepNum}>STEP 5 OF 5</span>
            <h2 className="text-serif" style={styles.title}>Cuisine Interests</h2>
            <p style={styles.desc}>What kinds of food does your family love to cook at home?</p>
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
          </div>
        )}

        {/* STEP 6: Premium Onboarding Activation Google Gate */}
        {step === 6 && (
          <div className="animate-pop">
            <span style={styles.stepNum}>PREMIUM ACTIVATION</span>
            <h2 className="text-serif" style={styles.title}>Activate Premium AI</h2>
            <p style={styles.desc}>Sign in with Google to enable Nani's smart personalized AI recommendations, real-time recipe synthesis, and dynamic thali planning.</p>
            
            <button 
              onClick={handlePuterLogin} 
              className="google-login-btn"
              style={styles.googleSetupBtn}
            >
              🔐 Sign in with Google Account
            </button>

            <button 
              onClick={handleBypassLogin} 
              style={styles.offlineSetupBtn}
            >
              🚪 Continue with Offline Local Mode
            </button>
            
            <p style={{ fontSize: '11.5px', color: '#7A5540', marginTop: '24px', textAlign: 'center', lineHeight: '1.45' }}>
              Offline Mode uses our high-quality built-in heirloom database.<br/>
              Free Account · Safe & Private · Google Play Store Compliant
            </p>
          </div>
        )}

        {/* Buttons Row */}
        {step < 6 && (
          <div style={styles.btnRow}>
            {step > 1 && (
              <button style={styles.secondaryBtn} onClick={handleBack}>
                Pichhla Kadam
              </button>
            )}
            <button
              style={{
                ...styles.primaryBtn,
                width: step === 1 ? '100%' : 'auto'
              }}
              onClick={handleNext}
            >
              {step === 5 ? 'Shuru Karein! 🚀' : 'Agla Kadam →'}
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
  }
};
