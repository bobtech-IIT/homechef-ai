import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Users, Group, HelpCircle, Check } from 'lucide-react';

export default function SetupWizard({ profile, onComplete, onBack }) {
  const [step, setStep] = useState(1);
  
  // Setup forms matching db entities
  const [familySize, setFamilySize] = useState(profile.familySize || '3-4');
  const [palate, setPalate] = useState(profile.regionalPalate || 'Punjab');
  const [diet, setDiet] = useState(profile.dietaryPreference || 'Non-Vegetarian');
  const [occasion, setOccasion] = useState(profile.specialOccasion || 'No Preference');
  const [familyName, setFamilyName] = useState(profile.familyName || 'Sharma');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(familySize, palate, diet, occasion, familyName);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-warm)',
      position: 'relative'
    }}>
      {/* Top Navigation Bar with Warm Progress Indicator */}
      <div style={{
        padding: '16px 20px 8px',
        backgroundColor: 'var(--bg-warm)',
        borderBottom: '1px solid var(--border-sand)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={handlePrev}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-masala)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowLeft size={22} />
          </button>
          
          <h2 style={{ fontSize: '17px', fontWeight: 800 }}>Homechef AI</h2>
          
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-light)' }}>
            Step {step} of 4
          </span>
        </div>

        {/* Linear progress bar */}
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'var(--border-sand)',
          borderRadius: '3px',
          marginTop: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(step / 4) * 100}%`,
            height: '100%',
            backgroundColor: 'var(--primary-saffron)',
            borderRadius: '3px',
            transition: 'var(--transition-cozy)'
          }}></div>
        </div>
      </div>

      {/* Wizard Step Body */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Header titles */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-masala)' }}>
              Tell us about your home.
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--primary-saffron)',
              fontWeight: 700,
              fontStyle: 'italic',
              marginTop: '4px'
            }}>
              "Aapke ghar ka swaad kaisa hai?"
            </p>
          </div>

          {/* Render Step Cards */}
          {step === 1 && (
            <div className="fade-in-slide">
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-masala)' }}>
                How many members in your household?
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { size: '1-2', icon: <User size={24} /> },
                  { size: '3-4', icon: <Users size={24} /> },
                  { size: '5-6', icon: <Group size={24} /> },
                  { size: '6+', icon: <Users size={24} /> }
                ].map(item => {
                  const isSel = familySize === item.size;
                  return (
                    <div 
                      key={item.size}
                      onClick={() => setFamilySize(item.size)}
                      style={{
                        padding: '20px 16px',
                        border: isSel ? '2px solid var(--text-masala)' : '1px solid var(--border-sand)',
                        borderRadius: '16px',
                        backgroundColor: isSel ? 'var(--secondary-turmeric)' : 'var(--bg-card)',
                        color: 'var(--text-masala)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isSel ? 'var(--shadow-hover)' : 'var(--shadow-warm)',
                        transition: 'var(--transition-cozy)'
                      }}
                    >
                      <div style={{ color: isSel ? 'var(--text-masala)' : 'var(--text-light)', marginBottom: '8px' }}>
                        {item.icon}
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: 800 }}>{item.size}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in-slide">
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-masala)' }}>
                Which regional taste do you prefer?
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {["Punjab", "Maharashtra", "West Bengal", "Gujarat", "South India"].map(item => {
                  const isSel = palate === item;
                  return (
                    <div 
                      key={item}
                      onClick={() => {
                        setPalate(item);
                        if (item === 'Gujarat' && diet === 'Non-Vegetarian') {
                          setDiet('Vegetarian');
                        }
                      }}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--bg-card)',
                        border: isSel ? '2px solid var(--text-masala)' : '1px solid var(--border-sand)',
                        boxShadow: 'var(--shadow-warm)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontWeight: 700,
                        color: 'var(--text-masala)',
                        transition: 'var(--transition-cozy)'
                      }}
                    >
                      <span>{item} Style</span>
                      {isSel && (
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-saffron)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in-slide">
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-masala)' }}>
                Dietary Preference of Rasoi
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { type: 'Vegetarian', desc: 'Pure veg recipes with traditional roots', color: 'var(--accent-coriander)' },
                  { type: 'Non-Vegetarian', desc: palate === 'Gujarat' ? 'Locked: Gujarat Style is strictly Veg/Jain/Vegan' : 'Meat, poultry, and seafood specialties', color: 'var(--accent-tomato)', disabled: palate === 'Gujarat' },
                  { type: 'Jain', desc: 'No onions, garlic, or root vegetables', color: 'var(--primary-saffron)' },
                  { type: 'Vegan', desc: '100% plant-based: no dairy, honey, eggs, or meat', color: '#8E44AD' }
                ].map(item => {
                  const isSel = diet === item.type;
                  const isDisabled = item.disabled;
                  return (
                    <div 
                      key={item.type}
                      onClick={() => !isDisabled && setDiet(item.type)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        backgroundColor: isDisabled ? 'rgba(0,0,0,0.015)' : 'var(--bg-card)',
                        border: isSel ? '2px solid var(--text-masala)' : '1px solid var(--border-sand)',
                        boxShadow: isSel ? 'var(--shadow-hover)' : 'var(--shadow-warm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.5 : 1,
                        transition: 'var(--transition-cozy)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Custom visual color code badge representing Compose drawing status */}
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: `${item.color}1E`, /* transparent code */
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            border: `2px solid ${item.color}`,
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: item.color
                            }}></div>
                          </div>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)' }}>
                            {item.type} {isDisabled && '🔒'}
                          </h5>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</p>
                        </div>
                      </div>

                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSel ? '6px solid var(--text-masala)' : '2px solid var(--border-sand)',
                        backgroundColor: '#FFFFFF',
                        transition: 'var(--transition-cozy)'
                      }}></div>
                    </div>
                  );
                })}
              </div>

              {palate === 'Gujarat' && (
                <div style={{
                  marginTop: '16px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--secondary-turmeric)1A',
                  border: '1.5px solid var(--primary-saffron)',
                  color: 'var(--text-masala)',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-warm)'
                }}>
                  <span style={{ fontSize: '18px' }}>🥦</span>
                  <span>Gujarat regional palate is strictly Vegetarian, Jain, or Vegan. Non-Vegetarian has been locked.</span>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="fade-in-slide">
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-masala)' }}>
                Occasions & Surname config
              </h4>
              
              {/* Family name input */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  FAMILY NAME / SURNAME
                </label>
                <input 
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="e.g. Sharma"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-sand)',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    color: 'var(--text-masala)',
                    backgroundColor: 'var(--bg-card)',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>

              {/* Special Occasion chips */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  FESTIVALS / SPECIAL OCCASIONS
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {["Diwali Fasting", "Ramadan / Iftar", "No Preference", "Navratri"].map(status => {
                    const isSel = occasion === status;
                    return (
                      <button 
                        key={status}
                        onClick={() => setOccasion(status)}
                        className={`pill-chip ${isSel ? 'active' : ''}`}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          backgroundColor: isSel 
                            ? (status === "No Preference" ? "var(--accent-coriander)" : "var(--secondary-turmeric)") 
                            : "var(--bg-card)",
                          color: isSel 
                            ? (status === "No Preference" ? "#FFFFFF" : "var(--text-masala)")
                            : "var(--text-masala)",
                          borderColor: isSel
                            ? (status === "No Preference" ? "var(--accent-coriander)" : "var(--text-masala)")
                            : "var(--border-sand)"
                        }}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons navigation footer */}
        <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '30px' }}>
          <button 
            onClick={handlePrev}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="btn-primary"
            style={{ flex: 2 }}
          >
            {step === 4 ? "Shuru Karein !" : "Agla Kadam"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
