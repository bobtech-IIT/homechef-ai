import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GRANDMOTHER_RECIPES } from '../data/GrandmotherRecipes';
import { queryAI } from '../utils/puterAI';

const renderMoodText = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} style={{ height: '8px' }} />;
    
    const isBullet = cleanLine.startsWith('- ') || cleanLine.startsWith('* ') || cleanLine.startsWith('• ');
    const isNumbered = /^\d+[\.\)]\s+/.test(cleanLine);
    
    const parseBold = (str) => {
      const parts = str.split(/\*\*|\*/);
      return parts.map((part, i) => {
        if (i % 2 === 1) return <strong key={i} style={{ color: '#C4501A', fontWeight: '800' }}>{part}</strong>;
        return part;
      });
    };

    if (isBullet) {
      const content = cleanLine.replace(/^[-*•]\s+/, '');
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', margin: '4px 0 4px 12px' }}>
          <span style={{ color: '#E8692A', fontSize: '14px' }}>•</span>
          <span style={{ fontSize: '13.5px', lineHeight: '1.45', color: '#4A2C1A' }}>{parseBold(content)}</span>
        </div>
      );
    }
    
    if (isNumbered) {
      const numMatch = cleanLine.match(/^(\d+[\.\)])\s+/);
      const numPrefix = numMatch ? numMatch[1] : '';
      const content = cleanLine.replace(/^\d+[\.\)]\s+/, '');
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', margin: '4px 0 4px 12px' }}>
          <span style={{ color: '#E8692A', fontWeight: '700', fontSize: '13px' }}>{numPrefix}</span>
          <span style={{ fontSize: '13.5px', lineHeight: '1.45', color: '#4A2C1A' }}>{parseBold(content)}</span>
        </div>
      );
    }
    
    const isTitle = cleanLine.length < 50 && (cleanLine.endsWith(':') || !cleanLine.includes('.'));
    if (isTitle) {
      return (
        <h4 key={idx} className="text-serif" style={{ fontSize: '15px', color: '#1A0E08', marginTop: '12px', marginBottom: '6px', fontWeight: '800' }}>
          {parseBold(cleanLine)}
        </h4>
      );
    }
    
    return (
      <p key={idx} style={{ fontSize: '13.5px', lineHeight: '1.45', margin: '6px 0', color: '#4A2C1A' }}>
        {parseBold(cleanLine)}
      </p>
    );
  });
};

export default function HomeDashboard({ onNavigateToTab, onOpenThaliMap }) {
  const { state } = useApp();
  const { profile, weeklyPlan, nutritionScore } = state;
  const [greeting, setGreeting] = useState('Namaste! 👋');
  const [greetingSub, setGreetingSub] = useState('Ready to cook something swadisht?');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [moodResponse, setMoodResponse] = useState('');
  const [isMoodLoading, setIsMoodLoading] = useState(false);

  // Time-aware greeting setup
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) {
      setGreeting('Subah ho gayi! ☀️');
      setGreetingSub('Chalo, banate hain ek swadisht and healthy breakfast!');
    } else if (hr >= 12 && hr < 17) {
      setGreeting('Dopahar ka time! 🌤️');
      setGreetingSub('Time for a traditional, satisfying lunch thali!');
    } else if (hr >= 17 && hr < 20) {
      setGreeting('Sham ki Chai! ☕');
      setGreetingSub('Kuch halka-fulka aur chatpata nashta ho jaye?');
    } else {
      setGreeting('Shubh Ratri! 🌙');
      setGreetingSub('Chalo, din ka ant karein ek swadisht light dinner se.');
    }
  }, []);

  // Deterministic and dietary-compliant Recipe of the Day that rotates uniquely every day
  const getRecipeOfDay = () => {
    const isVegOnly = profile.dietType.includes('Vegetarian') || profile.dietType.includes('Jain');
    const palate = profile.regionalPalate.toLowerCase();
    
    let eligible = GRANDMOTHER_RECIPES.filter(recipe => {
      // 1. Enforce vegetarian restriction if required
      if (isVegOnly && !recipe.isVegetarian) return false;
      
      // 2. Filter out desserts/sweets from the main course thali selection
      const isDessert = recipe.tags?.includes('dessert') || recipe.tags?.includes('sweet') || recipe.name.toLowerCase().includes('chhena poda');
      if (isDessert) return false;
      
      return true;
    });

    // 3. Filter by regional palate if possible
    let regionalMatched = eligible.filter(recipe => recipe.region.toLowerCase() === palate);
    
    // 4. For Non-Vegetarian diet, prioritize non-veg dishes in the regional pool if available
    if (profile.dietType.includes('Non-Vegetarian') && !isVegOnly) {
      const nonVegRegional = regionalMatched.filter(r => !r.isVegetarian);
      if (nonVegRegional.length > 0) {
        regionalMatched = nonVegRegional;
      } else {
        const nonVegGeneral = eligible.filter(r => !r.isVegetarian);
        if (nonVegGeneral.length > 0) {
          eligible = nonVegGeneral;
        }
      }
    }

    const finalPool = regionalMatched.length > 0 ? regionalMatched : eligible;

    // Create a highly dynamic rotating seed combining date, day of week, and month
    const today = new Date();
    const seed = today.getDate() + today.getDay() * 7 + today.getMonth() * 31;
    const index = seed % finalPool.length;
    return finalPool[index];
  };

  const recipeOfDay = getRecipeOfDay();

  // Mood Wheel Handler
  const handleMoodSelect = async (mood, label) => {
    setIsMoodLoading(true);
    setMoodResponse('');
    const prompt = `Family mood is: ${mood} (${label}). Regional palate is: ${profile.regionalPalate}. Diet type: ${profile.dietType}. Suggest 3 comforting, quick Indian home-cookable meal ideas for this mood. Speak in an encouraging, warm Hinglish style. Keep it under 150 words.`;
    
    try {
      const response = await queryAI(prompt, 'You are a warm, traditional Indian grandmother (Nani) who helps families feel better through comforting home food.', 'gpt-4o-mini');
      setMoodResponse(response);
    } catch (e) {
      console.error(e);
      setMoodResponse('Nani says: Healthy and hot food is always the best cure! Cook some warm moong dal khichdi with ghee.');
    } finally {
      setIsMoodLoading(false);
    }
  };

  return (
    <div style={styles.scrollContainer} className="no-scrollbar animate-fade-in">
      {/* 1. Header time-aware greeting */}
      <div style={styles.greetingHeader}>
        <div style={styles.headerInfo}>
          <span style={styles.familyTag} className="text-micro">FAMILY ACCOUNT</span>
          <h1 className="text-serif" style={styles.familyName}>{profile.familyName ? `${profile.familyName} Family` : 'Ghar Ki Rasoi'}</h1>
          <span style={styles.profileBadge}>{profile.regionalPalate.toUpperCase()} • {profile.dietType}</span>
        </div>
      </div>

      <div style={styles.greetingBanner}>
        <h2 style={styles.greetingTitle}>{greeting}</h2>
        <p style={styles.greetingDesc}>{greetingSub}</p>
      </div>

      {/* 2. Recipe of the Day Hero */}
      <div style={styles.sectionHeader}>
        <h3 className="text-serif" style={styles.sectionTitle}>Aaj Ki Special Recipe</h3>
        <span style={styles.sectionBadge}>Nani's Recommendation</span>
      </div>

      <div style={styles.heroCard} className="glass-card" onClick={() => setSelectedRecipe(recipeOfDay)}>
        <div style={styles.heroOverlay}>
          <span style={styles.heroTag}>RECIPE OF THE DAY</span>
          <h2 className="text-serif" style={styles.heroRecipeName}>{recipeOfDay.name}</h2>
          <p style={styles.heroRecipeDesc}>{recipeOfDay.description}</p>
          <div style={styles.heroStatsRow}>
            <span>⏱ {recipeOfDay.cookTime}</span>
            <span>📊 {recipeOfDay.difficulty}</span>
            <span>🌱 {recipeOfDay.isVegetarian ? 'Veg' : 'Non-Veg'}</span>
          </div>
        </div>
      </div>

      {/* Great Indian Thali Map Banner Card */}
      <div style={styles.thaliBanner} className="glass-card animate-pop" onClick={onOpenThaliMap}>
        <div style={styles.thaliBannerContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🗺️</span>
            <span style={styles.thaliTag}>INTERACTIVE VIRTUAL FEAST</span>
          </div>
          <h3 className="text-serif" style={styles.thaliTitle}>The Great Indian Thali Explorer</h3>
          <p style={styles.thaliDesc}>
            Explore the single most viral signature dish from all 28 States & 8 Union Territories across India.
          </p>
          <div style={styles.thaliCTA}>
            <span>Explore 36 Regional Dishes →</span>
          </div>
        </div>
      </div>

      {/* 3. Mood Wheel (Innovation 1) */}
      <div style={styles.sectionHeader}>
        <h3 className="text-serif" style={styles.sectionTitle}>Mood Ke Anusar Khaana</h3>
        <p style={styles.sectionSub}>Tap your mood and let Nani suggest what to cook</p>
      </div>

      <div style={styles.moodWheelContainer} className="glass-card">
        <div style={styles.moodGrid}>
          {[
            { key: 'tired', icon: '🥱', label: 'Tired / Thake Hue' },
            { key: 'celebratory', icon: '🥳', label: 'Celebratory / Khush' },
            { key: 'energetic', icon: '⚡', label: 'Energetic / Active' },
            { key: 'detox', icon: '🍃', label: 'Detox / Halka' },
            { key: 'comfort', icon: '🥣', label: 'Comfort / Bimaar' }
          ].map(m => (
            <button
              key={m.key}
              style={styles.moodBtn}
              onClick={() => handleMoodSelect(m.key, m.label)}
            >
              <span style={styles.moodIcon}>{m.icon}</span>
              <span style={styles.moodLabel}>{m.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {isMoodLoading && (
          <div style={styles.moodLoading}>
            <div className="shimmer" style={styles.loadingBar}></div>
            <p>Nani is thinking...</p>
          </div>
        )}

        {moodResponse && (
          <div style={styles.moodResponse} className="animate-pop">
            <span style={styles.naniQuote}>👵 NANI SAYS:</span>
            <div style={styles.moodText}>{renderMoodText(moodResponse)}</div>
            <button style={styles.closeMoodBtn} onClick={() => setMoodResponse('')}>Dhanyawad Nani! 🙏</button>
          </div>
        )}
      </div>

      {/* 4. Today's Meals Timeline */}
      <div style={styles.sectionHeader}>
        <h3 className="text-serif" style={styles.sectionTitle}>Aaj Ka Menu</h3>
        <button style={styles.viewAllBtn} onClick={() => onNavigateToTab(1)}>Edit Week Planner →</button>
      </div>

      <div style={styles.timeline}>
        {[
          { key: 'breakfast', label: '🍳 BREAKFAST', time: '08:00 AM' },
          { key: 'lunch', label: '🍽️ LUNCH', time: '01:00 PM' },
          { key: 'snack', label: '☕ EVENING SNACK', time: '05:30 PM' },
          { key: 'dinner', label: '🌙 DINNER', time: '08:30 PM' }
        ].map(meal => {
          const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          const plannedMeal = weeklyPlan[today]?.[meal.key] || { name: 'Simple Healthy Thali' };
          return (
            <div key={meal.key} style={styles.timelineNode}>
              <div style={styles.timelineLeft}>
                <span style={styles.timelineTime}>{meal.time}</span>
                <span style={styles.timelineLabel}>{meal.label}</span>
              </div>
              <div style={styles.timelineRight} className="glass-card">
                <h4 style={styles.mealName}>{plannedMeal.name}</h4>
                {plannedMeal.region && <span style={styles.mealRegion}>{plannedMeal.region} Style</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Nutrition Fingerprint (Innovation 5) */}
      <div style={styles.sectionHeader}>
        <h3 className="text-serif" style={styles.sectionTitle}>Weekly Nutrition</h3>
        <span style={styles.sectionBadge}>Healthy Kitchen</span>
      </div>

      <div style={styles.nutritionCard} className="glass-card">
        <h4 style={styles.nutritionTitle}>Family Health Index</h4>
        <div style={styles.nutritionBars}>
          {[
            { key: 'protein', label: 'Protein 💪', color: '#E8692A' },
            { key: 'carbs', label: 'Carbs 🌾', color: '#F5A623' },
            { key: 'fiber', label: 'Fiber 🥗', color: '#0D6E4E' },
            { key: 'iron', label: 'Iron 🩸', color: '#C0392B' }
          ].map(nut => (
            <div key={nut.key} style={styles.barRow}>
              <span style={styles.barLabel}>{nut.label}</span>
              <div style={styles.barOuter}>
                <div
                  style={{
                    ...styles.barInner,
                    width: `${nutritionScore[nut.key] || 50}%`,
                    background: nut.color
                  }}
                ></div>
              </div>
              <span style={styles.barVal}>{nutritionScore[nut.key] || 50}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recipe Detail Modal */}
      {selectedRecipe && (
        <div style={styles.modalOverlay} className="animate-fade-in">
          <div style={styles.modalContent} className="glass-card animate-slide-up">
            <h2 className="text-serif" style={styles.modalTitle}>{selectedRecipe.name}</h2>
            <span style={styles.modalRegion}>{selectedRecipe.region} Cuisine • traditional</span>
            
            <div style={styles.modalAccordion}>
              <h4 style={styles.accordionHeader}>📝 Ingredients</h4>
              <ul style={styles.ingredientsList}>
                {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>

              <h4 style={styles.accordionHeader} style={{ marginTop: '16px' }}>👩‍🍳 Steps</h4>
              <ol style={styles.stepsList}>
                {selectedRecipe.steps.map((st, i) => <li key={i}>{st}</li>)}
              </ol>
            </div>

            <button style={styles.closeModalBtn} onClick={() => setSelectedRecipe(null)}>Close Cooking Panel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  scrollContainer: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1,
    background: '#FDF8F2'
  },
  greetingHeader: {
    marginBottom: '20px',
    borderBottom: '1px solid rgba(74, 44, 26, 0.1)',
    paddingBottom: '16px'
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  familyTag: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#7A5540'
  },
  familyName: {
    fontSize: '32px',
    color: '#1A0E08',
    margin: 0
  },
  profileBadge: {
    alignSelf: 'flex-start',
    background: '#FEF3DC',
    color: '#C4501A',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    marginTop: '6px'
  },
  greetingBanner: {
    background: 'linear-gradient(135deg, #221208 0%, #3D1E0C 100%)',
    color: '#FDF8F2',
    padding: '24px',
    borderRadius: '20px',
    marginBottom: '28px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
  },
  greetingTitle: {
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '6px'
  },
  greetingDesc: {
    fontSize: '14px',
    lineHeight: '1.4',
    opacity: 0.85
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '16px',
    marginTop: '28px'
  },
  sectionTitle: {
    fontSize: '22px',
    color: '#1A0E08',
    margin: 0
  },
  sectionBadge: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#E8692A'
  },
  sectionSub: {
    fontSize: '13px',
    color: '#7A5540'
  },
  heroCard: {
    height: '200px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(232,105,42,0.85) 0%, rgba(196,80,26,0.95) 100%), url("/src/assets/hero.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative'
  },
  heroOverlay: {
    padding: '24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: '#fff',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)'
  },
  heroTag: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    color: '#FEF3DC',
    marginBottom: '6px'
  },
  heroRecipeName: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '4px'
  },
  heroRecipeDesc: {
    fontSize: '13px',
    lineHeight: '1.4',
    opacity: 0.9,
    marginBottom: '12px'
  },
  heroStatsRow: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    fontWeight: '700'
  },
  moodWheelContainer: {
    padding: '20px',
    background: '#fff'
  },
  moodGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px'
  },
  moodBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#F9F1E5',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    borderRadius: '16px',
    padding: '12px 6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  moodIcon: {
    fontSize: '24px',
    marginBottom: '4px'
  },
  moodLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#4A2C1A'
  },
  moodLoading: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#7A5540'
  },
  loadingBar: {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    marginBottom: '8px'
  },
  moodResponse: {
    marginTop: '20px',
    padding: '16px',
    background: '#FEF3DC',
    borderRadius: '16px',
    borderLeft: '4px solid #E8692A'
  },
  naniQuote: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#C4501A',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '6px'
  },
  moodText: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1A0E08',
    marginBottom: '12px'
  },
  closeMoodBtn: {
    background: '#E8692A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  viewAllBtn: {
    background: 'none',
    border: 'none',
    color: '#E8692A',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
    paddingLeft: '16px'
  },
  timelineNode: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  timelineLeft: {
    width: '90px',
    display: 'flex',
    flexDirection: 'column'
  },
  timelineTime: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#7A5540'
  },
  timelineLabel: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#E8692A',
    marginTop: '2px'
  },
  timelineRight: {
    flex: 1,
    padding: '16px',
    background: '#fff',
    borderRadius: '16px'
  },
  mealName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1A0E08'
  },
  mealRegion: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    color: '#0D6E4E',
    background: '#E8F5F0',
    padding: '2px 6px',
    borderRadius: '10px',
    marginTop: '6px'
  },
  nutritionCard: {
    padding: '20px',
    background: '#fff',
    marginBottom: '20px'
  },
  nutritionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A0E08',
    marginBottom: '16px'
  },
  nutritionBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  barLabel: {
    width: '80px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A2C1A'
  },
  barOuter: {
    flex: 1,
    height: '8px',
    background: '#E5E4E7',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  barInner: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.6s ease'
  },
  barVal: {
    width: '40px',
    textAlign: 'right',
    fontSize: '13px',
    fontWeight: '700',
    color: '#1A0E08'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(26, 14, 8, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 99
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    background: '#FDF8F2',
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
    padding: '28px 28px 90px 28px',
    overflowY: 'auto'
  },
  modalTitle: {
    fontSize: '28px',
    color: '#1A0E08'
  },
  modalRegion: {
    display: 'inline-block',
    fontSize: '13px',
    color: '#C4501A',
    fontWeight: '700',
    marginTop: '4px',
    marginBottom: '20px'
  },
  modalAccordion: {
    textAlign: 'left',
    marginBottom: '24px'
  },
  accordionHeader: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#1A0E08',
    borderBottom: '1px solid rgba(74, 44, 26, 0.1)',
    paddingBottom: '8px',
    marginBottom: '10px'
  },
  ingredientsList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4A2C1A'
  },
  stepsList: {
    paddingLeft: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4A2C1A'
  },
  closeModalBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  thaliBanner: {
    padding: '20px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #1E140F 0%, #2C1A11 100%)',
    border: '1.5px solid #E8692A',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '24px',
    boxShadow: '0 8px 24px rgba(232, 105, 42, 0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    textAlign: 'left'
  },
  thaliBannerContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  thaliTag: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#E8692A',
    letterSpacing: '1px'
  },
  thaliTitle: {
    fontSize: '22px',
    margin: '8px 0 6px 0',
    color: '#FFFFFF'
  },
  thaliDesc: {
    fontSize: '13px',
    lineHeight: '1.45',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0 0 12px 0'
  },
  thaliCTA: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#E8692A'
  }
};
