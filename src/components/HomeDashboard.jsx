import React from 'react';
import { RefreshCw, Clock, ChefHat, CheckCircle2, AlertTriangle, Sparkles, ShieldAlert, Heart, HelpCircle, ArrowRight } from 'lucide-react';

export default function HomeDashboard({ 
  profile, 
  familyMembers, 
  mealPlan, 
  onSwapMeal,
  menuLocked,
  menuRejected,
  onAcceptMenu,
  onRejectMenu,
  onSwitchTab,
  onOpenThaliMap
}) {
  // Dynamic day calculation - show today's meals; fallback to first available day
  const today = new Date();
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const todayAbbr = dayNames[today.getDay()];
  const todayDate = today.getDate();
  const todayKey = `${todayAbbr} ${todayDate}`; // e.g. "WED 27"
  const todayFullName = today.toLocaleDateString('en-IN', { weekday: 'long' }); // e.g. "Wednesday"
  const todayDateLabel = today.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }); // e.g. "Wednesday, May 27"

  // Try to find today's meals; fallback to any available day in the plan
  let activeDayMeals = mealPlan.filter(meal => meal.dayOfWeek === todayKey);
  let activeDayLabel = todayFullName;
  
  if (activeDayMeals.length === 0 && mealPlan.length > 0) {
    // Fallback: show meals for the first day in the plan
    const firstDay = mealPlan[0].dayOfWeek;
    activeDayMeals = mealPlan.filter(meal => meal.dayOfWeek === firstDay);
    activeDayLabel = firstDay; // e.g. "MON 25"
  }

  return (
    <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      
      {/* Transient 'Koi Baat Nahi' Transition Popup Banner Overlay */}
      {menuRejected && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 26, 17, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500,
          padding: '20px'
        }}>
          <div className="warm-card fade-in-slide" style={{
            maxWidth: '340px',
            padding: '24px',
            textAlign: 'center',
            backgroundColor: 'var(--primary-saffron)',
            color: '#FFFFFF',
            border: 'none',
            boxShadow: 'var(--shadow-hover)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ChefHat size={32} style={{ color: '#FFFFFF' }} />
            </div>
            
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', marginBottom: '8px' }}>
              Koi Baat Nahi! 🍳
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '18px', fontWeight: 500 }}>
              Let's ask our AI Chef to create a special customized menu today! Switching to Chat now...
            </p>
          </div>
        </div>
      )}

      {/* Warm Personalized Greetings Box */}
      <div style={{
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, var(--primary-saffron) 0%, #BA4A00 100%)',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-hover)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background decoration */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.06)'
        }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--secondary-turmeric)' }} />
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            RASOI SAATHI IS ACTIVE
          </span>
        </div>
        
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', lineHeight: '28px', marginBottom: '6px' }}>
          Namaste {profile.familyName ? `${profile.familyName} Family` : 'Aapki Rasoi'}! 🏡
        </h3>
        <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '18px', fontWeight: 500 }}>
          Food Plan for <strong>{todayDateLabel}</strong>. Let's make healthy <strong>{profile.regionalPalate} style</strong> meals tailored to your joint family preferences!
        </p>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '4px', fontWeight: 700 }}>
            {profile.familySize} Members
          </span>
          <span style={{ fontSize: '11px', padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '4px', fontWeight: 700 }}>
            {profile.regionalPalate} Taste
          </span>
          <span style={{ fontSize: '11px', padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '4px', fontWeight: 700 }}>
            {profile.specialOccasion !== 'No Preference' ? profile.specialOccasion : 'Normal Diet'}
          </span>
        </div>
      </div>

      {/* Great Indian Thali Map Banner Card */}
      <div 
        onClick={onOpenThaliMap}
        className="recipe-card-premium fade-in-slide"
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #2C1A11 0%, #1A0D07 100%)',
          color: '#FFFFFF',
          border: '1.5px solid var(--primary-saffron)',
          boxShadow: 'var(--shadow-hover)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'var(--transition-cozy)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: 'rgba(211, 84, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={20} style={{ color: 'var(--primary-saffron)' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Explore Great Indian Thali 🗺️
            </h4>
            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px', margin: 0 }}>
              Taste one viral dish from all 28 States & 8 UTs!
            </p>
          </div>
        </div>
        <ArrowRight size={18} style={{ color: 'var(--primary-saffron)' }} />
      </div>

      {/* Celebrate Locked Ribbon Badge */}
      {menuLocked && (
        <div className="fade-in-slide" style={{
          backgroundColor: 'var(--accent-coriander-light)',
          border: '1.5px solid var(--accent-coriander)',
          borderRadius: '12px',
          padding: '12px 16px',
          color: 'var(--accent-coriander)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--shadow-warm)'
        }}>
          <CheckCircle2 size={20} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>Menu Locked for {activeDayLabel}!</span>
            <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: 600 }}>Cooks are notified & stock is verified. Shubh Bhojan! 🍳</span>
          </div>
        </div>
      )}

      {/* Household Summary - Active Restrictions Panel */}
      <div className="warm-card" style={{ padding: '14px 16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Heart size={18} style={{ color: 'var(--primary-saffron)' }} />
          Family Profiles & Health Protections
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {familyMembers.map(member => (
            <div 
              key={member.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--bg-warm)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: member.restrictions ? '3px solid var(--accent-tomato)' : '3px solid var(--accent-coriander)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-masala)' }}>
                  {member.name} ({member.ageGroup})
                </span>
              </div>
              
              <span style={{ fontSize: '11px', fontWeight: 700, color: member.restrictions ? 'var(--accent-tomato)' : 'var(--text-muted)' }}>
                {member.restrictions ? `Avoids ${member.restrictions}` : 'No constraints'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Meal Schedule */}
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-masala)', marginBottom: '12px' }}>
          {activeDayLabel}'s Menu Selection
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeDayMeals.length > 0 ? (
            activeDayMeals.map(meal => {
              const hasMissing = meal.ingredientStatus !== 'All at home';
              
              // safety allergen auditor
              const matchedAllergenRestrictions = [];
              familyMembers.forEach(member => {
                if (member.restrictions && member.restrictions.trim() !== '') {
                  const restWords = member.restrictions.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 2);
                  restWords.forEach(word => {
                    if (meal.title.toLowerCase().includes(word) || meal.description.toLowerCase().includes(word)) {
                      matchedAllergenRestrictions.push(`${member.name} (${member.restrictions})`);
                    }
                  });
                }
              });

              return (
                <div 
                  key={meal.id} 
                  className="warm-card" 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '16px',
                    position: 'relative'
                  }}
                >
                  {matchedAllergenRestrictions.length > 0 && (
                    <div style={{
                      backgroundColor: 'var(--accent-tomato-light)',
                      border: '1px solid var(--accent-tomato)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--accent-tomato)',
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '2px'
                    }}>
                      <ShieldAlert size={14} />
                      <span>Allergen Warning: Contains items {matchedAllergenRestrictions.join(', ')}</span>
                    </div>
                  )}
                  {/* Top Badge Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--primary-saffron)',
                      letterSpacing: '1px'
                    }}>
                      {meal.mealType}
                    </span>
                    
                    {meal.tag && (
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        backgroundColor: 'var(--pill-soft)',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        color: 'var(--text-muted)'
                      }}>
                        {meal.tag}
                      </span>
                    )}
                  </div>

                  {/* Meal Details */}
                  <div>
                    <h5 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-masala)', marginBottom: '4px' }}>
                      {meal.title}
                    </h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '18px' }}>
                      {meal.description}
                    </p>
                  </div>

                  {/* Info row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-sand)',
                    marginTop: '4px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>
                        <Clock size={14} />
                        {meal.cookTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>
                        <ChefHat size={14} />
                        {meal.complexity}
                      </span>
                    </div>

                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: hasMissing ? 'var(--accent-tomato)' : 'var(--accent-coriander)'
                    }}>
                      {hasMissing ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                      {meal.ingredientStatus}
                    </span>
                  </div>

                  {/* Swap Button - Only show if not locked */}
                  {!menuLocked && (
                    <button 
                      onClick={() => onSwapMeal(meal.id)}
                      style={{
                        backgroundColor: 'var(--pill-soft)',
                        border: '1px solid var(--border-sand)',
                        color: 'var(--text-masala)',
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        width: '100%',
                        marginTop: '8px',
                        transition: 'var(--transition-cozy)'
                      }}
                    >
                      <RefreshCw size={13} />
                      Swap recipe
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="warm-card fade-in-slide" style={{
              padding: '30px 20px',
              textAlign: 'center',
              border: '2px dashed var(--border-sand)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF'
            }}>
              <ChefHat size={40} style={{ color: 'var(--primary-saffron)' }} />
              <h5 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)' }}>
                No active meal plan for today
              </h5>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '18px', maxWidth: '280px' }}>
                Aapne abhi tak aaj ke liye menu decide nahi kiya hai. Apne AI Chef se realtime chat karke customized zero-waste menu banayein!
              </p>
              <button 
                onClick={() => {
                  if (onSwitchTab) {
                    onSwitchTab('chat');
                  }
                }}
                className="btn-primary"
                style={{ width: 'auto', padding: '10px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Sparkles size={14} />
                Plan Menu with Chatbot
              </button>
            </div>
          )}
        </div>
      </div>

      {/* V2 Dynamic Decision CTA Buttons Block */}
      {!menuLocked && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '10px',
          marginBottom: '20px'
        }}>
          <button 
            onClick={onAcceptMenu}
            className="btn-primary"
            style={{
              padding: '14px',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--accent-coriander)',
              boxShadow: '0 4px 14px rgba(39, 174, 96, 0.3)'
            }}
          >
            <CheckCircle2 size={18} />
            Accept & Start Cooking
          </button>
          
          <button 
            onClick={onRejectMenu}
            className="btn-secondary"
            style={{
              padding: '12px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Reject & Ask AI Chef
            <ArrowRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
