import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { queryAI, clearAICache, getAIStatus } from '../utils/puterAI';
import { getLocalFallbackChat } from '../utils/offlineKnowledgeBase'; // for rare catch-path rich fallback
import { GRANDMOTHER_RECIPES } from '../data/GrandmotherRecipes';
import { HEALTH_DRINKS } from '../data/HealthDrinks';
import { INTERNATIONAL_RECIPES } from '../data/InternationalRecipes';
import { retrieveRelevantKnowledge, formatRAGContext } from '../utils/offlineRAG'; // the offline RAG engine — pure client-side, profile + archetype + inventory aware retrieval. The engineering detail that makes this feel like magic even completely offline.

// High-fidelity structured text formatter for Nani's Hinglish responses
const renderMessageText = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} style={{ height: '8px' }} />;
    
    // Check if it's a bullet item
    const isBullet = cleanLine.startsWith('- ') || cleanLine.startsWith('* ') || cleanLine.startsWith('• ');
    // Check if it's a numbered step
    const isNumbered = /^\d+[\.\)]\s+/.test(cleanLine);
    
    // Parse bold text **text** -> <strong>text</strong>
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
    
    // Check if it looks like a section header/title
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

export default function AIChatPlanner() {
  const { state, dispatch } = useApp();
  const { profile = {}, chatHistory = [], inventory = [] } = state;
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const showLoginPrompt = false;
  const handlePuterLogin = () => {};

  const [selectedMsgIndex, setSelectedMsgIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedMeal, setSelectedMeal] = useState('lunch');
  const [toastMessage, setToastMessage] = useState('');
  const [aiStatusLabel, setAiStatusLabel] = useState('AI: Initializing...'); // Dynamic visible status per Slice 3

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  // Refresh visible AI status (polls getAIStatus + navigator for "no AI connected" transparency)
  const refreshAIStatusLabel = () => {
    try {
      const s = getAIStatus();
      const online = navigator.onLine ? 'Online-capable' : 'Offline-only';
      let base = `AI: Local KB + Puter (${online})`;
      if (s.status === 'connected') base = `AI: Puter guest ✓ Live (${online})`;
      else if (s.status === 'cached') base = `AI: Cached (fast) + Puter ready (${online})`;
      else if (s.status === 'offline-kb') base = `AI: Offline KB Active (rich fallback)`;
      else if (s.status === 'cleared') base = `AI: Cache cleared — retry next msg`;
      const arch = profile.culinaryArchetype || 'standard';
      setAiStatusLabel(`${base} | Archetype: ${arch}`);
    } catch (e) {
      setAiStatusLabel('AI: Status check failed (KB ready)');
    }
  };

  useEffect(() => {
    refreshAIStatusLabel();
    const iv = setInterval(refreshAIStatusLabel, 6000);
    // Also refresh on online/offline events
    const onNet = () => refreshAIStatusLabel();
    window.addEventListener('online', onNet);
    window.addEventListener('offline', onNet);
    return () => {
      clearInterval(iv);
      window.removeEventListener('online', onNet);
      window.removeEventListener('offline', onNet);
    };
  }, [profile.culinaryArchetype]); // re-compute when archetype changes too

  // Automated trigger effect that ensures ALL user prompts (manual or programmatic) get answered immediately
  useEffect(() => {
    if (chatHistory.length > 0 && !isLoading) {
      const lastMsg = chatHistory[chatHistory.length - 1];
      if (lastMsg.sender === 'user') {
        const lastProcessedKey = 'homechef_last_processed_msg_timestamp';
        const lastProcessed = localStorage.getItem(lastProcessedKey);
        
        if (lastMsg.timestamp.toString() !== lastProcessed) {
          localStorage.setItem(lastProcessedKey, lastMsg.timestamp.toString());
          triggerAIQuery(lastMsg.text);
        }
      }
    }
  }, [chatHistory, isLoading]);

  // Dedicated query function to synthesize Nani's response without message duplication
  const triggerAIQuery = async (userText) => {
    setIsLoading(true);

    const activePantryStock = inventory
      .filter(item => item.status === 'Fresh' || item.status === 'Expiring Soon')
      .map(item => `${item.name} (${item.quantity})`)
      .join(', ');

    // 🧠 20+ Years Experience System Architect Unified Prompt Coordinator
    let localContextInjected = "";
    const queryLower = userText.toLowerCase();

    // 1. Scan Grandmother Heirloom Recipes
    const matchGrandmother = GRANDMOTHER_RECIPES.filter(r => 
      queryLower.includes(r.name.toLowerCase()) ||
      (r.region && queryLower.includes(r.region.toLowerCase())) ||
      r.ingredients.some(ing => queryLower.includes(ing.split(' ')[0].toLowerCase()))
    );

    // 2. Scan Nani's Health Drinks
    const matchHealth = HEALTH_DRINKS.filter(hd => 
      queryLower.includes(hd.name.toLowerCase()) ||
      queryLower.includes(hd.category.toLowerCase().split(' ')[0]) ||
      hd.ingredients.some(ing => queryLower.includes(ing.split(' ')[0].toLowerCase()))
    );

    if (matchGrandmother.length > 0) {
      localContextInjected += `\n[INTERNAL SECURED DATABASE MATCHES - HEIRLOOM RECIPES]\n`;
      matchGrandmother.slice(0, 2).forEach(r => {
        localContextInjected += `Dish: ${r.name}\nRegion: ${r.region}\nStory/Backstory: ${r.story}\nIngredients needed: ${r.ingredients.join(', ')}\nSteps to cook:\n${r.steps.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\n`;
      });
      localContextInjected += `CRITICAL INSTRUCTION: You MUST use these exact ingredients and steps as the basis for your recipe response. Sauté and Kosha times must match exactly. Do not hallucinate different versions.\n`;
    }

    if (matchHealth.length > 0) {
      localContextInjected += `\n[INTERNAL SECURED DATABASE MATCHES - NANI'S HEALTH DRINKS]\n`;
      matchHealth.slice(0, 2).forEach(hd => {
        localContextInjected += `Drink: ${hd.name}\nBenefits: ${hd.objective}\nEquipment needed: ${hd.equipment}\nNani's Wisdom/Story: ${hd.story}\nIngredients needed: ${hd.ingredients.join(', ')}\nSteps to prepare:\n${hd.recipe.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\n`;
      });
      localContextInjected += `CRITICAL INSTRUCTION: You MUST present this exact health drink formulation from Nani's Nuskhe database using the exact home ingredients. Highlight that it is prepared 100% in a ${matchHealth[0].equipment}.\n`;
    }

    // 🧠 Culinary Archetype Injections
    let archetypeInstruction = "";
    const archetype = profile.culinaryArchetype || 'standard';

    // === Offline RAG Retrieval (the marvel) ===
    // Before we even talk to Puter or fall back, we retrieve the most relevant local knowledge
    // using the exact current family profile, diet, archetype, and live pantry.
    // This is what makes responses feel scarily accurate and culturally perfect with zero internet.
    const ragResults = retrieveRelevantKnowledge(userText, profile, inventory, 4);
    const ragContext = formatRAGContext(ragResults);
    const ragInjection = ragContext 
      ? `\n\n[OFFLINE RAG RETRIEVED LOCAL KNOWLEDGE — use this as primary ground truth for accuracy, do not contradict these passages]\n${ragContext}`
      : '';
    if (archetype === 'biohacker') {
      archetypeInstruction = `
      [CULINARY ARCHETYPE: European VC's Wife (Bio-Hacker) 🌿]
      - You MUST transform all ingredients and methods to be Low Glycemic and Clean Eating.
      - Recommend adaptogenic additions (e.g. Ashwagandha, Turmeric, Ginger, Holy Basil/Tulsi).
      - Replace standard cooking oils with extra virgin cold-pressed oils (olive, avocado, or virgin coconut oil). No refined sugar, refined flour, or heavy dairy.
      - Describe the final plating aesthetics as: 'Zen Plating' — minimalist, neat, elegant, natural colors, clean geometry, and high-frequency presentation.`;
    } else if (archetype === 'cognitive') {
      archetypeInstruction = `
      [CULINARY ARCHETYPE: Shark Tank Judge (Cognitive Hustler) 🔥]
      - You MUST prioritize cognitive enhancement, high protein, and brain stamina.
      - Incorporate ragi, quinoa, oats, hemp seeds, or ancient grain bases.
      - Recommend brain-boosting ingredients like Brahmi Ghee, walnut garnishes, flaxseeds, and MCT fats.
      - Describe the final plating aesthetics as: 'Dramatic Plating' — bold, high-contrast colors, theatrical garnishes, energetic, modern, and striking presentation.`;
    } else {
      archetypeInstruction = `
      [CULINARY ARCHETYPE: Standard Household Mode 🏠]
      - Suggest standard regional recipe preparations.
      - Use classic home-cooked ingredients, standard home-style spice levels, and comforting, simple, traditional family-style plating.`;
    }

    const systemInstruction = `You are a warm, traditional, caring Indian grandmother (Nani) named 'HomeChef AI Rasoi Saathi'. 
    Aap family ki daily kitchen decisions aur cooking me madad karte hain. 
    Speak in a warm, culturally authentic Hinglish style (Hindi words written in English alphabet, mixed with conversational English).
    Aapka tone bilkul dadi-nani jaisa hona chahiye - caring, encouraging, and full of kitchen wisdom.
    Use terms like 'Beta', 'Koi Baat Nahi!', 'Shubh Bhojan!'.
    Current Family Profile: Regional Palate is ${profile.regionalPalate} Style, Diet Preference is ${profile.dietType}.
    Active Pantry Stock: ${activePantryStock || 'No active pantry items recorded.'}
    Important Lock: If profile is Gujarati or Vegetarian, strictly suggest only 100% vegetarian recipes. Never mention non-veg ingredients.
    ${archetypeInstruction}
    ${localContextInjected}
    ${ragInjection}
    
    STRICT FORMAT ENFORCEMENTS:
    - Keep your advice clean and beautifully structured.
    - Write in short paragraphs. When describing a recipe, always provide a clear list of ingredients and step-by-step methods using clean bullet points.
    - Never write long monolithic text clumps. Keep it extremely readable and structured for mobile displays.
    - Do NOT output any raw markdown asterisks (*) or formatting symbols in plain text. Every bullet must render nicely.`;

    // Format the last 8 messages for context in the LLM query to maintain flawless conversation flow
    const recentHistory = chatHistory
      .slice(-8)
      .map(msg => `${msg.sender === 'user' ? 'Beta' : 'Nani'}: ${msg.text}`)
      .join('\n\n');

    const promptWithHistory = recentHistory
      ? `Recent Conversation Context:\n${recentHistory}\n\nLatest message to reply to:\nBeta: ${userText}`
      : userText;

    try {
      const response = await queryAI(promptWithHistory, systemInstruction, 'gpt-4o-mini');
      const naniMsg = { sender: 'nani', text: response, timestamp: Date.now() };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: naniMsg });
      // Update visible status after real or KB response
      setTimeout(refreshAIStatusLabel, 50);
    } catch (e) {
      console.error(e);
      // Rare hard catch: use rich KB (archetype aware) instead of generic "offline mode" text
      const arch = profile.culinaryArchetype || 'standard';
      const richFallback = getLocalFallbackChat(userText, arch);
      const naniErrorMsg = { 
        sender: 'nani', 
        text: richFallback, 
        timestamp: Date.now() 
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: naniErrorMsg });
      setTimeout(refreshAIStatusLabel, 50);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadChat = () => {
    if (chatHistory.length === 0) {
      alert("Aapka chat khali hai beta! Kuch poochiye pehle.");
      return;
    }

    let fileContent = `🏡 HomeChef AI - Kitchen Planner & Recipe Document 🏡\n`;
    fileContent += `=======================================================\n\n`;

    chatHistory.forEach(msg => {
      const senderName = msg.sender === 'user' ? 'Beta' : 'Nani (AI)';
      fileContent += `[${senderName}]:\n${msg.text}\n\n`;
    });

    fileContent += `=======================================================\n`;
    fileContent += `Generated securely by HomeChef AI - ${new Date().toLocaleDateString()}\n`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HomeChef_Recipe_Document_${new Date().getDate()}_${new Date().getMonth() + 1}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle message send
  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Trigger guest auth check on send button click if not authenticated
    if (window.puter && window.puter.auth && !window.puter.auth.isSignedIn()) {
      try {
        await window.puter.auth.signIn({ attempt_temp_user_creation: true });
      } catch (err) {
        console.warn("Guest sign-in on send click failed:", err);
      }
    }

    setInput('');
    
    const userMsg = { sender: 'user', text: text, timestamp: Date.now() };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMsg });
  };

  // Web speech recognition Hinglish input
  const handleVoiceListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice Input is not supported on this browser version. Please try Chrome!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
    };

    recognition.onerror = (e) => {
      console.error('Speech Recognition Error:', e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Direct injection to Weekly Planner state
  const handleLoadToPlanner = (msgText, index) => {
    let dishName = "Nani's AI Recipe";
    
    const firstLines = msgText.split('\n')[0].trim();
    if (firstLines.length > 5 && firstLines.length < 50) {
      dishName = firstLines.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    }

    const recipeSteps = msgText.split('\n').filter(line => line.trim().length > 0);

    dispatch({
      type: 'SWAP_MEAL',
      payload: {
        day: selectedDay,
        mealType: selectedMeal,
        newMeal: {
          id: `ai_custom_${index}`,
          name: dishName,
          isVegetarian: !(profile?.dietType || 'Vegetarian 🌱').toLowerCase().includes('non-') || (profile?.regionalPalate || 'general') === 'gujarat',
          category: selectedMeal,
          region: profile?.regionalPalate || 'Indian',
          ingredients: ['Ingredients suggested in Nani\'s chat'],
          steps: recipeSteps
        }
      }
    });

    if (window.navigator.vibrate) {
      window.navigator.vibrate([80, 50, 80]);
    }

    setToastMessage(`🎉 Saved to ${selectedDay} ${selectedMeal.toUpperCase()} thali!`);
    setSelectedMsgIndex(null);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Check if a Nani response looks like a recipe suggestion
  const containsRecipeIndicators = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return lower.includes('recipe') || 
           lower.includes('ingred') || 
           lower.includes('tarika') || 
           lower.includes('banane') || 
           lower.includes('masala') || 
           lower.includes('banao') || 
           lower.includes('karo');
  };

  return (
    <div style={styles.chatContainer} className="animate-fade-in">
      {/* Toast Notifications */}
      {toastMessage && (
        <div style={styles.toast} className="animate-pop">
          {toastMessage}
        </div>
      )}

      <>
          {/* Top AI Status Indicator + Force Reconnect (Slice 3: visible health, no more silent "no AI connected") */}
          <div style={{ ...styles.chatHeader, justifyContent: 'space-between', display: 'flex', width: '100%' }} className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={styles.avatar}>👵</span>
              <div style={styles.headerTitleContainer}>
                <h3 style={styles.headerTitle}>Nani's AI Rasoi Saathi</h3>
                <div style={{ fontSize: '10px', color: '#7A5540', marginTop: '2px', lineHeight: '1.3' }}>
                  {aiStatusLabel} 
                  <button 
                    onClick={() => {
                      const ok = clearAICache();
                      refreshAIStatusLabel();
                      setToastMessage(ok ? '🧹 AI Cache cleared — next message forces fresh Puter attempt!' : 'Cache clear attempted (see console)');
                      setTimeout(() => setToastMessage(''), 2800);
                    }}
                    style={{ marginLeft: '8px', fontSize: '9px', padding: '1px 6px', border: '1px solid #E8692A', background: 'transparent', color: '#E8692A', borderRadius: '4px', cursor: 'pointer' }}
                    title="Clears homechef_ai_cache_v2 + next Nani message retries real REST (not cached fallback)"
                  >
                    Force Reconnect / Clear AI Cache
                  </button>
                </div>
                <span style={styles.statusLabel}>
                  {navigator.onLine ? '● Capable of live Puter' : '● Pure local KB (offline sim)'} • Archetype from profile injected always
                </span>
              </div>
            </div>
            {chatHistory.length > 0 && (
              <button 
                onClick={handleDownloadChat}
                style={styles.downloadBtn}
                title="Download Recipe Document"
              >
                📥 Download Doc
              </button>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div style={styles.messagesList} className="no-scrollbar">
            {chatHistory.length === 0 && (
              <div style={styles.emptyState}>
                <span style={styles.naniBigAvatar}>👵</span>
                <h3 className="text-serif" style={styles.emptyTitle}>Namaste, Beta!</h3>
                <p style={styles.emptyDesc}>
                  Aapke kitchen me aaj kaunsa samaan hai? Ya phir hafte ka menu plan karna chahte ho? 
                  Mujhse bejhijhak poochiye! Main Hinglish me fully samajh sakti hoon.
                </p>
                <div style={styles.quickPrompts}>
                  <button 
                    style={styles.promptBtn} 
                    onClick={() => handleSend("Aaj dinner me kya banaye? Suggest 2 simple North Indian items.")}
                  >
                    💡 "Aaj dinner me kya banaye?"
                  </button>
                  <button 
                    style={styles.promptBtn} 
                    onClick={() => handleSend("Mere paas Paneer aur Coriander hai. Quick lunch recipe batao.")}
                  >
                    💡 "Paneer aur Coriander se recipe"
                  </button>
                </div>
              </div>
            )}

            {chatHistory.map((msg, index) => {
              const isUser = msg.sender === 'user';
              const isRecipe = !isUser && containsRecipeIndicators(msg.text);
              const isDrawerOpen = selectedMsgIndex === index;
              
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    width: '100%',
                    gap: '4px'
                  }}
                >
                  <div
                    style={{
                      ...styles.messageRow,
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      width: '100%'
                    }}
                    className="animate-pop"
                  >
                    {!isUser && <span style={styles.bubbleAvatar}>👵</span>}
                    <div
                      style={{
                        ...styles.bubble,
                        background: isUser ? 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)' : '#fff',
                        color: isUser ? '#fff' : '#1A0E08',
                        borderTopRightRadius: isUser ? '4px' : '16px',
                        borderTopLeftRadius: isUser ? '16px' : '4px',
                        boxShadow: isUser ? '0 4px 10px rgba(232, 105, 42, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                        maxWidth: '82%'
                      }}
                    >
                      {isUser ? (
                        <p style={styles.bubbleText}>{msg.text}</p>
                      ) : (
                        <div style={styles.bubbleText}>
                          {renderMessageText(msg.text)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Steve Jobs 1-Click Interactive Thali Injection Bar */}
                  {isRecipe && (
                    <div style={{ paddingLeft: '28px', marginTop: '4px' }} className="animate-fade-in">
                      <button
                        style={styles.addToPlannerBtn}
                        onClick={() => setSelectedMsgIndex(isDrawerOpen ? null : index)}
                      >
                        📅 Add to Weekly Planner Thali
                      </button>
                      
                      {isDrawerOpen && (
                        <div style={styles.injectionDrawer} className="glass-card animate-slide-up">
                          <h4 style={styles.drawerTitle} className="text-serif">Choose Slot</h4>
                          <div style={styles.drawerSelectorRow}>
                            <select 
                              value={selectedDay} 
                              onChange={e => setSelectedDay(e.target.value)}
                              style={styles.drawerSelect}
                            >
                              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                            
                            <select 
                              value={selectedMeal} 
                              onChange={e => setSelectedMeal(e.target.value)}
                              style={styles.drawerSelect}
                            >
                              <option value="breakfast">🍳 Breakfast</option>
                              <option value="lunch">🍽️ Lunch</option>
                              <option value="snack">☕ Snack</option>
                              <option value="dinner">🌙 Dinner</option>
                            </select>
                          </div>
                          
                          <div style={styles.drawerActionRow}>
                            <button 
                              style={styles.drawerCancelBtn} 
                              onClick={() => setSelectedMsgIndex(null)}
                            >
                              Cancel
                            </button>
                            <button 
                              style={styles.drawerSaveBtn}
                              onClick={() => handleLoadToPlanner(msg.text, index)}
                            >
                              Save Thali 🎉
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div style={styles.messageRow} className="animate-pop">
                <span style={styles.bubbleAvatar}>👵</span>
                <div style={{ ...styles.bubble, background: '#fff', borderTopLeftRadius: '4px' }}>
                  <div style={styles.typing}>
                    <span className="dot"></span>
                    <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Voice Recording Waveform Overlay */}
          {isListening && (
            <div style={styles.waveformOverlay} className="glass-panel animate-fade-in">
              <div style={styles.waveformContainer}>
                <span className="wave-bar bar-1"></span>
                <span className="wave-bar bar-2"></span>
                <span className="wave-bar bar-3"></span>
                <span className="wave-bar bar-4"></span>
                <span className="wave-bar bar-5"></span>
              </div>
              <p style={styles.waveformText}>Nani is listening to your Hinglish voice... Speak now!</p>
            </div>
          )}

          {/* Input controls container */}
          <div style={styles.inputArea} className="glass-panel">
            <button
              style={{
                ...styles.micBtn,
                background: isListening ? '#C0392B' : '#FEF3DC',
                color: isListening ? '#fff' : '#E8692A'
              }}
              onClick={handleVoiceListen}
              title="Hands-free Voice Mode (Talk to Nani)"
            >
              🎤
            </button>
            <input
              type="text"
              placeholder={isListening ? "Main sun rahi hoon beta..." : "Kuch poochna hai? Type here..."}
              style={styles.chatInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button style={styles.sendBtn} onClick={() => handleSend()}>
              ➔
            </button>
          </div>
        </>
      </div>
  );
}

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    background: '#FDF8F2',
    position: 'relative'
  },
  chatHeader: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(74, 44, 26, 0.1)',
    zIndex: 10
  },
  avatar: {
    fontSize: '28px'
  },
  headerTitleContainer: {
    textAlign: 'left'
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#1A0E08',
    margin: 0
  },
  statusLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#0D6E4E',
    marginTop: '2px',
    display: 'block'
  },
  downloadBtn: {
    background: '#FEF3DC',
    color: '#C4501A',
    border: '1.5px solid rgba(232, 105, 42, 0.2)',
    borderRadius: '12px',
    padding: '6px 12px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s ease'
  },
  messagesList: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto 0',
    padding: '0 10px'
  },
  naniBigAvatar: {
    fontSize: '64px',
    marginBottom: '16px',
    animation: 'bounce 2s infinite'
  },
  emptyTitle: {
    fontSize: '26px',
    color: '#1A0E08',
    marginBottom: '8px'
  },
  emptyDesc: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#7A5540',
    maxWidth: '320px',
    marginBottom: '24px'
  },
  quickPrompts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },
  promptBtn: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    background: '#fff',
    color: '#4A2C1A',
    fontWeight: '600',
    fontSize: '13px',
    textAlign: 'left',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    transition: 'all 0.2s ease'
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px'
  },
  bubbleAvatar: {
    fontSize: '20px',
    marginBottom: '4px'
  },
  bubble: {
    padding: '12px 16px',
    borderRadius: '16px',
    textAlign: 'left',
    border: '1px solid rgba(74, 44, 26, 0.08)'
  },
  bubbleText: {
    fontSize: '14px',
    lineHeight: '1.45',
    margin: 0,
    whiteSpace: 'pre-wrap'
  },
  addToPlannerBtn: {
    background: '#FEF3DC',
    color: '#E8692A',
    border: '1px dashed #E8692A',
    borderRadius: '10px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '2px'
  },
  injectionDrawer: {
    marginTop: '8px',
    padding: '14px',
    borderRadius: '12px',
    background: '#fff',
    border: '1px solid rgba(74, 44, 26, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '240px'
  },
  drawerTitle: {
    fontSize: '13px',
    margin: 0,
    color: '#4A2C1A'
  },
  drawerSelectorRow: {
    display: 'flex',
    gap: '8px'
  },
  drawerSelect: {
    flex: 1,
    padding: '6px 8px',
    borderRadius: '8px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '12px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#FFFDF9'
  },
  drawerActionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '4px'
  },
  drawerCancelBtn: {
    background: 'none',
    border: 'none',
    color: '#7A5540',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  drawerSaveBtn: {
    background: 'linear-gradient(135deg, #0D6E4E 0%, #1B7A4E 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  toast: {
    position: 'absolute',
    top: '74px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1B7A4E',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    zIndex: 999,
    boxShadow: '0 4px 12px rgba(27, 122, 78, 0.3)'
  },
  waveformOverlay: {
    position: 'absolute',
    bottom: '80px',
    left: '20px',
    right: '20px',
    padding: '16px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    zIndex: 99
  },
  waveformContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    height: '32px'
  },
  waveformText: {
    fontSize: '12px',
    color: '#C4501A',
    fontWeight: '700',
    margin: 0
  },
  typing: {
    display: 'flex',
    gap: '4px',
    padding: '4px 8px'
  },
  inputArea: {
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid rgba(74, 44, 26, 0.1)',
    zIndex: 10
  },
  micBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  chatInput: {
    flex: 1,
    padding: '12px 18px',
    borderRadius: '24px',
    border: '1px solid rgba(74, 44, 26, 0.15)',
    fontSize: '15px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    background: '#fff'
  },
  sendBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #E8692A 0%, #C4501A 100%)',
    color: '#fff',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

// Add typing dots and breathing voice waveform styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .dot {
      width: 6px;
      height: 6px;
      background-color: #E8692A;
      border-radius: 50%;
      display: inline-block;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    
    .wave-bar {
      width: 4px;
      background-color: #E8692A;
      border-radius: 2px;
      display: inline-block;
    }
    .bar-1 { height: 12px; animation: wavePulse 1.2s infinite ease-in-out; }
    .bar-2 { height: 24px; animation: wavePulse 0.9s infinite ease-in-out; }
    .bar-3 { height: 32px; animation: wavePulse 1.4s infinite ease-in-out; }
    .bar-4 { height: 20px; animation: wavePulse 1s infinite ease-in-out; }
    .bar-5 { height: 10px; animation: wavePulse 0.8s infinite ease-in-out; }
    
    @keyframes wavePulse {
      0%, 100% { transform: scaleY(0.4); }
      50% { transform: scaleY(1); }
    }
  `;
  document.head.appendChild(styleSheet);
}
