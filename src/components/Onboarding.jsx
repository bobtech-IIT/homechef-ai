import React, { useState, useEffect } from 'react';
import { Languages, ArrowRight, Search, Sparkles, ChefHat } from 'lucide-react';

export default function Onboarding({ onNext, onSkip }) {
  const [activeQuery, setActiveQuery] = useState("Search: so");
  const [searchPhase, setSearchPhase] = useState(0);

  // Animate a simple typing and matching mockup to show off the advanced typo-resilient search engine!
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchPhase(prev => {
        const next = (prev + 1) % 4;
        if (next === 0) setActiveQuery("Search: so");
        else if (next === 1) setActiveQuery("Search: soyaben");
        else if (next === 2) setActiveQuery("Search: soyabeen chicken");
        else if (next === 3) setActiveQuery("Search: kundri");
        return next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

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
      padding: '24px',
      background: 'var(--bg-warm)',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header Language selection */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button style={{
          width: '44px',
          height: '44px',
          borderRadius: '16px',
          backgroundColor: 'var(--pill-soft)',
          border: '1px solid var(--border-sand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-masala)',
          cursor: 'pointer'
        }}>
          <Languages size={20} />
        </button>
      </div>

      {/* Header Titles */}
      <div style={{ padding: '0 8px', marginTop: '10px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 900,
          color: 'var(--text-masala)',
          lineHeight: '30px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Smart Typo-Resilient Recipe Planner
        </h2>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: '19px',
          marginTop: '8px',
          fontWeight: 600
        }}>
          Search any regional dish in any broken language. Our offline Gastro-Matrix auto-matches ingredients instantly!
        </p>
      </div>

      {/* Center Interactive Search Graphic Mockup */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        margin: '20px 0',
        padding: '0 8px'
      }}>
        {/* Mock Search Bar */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '14px',
          border: '1px solid var(--border-sand)',
          boxShadow: 'var(--shadow-warm)',
          textAlign: 'left'
        }}>
          <Search size={18} style={{ color: 'var(--primary-saffron)' }} />
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-masala)',
            fontFamily: 'monospace'
          }}>
            {activeQuery}
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '14px',
              backgroundColor: 'var(--primary-saffron)',
              marginLeft: '2px',
              animation: 'pulse 1s infinite'
            }}></span>
          </span>
        </div>

        {/* Dynamic Mockup Match Card */}
        <div style={{
          width: '100%',
          padding: '16px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-sand)',
          boxShadow: 'var(--shadow-hover)',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--primary-saffron)',
              backgroundColor: 'var(--primary-light)',
              padding: '3px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {searchPhase === 0 && "Typing..."}
              {searchPhase === 1 && "Smart Match 🌿"}
              {searchPhase === 2 && "Fusion Dish 🍗"}
              {searchPhase === 3 && "Phonetic Match 📿"}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
              <Sparkles size={12} style={{ color: 'var(--secondary-turmeric)' }} />
              98% Match
            </div>
          </div>

          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-masala)', margin: '0 0 6px 0' }}>
            {searchPhase === 0 && "Soya Chunks Masala"}
            {searchPhase === 1 && "Soya Chunks Masala"}
            {searchPhase === 2 && "Soya Chicken Keema"}
            {searchPhase === 3 && "Kundru Masala Stir Fry"}
          </h4>

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: '15px' }}>
            {searchPhase === 0 && "Rich plant protein curry made with meal-maker chunks in local spices."}
            {searchPhase === 1 && "Rich plant protein curry made with meal-maker chunks in local spices."}
            {searchPhase === 2 && "High-protein fusion dish blending healthy soya chunks with minced chicken."}
            {searchPhase === 3 && "Crispy spiced ivy gourd stir fry, perfectly suited for light comfort meals."}
          </p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--pill-soft)', color: 'var(--text-masala)' }}>
              {searchPhase === 2 ? 'Non-Vegetarian' : 'Vegetarian'}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--pill-soft)', color: 'var(--text-masala)' }}>
              {searchPhase === 2 ? '30 Mins' : '20 Mins'}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--pill-soft)', color: 'var(--text-masala)' }}>
              {searchPhase === 2 ? 'Soya + Chicken' : 'Zero-Waste'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button onClick={onNext} className="btn-primary">
          Get Started
          <ArrowRight size={20} />
        </button>

        <button 
          onClick={onSkip} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: 'var(--text-masala)',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '8px',
            textDecoration: 'underline'
          }}
        >
          Skip for now
        </button>

        <span style={{
          fontSize: '9px',
          fontWeight: 700,
          color: 'var(--text-light)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginTop: '4px'
        }}>
          100% Secure offline culinary database
        </span>
      </div>
    </div>
  );
}
