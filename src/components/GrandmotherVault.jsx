import React, { useState, useEffect } from 'react';
import { GRANDMOTHER_RECIPES } from '../data/GrandmotherRecipes';
import { HEALTH_DRINKS } from '../data/HealthDrinks';
import WeeklyPlanner from './WeeklyPlanner';
import { useApp } from '../context/AppContext';

const REGIONS = ['All', 'Saved (AI)', 'Bangladesh', 'West Bengal', 'Gujarat', 'Punjab', 'Maharashtra', 'Odisha', 'Tamil Nadu', 'Kerala'];

export default function GrandmotherVault() {
  const { state, dispatch } = useApp();
  const [subTab, setSubTab] = useState('vault'); // 'vault', 'nuskhe', or 'planner'
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeNuskhe, setActiveNuskhe] = useState(null);
  const [nuskheCategory, setNuskheCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customRecipes, setCustomRecipes] = useState([]);
  
  useEffect(() => {
    try {
      const raw = localStorage.getItem('homechef_custom_recipes');
      if (raw) setCustomRecipes(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load custom recipes in Vault:', e);
    }
  }, [subTab]);

  const handleNuskheSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Day/Meal allocation states inside the detailed modal
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedMealSlot, setSelectedMealSlot] = useState('lunch');

  const filteredRecipes = selectedRegion === 'All'
    ? [...customRecipes, ...GRANDMOTHER_RECIPES]
    : selectedRegion === 'Saved (AI)'
      ? customRecipes
      : GRANDMOTHER_RECIPES.filter(r => {
          const reg = r.region.toLowerCase();
          const sel = selectedRegion.toLowerCase();
          if (sel === 'west bengal') {
            return reg === 'kolkata' || reg === 'bengal' || reg === 'west bengal';
          }
          return reg === sel;
        });

  const filteredNuskhe = HEALTH_DRINKS.filter(hd => {
    // 1. Tab category filter
    const matchesCategory = nuskheCategory === 'All' || hd.category.toLowerCase().includes(nuskheCategory.toLowerCase());
    
    // 2. Dictionary key lookup (symptom, name, or ingredient match)
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    
    const matchesQuery = 
      hd.name.toLowerCase().includes(q) ||
      hd.objective.toLowerCase().includes(q) ||
      hd.story.toLowerCase().includes(q) ||
      hd.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
      (hd.symptoms && hd.symptoms.some(s => s.toLowerCase().includes(q)));
      
    return matchesCategory && matchesQuery;
  });

  const handleAssignToPlanner = (recipe) => {
    dispatch({
      type: 'SWAP_MEAL',
      payload: {
        day: selectedDay,
        mealType: selectedMealSlot,
        newMeal: {
          id: recipe.id,
          name: recipe.name,
          isVegetarian: recipe.isVegetarian !== undefined ? recipe.isVegetarian : true,
          category: selectedMealSlot,
          region: recipe.region || 'Nani\'s Nuskhe',
          ingredients: recipe.ingredients,
          steps: recipe.steps || recipe.recipe
        }
      }
    });
    alert(`Success! "${recipe.name}" has been assigned to ${selectedDay}'s ${selectedMealSlot}! 🍳`);
    setShowAssignDropdown(false);
    setActiveRecipe(null);
    setActiveNuskhe(null);
  };

  return (
    <div style={styles.scrollContainer} className="no-scrollbar animate-fade-in">
      {/* Dynamic Sub-Tab Selector at Top */}
      <div style={styles.subTabContainer} className="glass-panel">
        <button
          style={{
            ...styles.subTabBtn,
            background: subTab === 'vault' ? '#4A2C1A' : 'transparent',
            color: subTab === 'vault' ? '#FDF8F2' : '#4A2C1A',
            fontWeight: subTab === 'vault' ? '700' : '500'
          }}
          onClick={() => setSubTab('vault')}
        >
          Vault
        </button>
        <button
          style={{
            ...styles.subTabBtn,
            background: subTab === 'nuskhe' ? '#4A2C1A' : 'transparent',
            color: subTab === 'nuskhe' ? '#FDF8F2' : '#4A2C1A',
            fontWeight: subTab === 'nuskhe' ? '700' : '500'
          }}
          onClick={() => setSubTab('nuskhe')}
        >
          Nuskhe
        </button>
        <button
          style={{
            ...styles.subTabBtn,
            background: subTab === 'planner' ? '#4A2C1A' : 'transparent',
            color: subTab === 'planner' ? '#FDF8F2' : '#4A2C1A',
            fontWeight: subTab === 'planner' ? '700' : '500'
          }}
          onClick={() => setSubTab('planner')}
        >
          Planner
        </button>
      </div>

      {subTab === 'planner' && <WeeklyPlanner />}

      {subTab === 'vault' && (
        <div>
          {/* Sepia-Style Vintage Header */}
          <div style={styles.header}>
            <span style={styles.vintageTag}>HEIRLOOM</span>
            <h1 className="text-serif" style={styles.title}>Vault</h1>
            <p style={styles.subtitle}>Timeless recipes. Archetype-ready.</p>
          </div>

          {/* Horizontal Region Selector */}
          <div style={styles.regionSelector} className="no-scrollbar">
            {REGIONS.map(reg => (
              <button
                key={reg}
                style={{
                  ...styles.regionBtn,
                  background: selectedRegion === reg ? '#4A2C1A' : '#fff',
                  color: selectedRegion === reg ? '#FDF8F2' : '#4A2C1A',
                  borderColor: selectedRegion === reg ? '#4A2C1A' : 'rgba(74, 44, 26, 0.15)'
                }}
                onClick={() => setSelectedRegion(reg)}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Grid of Vintage Recipe Cards */}
          <div style={styles.recipeGrid}>
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                style={styles.recipeCard}
                className="glass-card animate-pop"
                onClick={() => setActiveRecipe(recipe)}
              >
                <div style={styles.recipeCardHeader}>
                  <span style={styles.heirloomStamp}>📜 HEIRLOOM</span>
                  <span style={styles.recipeRegion}>{recipe.region}</span>
                </div>
                
                <h3 className="text-serif" style={styles.recipeName}>{recipe.name}</h3>
                <p style={styles.recipeStory}>"{recipe.story}"</p>
                
                <div style={styles.recipeFooter}>
                  <span>⏱ {recipe.cookTime}</span>
                  <span style={styles.viewLink}>View →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'nuskhe' && (
        <div>
          {/* Sepia-Style Vintage Header */}
          <div style={styles.header}>
            <span style={styles.vintageTag}>NUSKHE</span>
            <h1 className="text-serif" style={styles.title}>Nani's Nuskhe</h1>
            <p style={styles.subtitle}>Health drinks. RAG + archetype aware.</p>
          </div>

          {/* 🔍 Symptom Search Box & Key Dictionary Lookup */}
          <div style={styles.searchContainer} className="glass-panel">
            <input
              type="text"
              placeholder="🔍 Search symptoms e.g. acidity, cough, weight loss, heat..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={handleNuskheSearch}
            />
            {searchQuery && (
              <button style={styles.clearSearchBtn} onClick={() => setSearchQuery('')}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* 🎯 Preset Concern Radio Buttons (Preset Questions) */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', fontWeight: '800', color: '#7A5540', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎯 Select Common Health Concern:
            </p>
            <div style={styles.presetsRow}>
              {[
                { label: "Gas & Acidity 🥬", query: "acidity" },
                { label: "Cough & Cold 🛡️", query: "cough" },
                { label: "Belly Fat 🌱", query: "weight" },
                { label: "Insomnia & Sleep 💆", query: "sleep" },
                { label: "Skin & Hair Glow ✨", query: "hair" },
                { label: "Diabetic Sugar 🩸", query: "sugar" }
              ].map(preset => {
                const isActive = searchQuery.toLowerCase() === preset.query;
                return (
                  <button
                    key={preset.query}
                    style={{
                      ...styles.presetBtn,
                      background: isActive ? '#FEF3DC' : '#fff',
                      borderColor: isActive ? '#E8692A' : 'rgba(74, 44, 26, 0.15)',
                      color: isActive ? '#C4501A' : '#4A2C1A',
                      fontWeight: isActive ? '800' : '500'
                    }}
                    onClick={() => setSearchQuery(isActive ? '' : preset.query)}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Category Selector */}
          <div style={styles.regionSelector} className="no-scrollbar">
            {['All', 'Weight Loss', 'Sugar Control', 'Stay Cooler', 'Immunity', 'Digestive Health'].map(cat => (
              <button
                key={cat}
                style={{
                  ...styles.regionBtn,
                  background: nuskheCategory === cat ? '#E8692A' : '#fff',
                  color: nuskheCategory === cat ? '#fff' : '#4A2C1A',
                  borderColor: nuskheCategory === cat ? '#E8692A' : 'rgba(74, 44, 26, 0.15)'
                }}
                onClick={() => setNuskheCategory(cat)}
              >
                {cat === 'All' ? '🌐 All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Grid of Health Drinks or Cloud AI Handover */}
          {filteredNuskhe.length > 0 ? (
            <div style={styles.recipeGrid}>
              {filteredNuskhe.map(drink => (
                <div
                  key={drink.id}
                  style={{ ...styles.recipeCard, borderLeft: '4px solid #E8692A' }}
                  className="glass-card animate-pop"
                  onClick={() => setActiveNuskhe(drink)}
                >
                  <div style={styles.recipeCardHeader}>
                    <span style={{ color: '#E8692A', letterSpacing: '1px' }}>🍵 HEALTH DRINK</span>
                    <span style={{ ...styles.recipeRegion, background: '#FEF3DC', color: '#C4501A' }}>{drink.category}</span>
                  </div>
                  
                  <h3 className="text-serif" style={styles.recipeName}>{drink.name}</h3>
                  <p style={{ ...styles.recipeStory, fontSize: '13px', color: '#1A0E08', fontStyle: 'normal', fontWeight: '600' }}>
                    🎯 Objective: {drink.objective}
                  </p>
                  <p style={styles.recipeStory}>"{drink.story}"</p>
                  
                  <div style={styles.recipeFooter}>
                    <span>⚡ Prep: {drink.equipment}</span>
                    <span style={styles.viewLink}>View →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.cloudHandover} className="glass-card animate-pop">
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>👵✨</span>
              <h3 className="text-serif" style={{ fontSize: '19px', color: '#4A2C1A', margin: '0 0 10px 0', fontWeight: '800' }}>
                Arey beta, yeh nuskha hamare offline batue me nahi mila!
              </h3>
              <p style={{ fontSize: '13.5px', color: '#7A5540', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                Hamarai advanced **Cloud AI Nani** ke paas 200+ aur highly customized natural remedies hain! Bas Nani AI se direct adrak wali chai, acidity remedy, ya koi bhi personal nuskha poochiye!
              </p>
              <button
                style={styles.handoverActiveBtn}
                onClick={() => {
                  dispatch({
                    type: 'ADD_CHAT_MESSAGE',
                    payload: { sender: 'user', text: `Nani, mujhe "${searchQuery || 'Home remedy drink'}" ke liye ek natural home health drink recipe chahiye. mixer me banane ka tarika batayein.`, timestamp: Date.now() }
                  });
                  alert("Aapka nuskha request AI Chat me bhej diya gaya hai! Chat tab par switch karke Nani ka live reply dekhein. 👵✨");
                }}
              >
                💬 Ask Nani AI Chat Now!
              </button>
            </div>
          )}
        </div>
      )}

      {/* Handwritten Recipe Detail Sheet (Modal overlay) */}
      {activeRecipe && (
        <div style={styles.modalOverlay} className="animate-fade-in">
          <div style={styles.parchmentSheet} className="animate-slide-up">
            <span style={styles.vintageStamp}>DADIMA'S KITCHEN JOURNAL • 1968</span>
            
            <h2 className="text-serif" style={styles.modalTitle}>{activeRecipe.name}</h2>
            <span style={styles.modalRegion}>{activeRecipe.region} Cuisine • passed down orally</span>

            {/* Quick Action: Assign to Weekly Planner directly from Vault */}
            <div style={styles.assignSection}>
              {!showAssignDropdown ? (
                <button style={styles.assignTriggerBtn} onClick={() => setShowAssignDropdown(true)}>
                  📅 Assign this to your 7-Day Meal Plan
                </button>
              ) : (
                <div style={styles.assignForm} className="glass-panel">
                  <h4 style={styles.assignFormTitle}>Select Day & Meal Slot:</h4>
                  
                  <div style={styles.assignRow}>
                    <select 
                      style={styles.assignSelect} 
                      value={selectedDay} 
                      onChange={e => setSelectedDay(e.target.value)}
                    >
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>

                    <select 
                      style={styles.assignSelect} 
                      value={selectedMealSlot} 
                      onChange={e => setSelectedMealSlot(e.target.value)}
                    >
                      <option value="breakfast">🍳 Breakfast</option>
                      <option value="lunch">🍽️ Lunch</option>
                      <option value="snack">☕ Snack</option>
                      <option value="dinner">🌙 Dinner</option>
                    </select>
                  </div>

                  <div style={styles.assignFormBtns}>
                    <button style={styles.cancelAssignBtn} onClick={() => setShowAssignDropdown(false)}>
                      Cancel
                    </button>
                    <button style={styles.confirmAssignBtn} onClick={() => handleAssignToPlanner(activeRecipe)}>
                      Confirm Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalStorySection}>
              <p style={styles.storyQuote}>"{activeRecipe.story}"</p>
            </div>

            <div style={styles.recipeContent}>
              <h4 style={styles.contentTitle}>📝 Samaan (Ingredients Needed):</h4>
              <ul style={styles.ingredientsList}>
                {activeRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} style={styles.listItem}>{ing}</li>
                ))}
              </ul>

              <h4 style={{ ...styles.contentTitle, marginTop: '20px' }}>👩‍🍳 Vidhi (Cooking Steps):</h4>
              <ol style={styles.stepsList}>
                {activeRecipe.steps.map((step, idx) => (
                  <li key={idx} style={styles.listItem}>{step}</li>
                ))}
              </ol>
            </div>

            <button style={styles.closeBtn} onClick={() => {
              setActiveRecipe(null);
              setShowAssignDropdown(false);
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Handwritten Nuskhe Detail Sheet (Modal overlay) */}
      {activeNuskhe && (
        <div style={styles.modalOverlay} className="animate-fade-in">
          <div style={styles.parchmentSheet} className="animate-slide-up">
            <span style={styles.vintageStamp}>NANI'S GHARLU NUSKHA JOURNAL</span>
            
            <h2 className="text-serif" style={styles.modalTitle}>{activeNuskhe.name}</h2>
            <span style={styles.modalRegion}>{activeNuskhe.category} Remedial Drink • passed down orally</span>

            {/* Quick Action: Assign to Weekly Planner */}
            <div style={styles.assignSection}>
              {!showAssignDropdown ? (
                <button style={styles.assignTriggerBtn} onClick={() => setShowAssignDropdown(true)}>
                  Add to Planner
                </button>
              ) : (
                <div style={styles.assignForm} className="glass-panel">
                  <h4 style={styles.assignFormTitle}>Select Day & Meal Slot:</h4>
                  
                  <div style={styles.assignRow}>
                    <select 
                      style={styles.assignSelect} 
                      value={selectedDay} 
                      onChange={e => setSelectedDay(e.target.value)}
                    >
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>

                    <select 
                      style={styles.assignSelect} 
                      value={selectedMealSlot} 
                      onChange={e => setSelectedMealSlot(e.target.value)}
                    >
                      <option value="breakfast">🍳 Breakfast / Early morning</option>
                      <option value="lunch">🍽️ Lunch / Mid-day</option>
                      <option value="snack">☕ Evening tea-time</option>
                      <option value="dinner">🌙 Dinner / Night</option>
                    </select>
                  </div>

                  <div style={styles.assignFormBtns}>
                    <button style={styles.cancelAssignBtn} onClick={() => setShowAssignDropdown(false)}>
                      Cancel
                    </button>
                    <button style={styles.confirmAssignBtn} onClick={() => handleAssignToPlanner(activeNuskhe)}>
                      Confirm Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalStorySection}>
              <p style={styles.storyQuote}>"{activeNuskhe.story}"</p>
            </div>

            <div style={styles.recipeContent}>
              <p style={{ fontSize: '14px', color: '#4A2C1A', marginBottom: '16px', fontWeight: 'bold' }}>
                🎯 Therapeutic Objective: <span style={{ color: '#E8692A', fontWeight: 'normal' }}>{activeNuskhe.objective}</span>
              </p>
              <p style={{ fontSize: '14px', color: '#4A2C1A', marginBottom: '20px', fontWeight: 'bold' }}>
                ⚡ Required Equipment: <span style={{ color: '#E8692A', fontWeight: 'normal' }}>{activeNuskhe.equipment}</span>
              </p>

              <h4 style={styles.contentTitle}>📝 Ingredients Needed (Ghar Ki Rasoi Se):</h4>
              <ul style={styles.ingredientsList}>
                {activeNuskhe.ingredients.map((ing, idx) => (
                  <li key={idx} style={styles.listItem}>{ing}</li>
                ))}
              </ul>

              <h4 style={{ ...styles.contentTitle, marginTop: '20px' }}>👩‍🍳 Preparation Method (Bane Ka Tarika):</h4>
              <ol style={styles.stepsList}>
                {activeNuskhe.recipe.map((step, idx) => (
                  <li key={idx} style={styles.listItem}>{step}</li>
                ))}
              </ol>
            </div>

            <button style={styles.closeBtn} onClick={() => {
              setActiveNuskhe(null);
              setShowAssignDropdown(false);
            }}>
              Close
            </button>
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
    background: '#F9F1E5' // Rich parchment-cream background for vintage feel
  },
  subTabContainer: {
    display: 'flex',
    padding: '4px',
    borderRadius: '16px',
    background: 'rgba(74, 44, 26, 0.05)',
    marginBottom: '20px'
  },
  subTabBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s ease'
  },
  header: {
    marginBottom: '24px',
    textAlign: 'center',
    borderBottom: '1px dashed rgba(74, 44, 26, 0.2)',
    paddingBottom: '20px'
  },
  vintageTag: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#E8692A',
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '6px'
  },
  title: {
    fontSize: '32px',
    color: '#4A2C1A',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#7A5540',
    fontStyle: 'italic',
    marginTop: '4px'
  },
  regionSelector: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '12px',
    marginBottom: '20px'
  },
  regionBtn: {
    flex: '0 0 auto',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s ease'
  },
  recipeGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  recipeCard: {
    padding: '24px',
    background: '#FFFDF9', // Warm, off-white card paper
    border: '1px solid rgba(74, 44, 26, 0.12)',
    borderRadius: '20px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  recipeCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    fontWeight: '800',
    marginBottom: '8px'
  },
  heirloomStamp: {
    color: '#C4501A',
    letterSpacing: '1px'
  },
  recipeRegion: {
    color: '#4A2C1A',
    background: '#F9F1E5',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  recipeName: {
    fontSize: '22px',
    color: '#4A2C1A',
    marginBottom: '8px'
  },
  recipeStory: {
    fontSize: '13px',
    lineHeight: '1.45',
    color: '#7A5540',
    fontStyle: 'italic',
    marginBottom: '16px'
  },
  recipeFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: '700',
    color: '#4A2C1A'
  },
  viewLink: {
    color: '#E8692A'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(26, 14, 8, 0.5)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 99
  },
  parchmentSheet: {
    width: '100%',
    maxHeight: '90%',
    background: '#FCF5E9', // Deep parchment paper
    borderTopLeftRadius: '32px',
    borderTopRightRadius: '32px',
    padding: '32px',
    overflowY: 'auto',
    borderTop: '4px solid #4A2C1A',
    boxShadow: '0 -8px 32px rgba(0,0,0,0.15)',
    textAlign: 'left'
  },
  vintageStamp: {
    fontSize: '10px',
    fontWeight: '900',
    color: '#7A5540',
    border: '1px solid #7A5540',
    padding: '3px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    letterSpacing: '1.5px',
    marginBottom: '16px'
  },
  modalTitle: {
    fontSize: '30px',
    color: '#4A2C1A',
    margin: 0
  },
  modalRegion: {
    fontSize: '13px',
    color: '#C4501A',
    fontWeight: '700',
    display: 'block',
    marginTop: '4px',
    marginBottom: '20px'
  },
  assignSection: {
    marginBottom: '24px',
    borderBottom: '1px dashed rgba(74, 44, 26, 0.15)',
    paddingBottom: '16px'
  },
  assignTriggerBtn: {
    background: '#E8692A',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center'
  },
  assignForm: {
    padding: '16px',
    background: '#FFFDF9',
    borderRadius: '12px',
    border: '1px solid rgba(74, 44, 26, 0.1)'
  },
  assignFormTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#4A2C1A',
    marginBottom: '10px'
  },
  assignRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px'
  },
  assignSelect: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '13px',
    fontFamily: 'Outfit, sans-serif',
    background: '#fff'
  },
  assignFormBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  confirmAssignBtn: {
    background: '#0D6E4E',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  cancelAssignBtn: {
    background: '#F9F1E5',
    color: '#4A2C1A',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  modalStorySection: {
    borderLeft: '2px solid #E8692A',
    paddingLeft: '12px',
    marginBottom: '24px'
  },
  storyQuote: {
    fontStyle: 'italic',
    color: '#7A5540',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  recipeContent: {
    marginBottom: '28px'
  },
  contentTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#4A2C1A',
    marginBottom: '10px',
    borderBottom: '1px dashed rgba(74, 44, 26, 0.2)',
    paddingBottom: '4px'
  },
  ingredientsList: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginBottom: '20px'
  },
  stepsList: {
    paddingLeft: '20px'
  },
  listItem: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4A2C1A',
    marginBottom: '8px'
  },
  closeBtn: {
    width: '100%',
    background: '#4A2C1A',
    color: '#FDF8F2',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '16px',
    background: '#fff',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    marginBottom: '16px'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
    color: '#4A2C1A',
    background: 'transparent'
  },
  clearSearchBtn: {
    background: '#F9F1E5',
    color: '#7A5540',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  presetsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  presetBtn: {
    padding: '8px 12px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s ease'
  },
  cloudHandover: {
    padding: '32px 24px',
    background: '#FFFDF9',
    border: '2px dashed rgba(232, 105, 42, 0.3)',
    borderRadius: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '24px'
  },
  handoverActiveBtn: {
    background: 'linear-gradient(135deg, #0D6E4E 0%, #1B7A4E 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 24px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(13, 110, 78, 0.2)',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '320px'
  },
  handoverLoginBtn: {
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 24px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(232, 105, 42, 0.2)',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '320px'
  }
};
