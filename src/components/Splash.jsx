import React from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';

export default function Splash({ onNext, onReset }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      height: '100dvh',
      minHeight: '100dvh',
      boxShadow: '0 0 40px rgba(0, 0, 0, 0.05)',
      borderLeft: '1px solid var(--border-sand)',
      borderRight: '1px solid var(--border-sand)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 24px 28px',
      background: 'linear-gradient(to bottom, #FFFBF9 0%, #FDF5ED 100%)',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top branding */}
      <div style={{ marginTop: '20px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 900,
          color: 'var(--text-masala)',
          letterSpacing: '-0.5px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Homechef AI
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'var(--primary-saffron)',
          fontWeight: 700,
          fontStyle: 'italic',
          marginTop: '6px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Aaj kya banaye?
        </p>
      </div>

      {/* Mascot Container */}
      <div className="voice-glow-ring" style={{
        width: '240px',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '40px 0'
      }}>
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          border: '4px solid var(--secondary-turmeric)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-hover)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-warm)',
            marginBottom: '8px'
          }}>
            <ChefHat size={44} style={{ color: 'var(--primary-saffron)' }} />
          </div>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            color: 'var(--text-masala)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ color: 'var(--secondary-turmeric)' }}>✦</span> RASOI READY
          </span>
        </div>
      </div>

      {/* CTA Trigger */}
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button onClick={onNext} className="btn-primary">
          Chalo Shuru Karein
          <ArrowRight size={20} />
        </button>

        <button 
          onClick={onReset} 
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            textDecoration: 'underline',
            marginBottom: '8px',
            textAlign: 'center',
            fontFamily: 'inherit',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-tomato)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
        >
          Reset and Start Fresh (Clear Saved Data)
        </button>

        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--text-light)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginTop: '4px'
        }}>
          POWERED BY MODERN INDIAN RASOI INTELLIGENCE
        </span>
      </div>
    </div>
  );
}
