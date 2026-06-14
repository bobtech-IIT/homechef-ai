import React, { useState } from 'react';
import { X, Search, Sparkles, MapPin, ChefHat, Compass } from 'lucide-react';
import { queryAI } from '../utils/puterAI';

export const THALI_DATA = {
  // States (28)
  "Andhra Pradesh": { dish: "Gongura Mutton", tags: ["🔥 SPICY", "MEAT"], desc: "Fiery, tangy prawns or goat meat simmered in sour sorrel leaves (gongura) and Guntur capsaicin. A true Andhra spice bomb." },
  "Arunachal Pradesh": { dish: "Bamboo Shoot Fry & Thukpa", tags: ["🥣 COMFORT", "VEG"], desc: "Comforting, warm noodle soup cooked with fresh local bamboo shoot strips, ginger, and wild herbs, served in mountain wood bowls." },
  "Assam": { dish: "Masor Tenga", tags: ["🐟 SEAFOOD", "TANGY"], desc: "Light, refreshing river fish curry flavored with sour elephant apple (outenga) or lemon, tempered with mustard oil." },
  "Bihar": { dish: "Litti Chokha", tags: ["🌾 ANCIENT GRAIN", "VEG"], desc: "Smoky roasted whole wheat balls stuffed with spiced gram flour (sattu), dipped in pure liquid cow ghee, served with roasted eggplant mash (chokha)." },
  "Chhattisgarh": { dish: "Farra", tags: ["🌱 LIGHT", "VEG"], desc: "Lightly tempered steamed rice flour cylinders cooked with fresh coriander, sesame, and mustard seeds. Simple comfort." },
  "Goa": { dish: "Goan Fish Curry", tags: ["🐟 SEAFOOD", "COCONUT"], desc: "Fresh kingfish simmered in a creamy, tangy coconut milk gravy infused with local tefla berries and dried red chilies." },
  "Gujarat": { dish: "Khaman Dhokla", tags: ["🌱 STEAMED", "VEG"], desc: "Spongy, juicy steamed gram flour cakes tempered with mustard seeds, served with crispy chickpea crackers and fried chilies." },
  "Haryana": { dish: "Bajre ki Khichdi", tags: ["🥛 DAIRY RICH", "VEG"], desc: "Slow-cooked pearl millet porridge loaded with hand-churned white butter and served alongside warm lassi." },
  "Himachal Pradesh": { dish: "Siddu", tags: ["🍞 STUFFED BREAD", "VEG"], desc: "Soft, fluffy yeast bread stuffed with a rich paste of walnuts, poppy seeds, and green chilies, served with warm ghee." },
  "Jharkhand": { dish: "Dhuska & Aloo Dum", tags: ["⚡ DEEP FRIED", "VEG"], desc: "Deep-fried golden pancakes made of rice and lentil batter, served with spicy, thick potato-chickpea curry." },
  "Karnataka": { dish: "Mysore Masala Dosa", tags: ["🥞 CRISPY", "VEG"], desc: "Crispy, golden rice-lentil crepe lined with fiery red garlic-chili chutney, stuffed with spiced potato mash and butter." },
  "Kerala": { dish: "Avial & Malabar Parotta", tags: ["🥥 COCONUT", "VEG"], desc: "Layered flaky parotta paired with aromatic mixed vegetable stew cooked in raw coconut oil and curd." },
  "Madhya Pradesh": { dish: "Indori Poha Jalebi", tags: ["☕ BREAKFAST", "SWEET-SAVORY"], desc: "Light, turmeric-tinted flattened rice seasoned with secret Jeeravan masala and crunchy sev, paired with hot crispy jalebis." },
  "Maharashtra": { dish: "Nashik & Kolhapuri Misal Pav", tags: ["🔥 SPICY FEAST", "VEG"], desc: "A legendary fiery curry of sprouted moth beans topped with farsan, onions, and lemon. Whether you prefer the dark, smoky wood-fired kala rassa of Nashik or the red Guntur-chili heat of Kolhapur, it is Maharashtra's identity in a bowl." },
  "Manipur": { dish: "Eromba & Kangshoi", tags: ["🌱 HEALTHY", "OIL FREE"], desc: "A healthy, oil-free mashed stew of boiled vegetables, red chilies, and fermented fish (ngari), packed with intense umami." },
  "Meghalaya": { dish: "Jadoh", tags: ["🌾 RED RICE", "MEAT"], desc: "Aromatic red hill rice cooked with tender pork chunks, black pepper, ginger, and bay leaves, a staple festival delicacy." },
  "Mizoram": { dish: "Vawksa Rep", tags: ["🔥 SMOKY", "MEAT"], desc: "Juicy chunks of smoked pork stir-fried with mustard leaves, green chilies, and wild garlic shoots. Pure earthy flavors." },
  "Nagaland": { dish: "Smoked Pork with Axone", tags: ["🔥 INTENSE", "MEAT"], desc: "Rich smoked pork cooked slowly with fermented soybean paste (axone), dried red chilies, and local Naga bamboo shoots." },
  "Odisha": { dish: "Dalma & Chena Poda", tags: ["🥞 DESSERT-FEAST", "VEG"], desc: "Roasted split peas slow-cooked with pumpkin, plantain, and raw papaya, paired with India's first cheese dessert—baked cardamom chena cake." },
  "Punjab": { dish: "Sarson ka Saag & Makki di Roti", tags: ["🥛 GHEE RICH", "VEG"], desc: "Thick, creamy mustard greens slow-cooked in clay pots, topped with grass-fed yellow butter, served with flat cornmeal bread." },
  "Rajasthan": { dish: "Dal Baati Churma", tags: ["🥛 GHEE LOADED", "VEG"], desc: "Hard baked wheat balls cooked over open fire, crushed and soaked in pure ghee, served with mixed lentils and sweet wheat dust." },
  "Sikkim": { dish: "Sikkimese Momos", tags: ["🌱 STEAMED", "VEG"], desc: "Thin-wrapper steamed dumplings stuffed with juicy minced vegetables and ginger, served with fire-roasted red chili sauce." },
  "Tamil Nadu": { dish: "Chettinad Chicken", tags: ["🔥 VOLCANIC SPICE", "MEAT"], desc: "Tender chicken cooked in a highly complex gravy of 18 freshly ground roasted spices, star anise, and stone flower." },
  "Telangana": { dish: "Hyderabadi Haleem", tags: ["🧠 COGNITIVE FUEL", "MEAT"], desc: "Slow-cooked meat and broken wheat mashed with ghee and spices for 12 hours, a rich culinary triumph." },
  "Tripura": { dish: "Mui Borok", tags: ["🌱 OIL FREE", "HEALTHY"], desc: "Organic boiled stew of local vegetables cooked with dry fermented fish, green chilies, and fresh herbs without oil." },
  "Uttar Pradesh": { dish: "Tunday Kababi & Sheermal", tags: ["👑 ROYAL FEAST", "MEAT"], desc: "Mouth-melting minced lamb patties seasoned with 160 secret spices, paired with saffron-infused sweet flatbread." },
  "Uttarakhand": { dish: "Kafuli", tags: ["🟢 GREEN SPECIAL", "VEG"], desc: "Thick gravy of pureed mountain spinach and fenugreek leaves, thickened with rice paste, served with mustard potatoes." },
  "West Bengal": { dish: "Shorshe Ilish & Kosha Mangsho", tags: ["👑 BENGALI CLASSIC", "FISH/MEAT"], desc: "Hilsa fish steaks simmered in pungent mustard oil and green chili paste, paired with dark, slow-braised caramelized mutton curry." },

  // Union Territories (8)
  "Andaman and Nicobar Islands": { dish: "Coconut Prawn Curry", tags: ["🐟 SEAFOOD", "COCONUT"], desc: "Fresh prawns simmered in sweet, aromatic coconut milk paste infused with turmeric, mustard seeds, and fresh curry leaves." },
  "Chandigarh": { dish: "Amritsari Kulcha", tags: ["🥞 CRISPY", "BUTTER LOADED"], desc: "Crispy, layered clay-oven flatbread stuffed with spiced potatoes and cauliflower, crushed by hand and loaded with fresh butter." },
  "Dadra and Nagar Haveli and Daman and Diu": { dish: "Ubadiyu", tags: ["🍲 CLAY POT", "VEG"], desc: "Seasonal vegetables marinated in wild green garlic herbs, baked upside-down in clay pots buried in hot charcoal." },
  "Delhi (NCT)": { dish: "Chole Bhature & Butter Chicken", tags: ["👑 METROPOLITAN", "VEG/MEAT"], desc: "Spiced chickpeas served with puffed hot deep-fried flour bread, or charcoal-grilled chicken in velvety tomato-cashew butter cream." },
  "Jammu and Kashmir": { dish: "Kashmiri Rogan Josh", tags: ["👑 ROYAL FEAST", "MEAT"], desc: "Tender lamb cooked in a rich red gravy colored with dry cockscomb flowers (mawal) and Kashmiri chilies, served with saffron tea." },
  "Ladakh": { dish: "Skyu (Ladakhi Pasta Stew)", tags: ["🥣 MOUNTAIN COMFORT", "VEG/MEAT"], desc: "Comforting wheat dough pasta thumb-prints boiled slowly with root vegetables, mutton chunks, and local wild caraway seeds." },
  "Lakshadweep": { dish: "Tuna Kavaratti Curry", tags: ["🐟 SEAFOOD", "TANGY"], desc: "Freshly caught bonito tuna chunks cooked in a rich, tangy coconut paste seasoned with kokum and dried red chilies." },
  "Puducherry": { dish: "Kadugu Yera", tags: ["🥖 FUSION", "SEAFOOD"], desc: "Pondicherry prawns cooked in a French-Tamil fusion yellow mustard seed paste, coconut milk, and green chilies." }
};

const ZONES = {
  "North India 🏔️": ["Punjab", "Haryana", "Himachal Pradesh", "Uttar Pradesh", "Uttarakhand", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Delhi (NCT)"],
  "West India 🏜️": ["Maharashtra", "Gujarat", "Goa", "Rajasthan", "Dadra and Nagar Haveli and Daman and Diu"],
  "South India 🌴": ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana", "Puducherry", "Lakshadweep"],
  "East India 🌾": ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Andaman and Nicobar Islands"],
  "Central India 🐅": ["Chhattisgarh", "Madhya Pradesh"],
  "Northeast India 🎋": ["Assam", "Arunachal Pradesh", "Sikkim", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura"]
};

// Relative coordinate mapping for geographical schematic positioning
const ZONE_POSITIONS = {
  "North India 🏔️": { top: '15%', left: '42%' },
  "Northeast India 🎋": { top: '32%', left: '84%' },
  "West India 🏜️": { top: '48%', left: '16%' },
  "Central India 🐅": { top: '47%', left: '48%' },
  "East India 🌾": { top: '48%', left: '72%' },
  "South India 🌴": { top: '78%', left: '44%' }
};

const ZONE_ZOOMS = {
  "North India 🏔️": { scale: 2.2, x: 5, y: 30 },
  "West India 🏜️": { scale: 2.2, x: 30, y: 2 },
  "South India 🌴": { scale: 1.9, x: 5, y: -25 },
  "East India 🌾": { scale: 2.0, x: -22, y: -2 },
  "Central India 🐅": { scale: 2.2, x: -2, y: 2 },
  "Northeast India 🎋": { scale: 2.3, x: -38, y: 15 }
};

const STATE_COORDINATES = {
  // North India
  "Punjab": { top: '22%', left: '36%' },
  "Haryana": { top: '26%', left: '38%' },
  "Himachal Pradesh": { top: '16%', left: '42%' },
  "Uttar Pradesh": { top: '34%', left: '50%' },
  "Uttarakhand": { top: '20%', left: '48%' },
  "Jammu and Kashmir": { top: '10%', left: '40%' },
  "Ladakh": { top: '8%', left: '48%' },
  "Chandigarh": { top: '20%', left: '38%' },
  "Delhi (NCT)": { top: '28%', left: '41%' },
  
  // West India
  "Maharashtra": { top: '56%', left: '30%' },
  "Gujarat": { top: '44%', left: '18%' },
  "Goa": { top: '65%', left: '26%' },
  "Rajasthan": { top: '34%', left: '26%' },
  "Dadra and Nagar Haveli and Daman and Diu": { top: '50%', left: '20%' },

  // South India
  "Tamil Nadu": { top: '82%', left: '44%' },
  "Karnataka": { top: '72%', left: '32%' },
  "Kerala": { top: '84%', left: '36%' },
  "Andhra Pradesh": { top: '68%', left: '48%' },
  "Telangana": { top: '62%', left: '45%' },
  "Puducherry": { top: '78%', left: '47%' },
  "Lakshadweep": { top: '86%', left: '22%' },

  // East India
  "West Bengal": { top: '45%', left: '70%' },
  "Odisha": { top: '52%', left: '62%' },
  "Bihar": { top: '38%', left: '66%' },
  "Jharkhand": { top: '44%', left: '64%' },
  "Andaman and Nicobar Islands": { top: '85%', left: '82%' },

  // Central India
  "Chhattisgarh": { top: '50%', left: '54%' },
  "Madhya Pradesh": { top: '44%', left: '44%' },

  // Northeast India
  "Assam": { top: '28%', left: '86%' },
  "Arunachal Pradesh": { top: '22%', left: '92%' },
  "Sikkim": { top: '28%', left: '72%' },
  "Manipur": { top: '34%', left: '92%' },
  "Meghalaya": { top: '32%', left: '80%' },
  "Mizoram": { top: '38%', left: '90%' },
  "Nagaland": { top: '28%', left: '94%' },
  "Tripura": { top: '36%', left: '86%' }
};export default function IndianThaliMap({ onClose, onSelectRecipe }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isUpdatingDish, setIsUpdatingDish] = useState(false);

  // Load and merge dynamic thali dishes from localStorage
  const [thaliData, setThaliData] = useState(() => {
    try {
      const saved = localStorage.getItem('homechef_dynamic_thali_data');
      if (saved) {
        return { ...THALI_DATA, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load dynamic thali data:', e);
    }
    return THALI_DATA;
  });

  const fetchLiveDish = async (stateName) => {
    setIsUpdatingDish(true);
    const prompt = `Identify the single most iconic, authentic traditional famous dish of the Indian state/UT "${stateName}".
    Return ONLY a raw JSON block with this exact format:
    {
      "dish": "Dish Name",
      "tags": ["TAG1", "TAG2"],
      "desc": "Short 1-2 sentence description of why it is iconic and how it tastes."
    }
    Do not output any markdown code blocks, backticks, or explanation. Just the raw JSON.`;

    try {
      const response = await queryAI(prompt, "You are a helpful culinary researcher who returns pure JSON.");
      let cleanText = response.trim();
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      const parsed = JSON.parse(cleanText);
      if (parsed && parsed.dish && parsed.desc) {
        const updated = {
          ...thaliData,
          [stateName]: {
            dish: parsed.dish,
            tags: (parsed.tags || ["FAMOUS", "TRADITIONAL"]).map(t => t.toUpperCase()),
            desc: parsed.desc
          }
        };
        setThaliData(updated);
        localStorage.setItem('homechef_dynamic_thali_data', JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Failed to fetch dynamic dish for', stateName, e);
    } finally {
      setIsUpdatingDish(false);
    }
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    setIsZoomed(true);
    // Fetch live famous dish dynamically when selected
    fetchLiveDish(stateName);
  };
  const handleBackToMap = () => {
    setIsZoomed(false);
    setTimeout(() => setSelectedState(null), 300);
  };

  const handleHungryClick = () => {
    if (selectedState) {
      const data = thaliData[selectedState];
      onSelectRecipe(data.dish);
      onClose();
    }
  };

  // Filter states based on search query
  const filteredStates = Object.keys(thaliData).filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thaliData[state].dish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic Map Transform calculation
  let mapTransform = 'scale(1) translate(0, 0)';
  if (selectedState) {
    const pos = STATE_COORDINATES[selectedState];
    if (pos) {
      const x = 50 - parseFloat(pos.left);
      const y = 50 - parseFloat(pos.top);
      mapTransform = `scale(2.5) translate(${x}%, ${y}%)`;
    }
  } else if (activeZone) {
    mapTransform = `scale(${ZONE_ZOOMS[activeZone].scale}) translate(${ZONE_ZOOMS[activeZone].x}%, ${ZONE_ZOOMS[activeZone].y}%)`;
  }

  return (
    <div style={styles.fullscreenOverlay}>
      <style>{`
        /* DEFENSIVE: Force critical saffron/cream contrast vars even if index.css or theme fails to load */
        :root, :host {
          --hc-saffron: #E8692A !important;
          --hc-saffron-dark: #C4501A !important;
          --hc-turmeric: #F5A623 !important;
          --hc-cream: #FDF8F2 !important;
        }
        @keyframes pulsePin {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(232, 105, 42, 0.7);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 12px rgba(232, 105, 42, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(232, 105, 42, 0);
          }
        }
        @keyframes bouncePin {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .pulse-effect {
          animation: pulsePin 2s infinite ease-in-out !important;
          background-color: #E8692A !important;
        }
        .bounce-pin {
          animation: bouncePin 1.5s infinite ease-in-out !important;
        }
        .animate-spin-slow {
          animation: spinMap 15s linear infinite;
        }
        @keyframes spinMap {
          100% { transform: rotate(360deg); }
        }
        /* Force map elements visible + high saffron contrast on dark canvas (cream theme safe) */
        .zone-pin-label, .state-pin-label { color: #fff !important; border-color: #E8692A !important; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Compass className="animate-spin-slow" size={24} style={{ color: '#E8692A' }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.5px', margin: 0 }}>
              Thali Map
            </h3>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>
              36 REGIONS • ARCHETYPE TRANSFORM
            </span>
          </div>
        </div>
        <button onClick={onClose} style={styles.closeHeaderBtn}>
          <X size={18} />
        </button>
      </div>

      {/* Main Container */}
      <div style={styles.bodyContent}>
        {/* Map Canvas - Always visible! */}
        <div style={styles.mapCanvas}>
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            transformOrigin: 'center center',
            transform: mapTransform
          }}>
            {/* Stylized background outline map of India - Saffron glow! (defensive explicit colors for visibility even if CSS vars missing) */}
            <svg viewBox="0 0 100 100" style={styles.indiaSilhouette}>
              <polygon 
                points="45,5 50,8 50,15 54,20 62,28 70,27 74,28 90,24 92,34 88,42 78,42 72,46 64,55 56,68 50,84 47,92 42,82 36,70 32,62 30,56 14,46 12,40 22,30 30,20 38,12" 
                style={{ 
                  fill: 'rgba(232, 105, 42, 0.18)', 
                  stroke: '#E8692A', 
                  strokeWidth: '1.1',
                  filter: 'drop-shadow(0 0 10px rgba(232, 105, 42, 0.5))',
                  strokeDasharray: '2, 1'
                }} 
              />
            </svg>

            {/* Visual grid constellation lines */}
            {!selectedState && (
              <svg style={styles.mapLinesSvg}>
                <line x1="42%" y1="15%" x2="16%" y2="48%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="42%" y1="15%" x2="48%" y2="47%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="42%" y1="15%" x2="84%" y2="32%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="16%" y1="48%" x2="48%" y2="47%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="48%" y1="47%" x2="72%" y2="48%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="72%" y1="48%" x2="84%" y2="32%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="16%" y1="48%" x2="44%" y2="78%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="48%" y1="47%" x2="44%" y2="78%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
                <line x1="72%" y1="48%" x2="44%" y2="78%" stroke="rgba(232, 105, 42, 0.2)" strokeWidth="1.5" />
              </svg>
            )}

            {/* 1. Default Mode: Render the 6 Zone Markers */}
            {!selectedState && !activeZone && Object.entries(ZONE_POSITIONS).map(([zoneName, pos]) => (
              <div 
                key={zoneName} 
                style={{ ...styles.zoneMarker, top: pos.top, left: pos.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveZone(zoneName);
                }}
              >
                <div className="pulse-effect bounce-pin" style={styles.pulsePin} />
                <span style={styles.zonePinLabel}>{zoneName.split(' ')[0]}</span>
              </div>
            ))}

            {/* 2. Zoomed Zone Mode: Render State Pins for the Active Zone */}
            {!selectedState && activeZone && ZONES[activeZone].map(stateName => {
              const pos = STATE_COORDINATES[stateName];
              if (!pos) return null;
              const activeScale = ZONE_ZOOMS[activeZone].scale;
              
              return (
                <div 
                  key={stateName} 
                  style={{ 
                    ...styles.statePin, 
                    top: pos.top, 
                    left: pos.left,
                    transform: `translate(-50%, -50%) scale(${1 / activeScale})`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStateClick(stateName);
                  }}
                >
                  <div className="pulse-effect bounce-pin" style={{ ...styles.pulsePin, backgroundColor: '#E8692A' }} />
                  <span style={styles.statePinLabel}>{stateName}</span>
                </div>
              );
            })}

            {/* 3. Selected State Mode: Render a single glowing focused state pin */}
            {selectedState && (
              <div 
                style={{ 
                  ...styles.statePin, 
                  top: STATE_COORDINATES[selectedState]?.top || '50%', 
                  left: STATE_COORDINATES[selectedState]?.left || '50%',
                  transform: `translate(-50%, -50%) scale(0.45)` // Inverse of map scale 2.5
                }}
              >
                <div className="pulse-effect bounce-pin" style={{ ...styles.pulsePin, backgroundColor: '#E8692A', width: '18px', height: '18px' }} />
                <span style={{ ...styles.statePinLabel, fontSize: '11px', padding: '3px 8px', borderColor: '#E8692A' }}>
                  📍 {selectedState}
                </span>
              </div>
            )}
          </div>

          {/* Overlay Floating Zoom Out button */}
          {(activeZone || selectedState) && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (selectedState) {
                  handleBackToMap();
                } else {
                  setActiveZone(null);
                }
              }}
              style={styles.floatingZoomOutBtn}
            >
              Back to Map
            </button>
          )}

          <span style={styles.mapHintText}>
            {selectedState ? `On ${selectedState}` : activeZone ? "Tap state" : "Tap zone"}
          </span>
        </div>

        {/* Dynamic Detail Card / List view bottom section */}
        {selectedState ? (
          /* Zoomed Interactive Detail Drawer View */
          <div style={styles.detailCard} className="animate-slide-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={styles.detailCardLabel}>
                  {selectedState} SPECIALTY
                </span>
                <h3 style={styles.detailCardTitle}>
                  {thaliData[selectedState].dish} {isUpdatingDish && <span style={{ fontSize: '10px', color: '#E8692A', verticalAlign: 'middle', marginLeft: '6px' }} className="animate-pulse">✨ Live loading...</span>}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                {thaliData[selectedState].tags.map(tag => (
                  <span key={tag} style={styles.detailTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p style={styles.detailDesc}>
              "{thaliData[selectedState].desc}"
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleBackToMap} style={styles.cancelBtn}>
                Back
              </button>
              <button onClick={handleHungryClick} style={styles.actionBtn}>
                <ChefHat size={16} />
                Cook
              </button>
            </div>
          </div>
        ) : (
          /* Normal View - Search, Info Box and List of States */
          <>
            {/* Search Bar */}
            <div style={styles.searchBar}>
              <Search size={16} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              <input 
                type="text"
                placeholder="Search state or dish..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) {
                    setActiveZone(null);
                  }
                }}
                style={styles.searchInput}
              />
            </div>

            {/* Schematic Map Visual Info Box */}
            <div style={styles.infoBox}>
              <Sparkles size={20} style={{ color: '#E8692A', flexShrink: 0 }} />
              <p style={{ fontSize: '12.5px', margin: 0, lineHeight: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
                {activeZone ? `Viewing ${activeZone}. Tap state.` : "Explore. Tap to transform with your archetype."}
              </p>
            </div>

            {/* List View or Zone Expanded View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {Object.entries(ZONES).map(([zoneName, stateList]) => {
                if (activeZone && activeZone !== zoneName) return null;
                const zoneStates = stateList.filter(s => filteredStates.includes(s));
                if (zoneStates.length === 0) return null;
                
                return (
                  <div key={zoneName} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={styles.zoneHeaderTitle}>
                        {zoneName}
                      </h4>
                      {activeZone && (
                        <button onClick={() => setActiveZone(null)} style={styles.backToMapLink}>
                          All Regions
                        </button>
                      )}
                    </div>
                    
                    <div style={styles.statesGrid}>
                      {zoneStates.map(state => {
                        const data = thaliData[state];
                        const isUT = ["Jammu and Kashmir", "Ladakh", "Chandigarh", "Delhi (NCT)", "Puducherry", "Lakshadweep", "Dadra and Nagar Haveli and Daman and Diu", "Andaman and Nicobar Islands"].includes(state);
                        
                        return (
                          <div 
                            key={state}
                            onClick={() => handleStateClick(state)}
                            style={styles.stateCard}
                          >
                            <span style={styles.stateCardName}>
                              <MapPin size={12} style={{ color: isUT ? '#F5A623' : '#E8692A', flexShrink: 0 }} />
                              {state}
                            </span>
                            <span style={styles.stateCardDish}>
                              {data.dish}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  fullscreenOverlay: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '500px',
    height: '100%',
    backgroundColor: '#190E08',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    color: '#FFFFFF',
    fontFamily: 'Outfit, sans-serif',
    boxShadow: '0 0 40px rgba(0,0,0,0.85)'
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #2C1A11, #1E140F)'
  },
  closeHeaderBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    color: '#FFFFFF',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  bodyContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  },
  searchInput: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    width: '100%',
    fontWeight: 500
  },
  mapCanvas: {
    width: '100%',
    height: '340px',
    backgroundColor: '#1E140F',
    backgroundImage: 'radial-gradient(rgba(232, 105, 42, 0.15) 1.5px, transparent 1.5px)',
    backgroundSize: '16px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(232, 105, 42, 0.25)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 4px 30px rgba(0,0,0,0.8)'
  },
  mapLinesSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  },
  zoneMarker: {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
    zIndex: 10
  },
  pulsePin: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#E8692A',
    boxShadow: '0 0 0 0 rgba(232, 105, 42, 0.7)'
  },
  zonePinLabel: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#fff',
    marginTop: '6px',
    backgroundColor: '#2C1A11',
    padding: '3px 8px',
    borderRadius: '12px',
    border: '1px solid rgba(232, 105, 42, 0.4)',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
  },
  mapHintText: {
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: 700,
    letterSpacing: '0.5px'
  },
  infoBox: {
    padding: '16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(232, 105, 42, 0.1) 0%, rgba(232, 105, 42, 0.02) 100%)',
    border: '1px dashed #E8692A',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  zoneHeaderTitle: {
    fontSize: '13px', 
    fontWeight: 800, 
    color: '#E8692A', 
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: 0
  },
  backToMapLink: {
    background: 'none',
    border: 'none',
    color: '#E8692A',
    fontSize: '12px',
    fontWeight: 800,
    cursor: 'pointer'
  },
  statesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px'
  },
  stateCard: {
    padding: '12px 14px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'transform 0.2s, background-color 0.2s'
  },
  stateCardName: {
    fontSize: '13px', 
    fontWeight: 800, 
    color: '#FFFFFF', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '4px'
  },
  stateCardDish: {
    fontSize: '11px', 
    color: 'rgba(255, 255, 255, 0.5)', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap'
  },
  zoomContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    animation: 'fadeIn 0.3s ease-out'
  },
  zoomedIconRing: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(232, 105, 42, 0.15) 0%, rgba(30, 20, 15, 0) 70%)',
    border: '2px dashed #E8692A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 0 20px rgba(232, 105, 42, 0.1)'
  },
  zoomedBadge: {
    position: 'absolute',
    bottom: '-10px',
    backgroundColor: '#E8692A',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 800,
    color: '#FFFFFF',
    whiteSpace: 'nowrap'
  },
  detailCard: {
    width: '100%',
    backgroundColor: 'rgba(44, 26, 17, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1.5px solid #E8692A',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  detailCardLabel: {
    fontSize: '10px', 
    fontWeight: 800, 
    color: '#E8692A', 
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  detailCardTitle: {
    fontSize: '18px', 
    fontWeight: 900, 
    color: '#FFFFFF', 
    margin: '4px 0 0'
  },
  detailTag: {
    fontSize: '8px',
    fontWeight: 800,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#FFFFFF'
  },
  detailDesc: {
    fontSize: '13.5px', 
    color: 'rgba(255, 255, 255, 0.85)', 
    lineHeight: '20px',
    margin: '8px 0',
    fontStyle: 'italic'
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer'
  },
  actionBtn: {
    flex: 2,
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#E8692A',
    border: 'none',
    color: '#FFFFFF',
    fontWeight: 800,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    boxShadow: '0 4px 14px rgba(232, 105, 42, 0.3)'
  },
  indiaSilhouette: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  },
  statePin: {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 20
  },
  statePinLabel: {
    fontSize: '9px',
    fontWeight: '800',
    color: '#fff',
    marginTop: '4px',
    backgroundColor: 'rgba(26, 14, 8, 0.85)',
    padding: '2px 6px',
    borderRadius: '8px',
    border: '1px solid rgba(232, 105, 42, 0.3)',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
    pointerEvents: 'none'
  },
  floatingZoomOutBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(44, 26, 17, 0.9)',
    border: '1px solid #E8692A',
    color: '#FFFFFF',
    borderRadius: '12px',
    padding: '8px 14px',
    fontSize: '11px',
    fontWeight: 800,
    cursor: 'pointer',
    zIndex: 30,
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
    transition: 'all 0.2s ease'
  }
};
