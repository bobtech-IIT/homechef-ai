import React, { useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.logoWrapper}>
        <div style={styles.pulsingRing} className="animate-pulse-glow"></div>
        <h1 style={styles.logo} className="text-serif">HomeChef</h1>
        <span style={styles.badge}>AI</span>
      </div>
      <p style={styles.tagline} className="text-accent">Rasoi Ka Saathi</p>
      <div style={styles.loader}>
        <div style={styles.loaderBar}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    background: 'radial-gradient(circle, #221208 0%, #110803 100%)',
    position: 'relative',
    color: '#FDF8F2'
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    position: 'relative',
    zIndex: 2
  },
  pulsingRing: {
    position: 'absolute',
    top: '-30px',
    left: '-30px',
    right: '-30px',
    bottom: '-30px',
    borderRadius: '50%',
    border: '2px solid rgba(232, 105, 42, 0.2)',
    zIndex: -1
  },
  logo: {
    fontSize: '48px',
    fontWeight: '900',
    color: '#FDF8F2',
    letterSpacing: '-1.5px',
    margin: 0
  },
  badge: {
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    padding: '3px 8px',
    borderRadius: '6px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '800',
    fontSize: '16px',
    letterSpacing: '0.5px'
  },
  tagline: {
    fontSize: '18px',
    color: '#F5A623',
    marginTop: '12px',
    letterSpacing: '1px',
    opacity: 0.9
  },
  loader: {
    width: '120px',
    height: '3px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    position: 'absolute',
    bottom: '60px',
    overflow: 'hidden'
  },
  loaderBar: {
    width: '50%',
    height: '100%',
    background: '#E8692A',
    borderRadius: '2px',
    animation: 'loaderSlide 1.5s infinite ease-in-out'
  }
};

// Add standard inline keyframes using CSS injection as precaution
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes loaderSlide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
  `;
  document.head.appendChild(styleSheet);
}
