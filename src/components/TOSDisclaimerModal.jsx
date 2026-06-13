import React, { useState } from 'react';
import { ShieldAlert, Check, HeartPulse, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TOSDisclaimerModal({ isOpen, onAccept }) {
  const [agreedAllergen, setAgreedAllergen] = useState(false);
  const [agreedMedical, setAgreedMedical] = useState(false);
  const [agreedAccuracy, setAgreedAccuracy] = useState(false);
  const [showScrollAlert, setShowScrollAlert] = useState(false);

  if (!isOpen) return null;

  const handleAgree = () => {
    if (agreedAllergen && agreedMedical && agreedAccuracy) {
      onAccept();
    } else {
      setShowScrollAlert(true);
      setTimeout(() => setShowScrollAlert(false), 3000);
    }
  };

  const isFormValid = agreedAllergen && agreedMedical && agreedAccuracy;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(44, 26, 17, 0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div className="fade-in-slide" style={{
        backgroundColor: 'var(--bg-warm)',
        borderRadius: 'var(--radius-lg)',
        border: '2px solid var(--primary-saffron)',
        boxShadow: 'var(--shadow-hover), 0 0 30px rgba(211, 84, 0, 0.25)',
        width: '100%',
        maxWidth: '440px',
        padding: '28px 24px',
        boxSizing: 'border-box',
        maxHeight: '90dvh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Element */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'rgba(243, 156, 18, 0.15)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}></div>

        {/* Header Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'var(--accent-tomato-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-tomato)'
          }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-masala)', margin: 0, fontFamily: 'Outfit' }}>
              Kitchen Safety & Legal Suite
            </h3>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-tomato)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Google Play Review Safeguard
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-sand)', width: '100%' }}></div>

        {/* Scrollable Terms Content */}
        <div style={{
          fontSize: '12.5px',
          color: 'var(--text-muted)',
          lineHeight: '18px',
          maxHeight: '260px',
          overflowY: 'auto',
          paddingRight: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <p style={{ fontWeight: 600 }}>
            Welcome to <strong>HomeChef AI</strong>! Before managing your joint family kitchen menu, our legal framework requires you to acknowledge the following medical and safety exclusions:
          </p>
          
          <div style={{
            display: 'flex',
            gap: '8px',
            backgroundColor: 'var(--secondary-light)',
            border: '1px dashed var(--secondary-turmeric)',
            borderRadius: '10px',
            padding: '10px 12px',
            fontSize: '11px',
            color: 'var(--text-masala)',
            fontWeight: 700
          }}>
            <HeartPulse size={20} style={{ flexShrink: 0, color: 'var(--primary-saffron)' }} />
            <span>Health Exclusions: AI recipe planning is for educational, culinary and household logistics purposes. Always verify values with a qualified doctor.</span>
          </div>

          <p>
            This application generates recipes using automated algorithms (powered securely by Advanced Cloud AI). Suggestions may contain variations, and measurements should be adjusted by the cook depending on exact family profiles.
          </p>
        </div>

        {/* Consent Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
          
          {/* Checkbox 1: Allergen */}
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <input 
              type="checkbox" 
              checked={agreedAllergen}
              onChange={() => setAgreedAllergen(!agreedAllergen)}
              style={{
                width: '18px',
                height: '18px',
                marginTop: '2px',
                accentColor: 'var(--primary-saffron)'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-masala)', lineHeight: '16px' }}>
              I agree to verify all recipes against my family's severe food allergies. HomeChef AI is not liable for allergen exposure. 🥜
            </span>
          </label>

          {/* Checkbox 2: Medical advice */}
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <input 
              type="checkbox" 
              checked={agreedMedical}
              onChange={() => setAgreedMedical(!agreedMedical)}
              style={{
                width: '18px',
                height: '18px',
                marginTop: '2px',
                accentColor: 'var(--primary-saffron)'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-masala)', lineHeight: '16px' }}>
              I understand that automatic meal rules (low-sodium, diabetic, jain) are planning guidelines, not certified medical diets. 🩺
            </span>
          </label>

          {/* Checkbox 3: App accuracy */}
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <input 
              type="checkbox" 
              checked={agreedAccuracy}
              onChange={() => setAgreedAccuracy(!agreedAccuracy)}
              style={{
                width: '18px',
                height: '18px',
                marginTop: '2px',
                accentColor: 'var(--primary-saffron)'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-masala)', lineHeight: '16px' }}>
              I accept the Terms of Service & Privacy Policy, confirming my family reviews ingredient metrics prior to preparation. 📋
            </span>
          </label>

        </div>

        {/* Warning Toast Alerts */}
        {showScrollAlert && (
          <div style={{
            backgroundColor: 'var(--accent-tomato-light)',
            border: '1px solid var(--accent-tomato)',
            borderRadius: '10px',
            padding: '8px 12px',
            color: 'var(--accent-tomato)',
            fontSize: '11px',
            fontWeight: 800,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <AlertTriangle size={14} />
            Please check all three safety parameters to proceed.
          </div>
        )}

        {/* Footer CTAs */}
        <button 
          onClick={handleAgree}
          className="btn-primary"
          disabled={!isFormValid}
          style={{
            marginTop: '10px',
            backgroundColor: isFormValid ? 'var(--primary-saffron)' : 'var(--text-light)',
            boxShadow: isFormValid ? '0 4px 14px rgba(211, 84, 0, 0.3)' : 'none',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            opacity: isFormValid ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            padding: '14px'
          }}
        >
          {isFormValid ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
          I Agree & Enter Rasoi
        </button>

      </div>
    </div>
  );
}
