import React from 'react';
import { ChefHat, HelpCircle, CheckCircle2, MessageSquare, ClipboardList, Sparkles } from 'lucide-react';

export default function WelcomeModal({ familyName, onClose }) {
  return (
    <div className="pdf-preview-backdrop" style={{ zIndex: 2000 }}>
      <div className="pdf-preview-sheet fade-in-slide" style={{
        maxWidth: '380px',
        padding: '24px',
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #FCF8F2 100%)',
        border: '2px solid var(--primary-saffron)',
        boxShadow: '0 20px 50px rgba(44, 26, 17, 0.3)'
      }}>
        {/* Chef Mascot Badge Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            border: '3.5px solid var(--secondary-turmeric)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: 'var(--shadow-warm)'
          }}>
            <ChefHat size={34} style={{ color: 'var(--primary-saffron)' }} />
          </div>
          
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Sparkles size={18} style={{ color: 'var(--secondary-turmeric)' }} />
            Namaste {familyName} Family!
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
            Welcome to your smart culinary companion
          </p>
        </div>

        {/* Informational checklist steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--accent-coriander)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)' }}>
                1. Review Your Spiced Menu
              </h5>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px' }}>
                We've instantly pre-seeded Wednesday's daily menu based on your regional and dietary preferences.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Sparkles size={20} style={{ color: 'var(--secondary-turmeric)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)' }}>
                2. Accept or Swap Instantly
              </h5>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px' }}>
                Approve your daily menu, or click "Swap" on any meal card to shuffle appetizing alternatives.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <MessageSquare size={20} style={{ color: 'var(--primary-saffron)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)' }}>
                3. Reject & Trigger AI Interview
              </h5>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px' }}>
                If you reject, the app automatically transitions to the AI Chef. Answer 4 quick questions to generate a menu!
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <ClipboardList size={20} style={{ color: 'var(--text-light)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)' }}>
                4. Smart Pantry stock
              </h5>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px' }}>
                Manage your Fridge, Pantry, and Spices. The planner auto-checks what ingredients are available!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Dismiss Button */}
        <button 
          onClick={onClose} 
          className="btn-primary"
          style={{
            padding: '12px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Chalo Cook Karein !
        </button>

      </div>
    </div>
  );
}
