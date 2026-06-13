import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import SetupWizard from './components/SetupWizard';
import HomeDashboard from './components/HomeDashboard';
import WeeklyPlanner from './components/WeeklyPlanner';
import AIChatPlanner from './components/AIChatPlanner';
import InventoryManager from './components/InventoryManager';
import GrandmotherVault from './components/GrandmotherVault';
import SettingsPanel from './components/SettingsPanel';
import IndianThaliMap from './components/IndianThaliMap';

export default function App() {
  const { state, dispatch } = useApp();
  const { profile } = state;
  
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThaliOpen, setIsThaliOpen] = useState(false);

  // Handlers for dynamic tab routing triggers
  const handleTriggerChatPrompt = (promptText) => {
    // 1. Prefill and add the message to history if active
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'user', text: promptText, timestamp: Date.now() }
    });
    // 2. Switch directly to AI Chat tab (Tab 2)
    setActiveTab(2);
  };

  const handleSelectThaliRecipe = (dishName) => {
    handleTriggerChatPrompt(`Nani, mujhe "${dishName}" ki traditional recipe chahiye. Please step-by-step banane ka tarika batayein.`);
  };

  // 1. Splash Screen Loader Screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // 2. First-time Setup Wizard if Profile not complete
  if (!profile.isSetupComplete) {
    return <SetupWizard />;
  }

  return (
    <div style={styles.appShell}>
      {/* Premium Top Navigation Header */}
      <header style={styles.topBar} className="glass-panel">
        <div style={styles.logoRow}>
          <span style={styles.logoIcon}>🥘</span>
          <h2 className="text-serif" style={styles.logoText}>HomeChef <span style={styles.logoBadge}>v3</span></h2>
        </div>
        <button style={styles.gearBtn} onClick={() => setIsSettingsOpen(true)}>
          ⚙️
        </button>
      </header>

      {/* Main Pages Renderer */}
      <main style={styles.mainContent}>
        {activeTab === 0 && (
          <HomeDashboard 
            onNavigateToTab={(tab) => setActiveTab(tab)} 
            onOpenThaliMap={() => setIsThaliOpen(true)} 
          />
        )}
        {activeTab === 1 && <WeeklyPlanner />}
        {activeTab === 2 && <AIChatPlanner />}
        {activeTab === 3 && <InventoryManager onTriggerChatPrompt={handleTriggerChatPrompt} />}
        {activeTab === 4 && <GrandmotherVault />}
      </main>

      {/* Persistent Bottom Tab Navigation Bar */}
      <nav style={styles.bottomNav} className="glass-panel">
        {[
          { icon: '🏠', label: 'Home' },
          { icon: '📅', label: 'Planner' },
          { icon: '💬', label: 'AI Chat' },
          { icon: '🫙', label: 'Pantry' },
          { icon: '📜', label: 'Nani\'s Vault' }
        ].map((tab, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={idx}
              style={{
                ...styles.navBtn,
                color: isActive ? '#E8692A' : '#7A5540',
                transform: isActive ? 'scale(1.1)' : 'none'
              }}
              onClick={() => setActiveTab(idx)}
            >
              <span style={styles.navIcon}>{tab.icon}</span>
              <span style={{
                ...styles.navLabel,
                fontWeight: isActive ? '700' : '500'
              }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Great Indian Thali Map Modal Overlay */}
      {isThaliOpen && (
        <IndianThaliMap 
          onClose={() => setIsThaliOpen(false)} 
          onSelectRecipe={handleSelectThaliRecipe} 
        />
      )}

      {/* Settings Modal Slider Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

const styles = {
  appShell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  topBar: {
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(74, 44, 26, 0.1)',
    zIndex: 10
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  logoIcon: {
    fontSize: '20px'
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#1A0E08',
    margin: 0
  },
  logoBadge: {
    fontSize: '10px',
    fontWeight: '900',
    background: '#FEF3DC',
    color: '#C4501A',
    padding: '1px 4px',
    borderRadius: '4px',
    verticalAlign: 'middle',
    marginLeft: '2px'
  },
  gearBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  bottomNav: {
    display: 'flex',
    padding: '8px 10px env(safe-area-inset-bottom) 10px', // Handles mobile safe area notches!
    borderTop: '1px solid rgba(74, 44, 26, 0.1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10
  },
  navBtn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    cursor: 'pointer',
    flex: 1,
    padding: '6px 0',
    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  navIcon: {
    fontSize: '20px'
  },
  navLabel: {
    fontSize: '10px',
    fontFamily: 'Outfit, sans-serif',
    letterSpacing: '0.2px'
  }
};
