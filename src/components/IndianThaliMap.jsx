import React, { useState } from 'react';
import { X, Search, Sparkles, MapPin, ChefHat, Compass } from 'lucide-react';

const THALI_DATA = {
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
  "Kerala": { dish: "Malabar Parotta & Beef Fry", tags: ["🔥 SPICY", "MEAT"], desc: "Flaky, layered soft flatbread paired with tender beef chunk dry-roasted in coconut oil, black pepper, and curry leaves." },
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

export default function IndianThaliMap({ onClose, onSelectRecipe }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    setIsZoomed(true);
  };

  const handleBackToMap = () => {
    setIsZoomed(false);
    setTimeout(() => setSelectedState(null), 300); // fade out
  };

  const handleHungryClick = () => {
    if (selectedState) {
      const data = THALI_DATA[selectedState];
      onSelectRecipe(data.dish);
      onClose();
    }
  };

  // Filter states based on search query
  const filteredStates = Object.keys(THALI_DATA).filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    THALI_DATA[state].dish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '500px',
      height: '100%',
      backgroundColor: '#1E140F',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      color: '#FFFFFF',
      fontFamily: 'Outfit, sans-serif',
      boxShadow: '0 0 40px rgba(0,0,0,0.8)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #2C1A11, #1E140F)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Compass className="animate-spin-slow" size={24} style={{ color: 'var(--hc-saffron)' }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.5px', margin: 0 }}>
              Great Indian Thali
            </h3>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>
              36 STATES & UNION TERRITORIES EXPLORER
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{
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
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}>
        {!isZoomed ? (
          <>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <Search size={16} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              <input 
                type="text"
                placeholder="Search state, union territory, or dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  width: '100%',
                  fontWeight: 500
                }}
              />
            </div>

            {/* Schematic Map Visual Info Box */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(232, 105, 42, 0.1) 0%, rgba(232, 105, 42, 0.02) 100%)',
              border: '1px dashed var(--hc-saffron)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Sparkles size={24} style={{ color: 'var(--hc-saffron)', flexShrink: 0 }} />
              <p style={{ fontSize: '12px', margin: 0, lineHeight: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
                Welcome to the <strong>Interactive Thali Map</strong>. India has <strong>28 states and 8 union territories</strong>. Select any region below to zoom in on its most viral signature dish.
              </p>
            </div>

            {/* Schematic Interactive Badge Grid organized by Zones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {Object.entries(ZONES).map(([zoneName, stateList]) => {
                const zoneStates = stateList.filter(s => filteredStates.includes(s));
                if (zoneStates.length === 0) return null;
                
                return (
                  <div key={zoneName} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      fontWeight: 800, 
                      color: 'var(--hc-saffron)', 
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      margin: '0 0 4px'
                    }}>
                      {zoneName}
                    </h4>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px'
                    }}>
                      {zoneStates.map(state => {
                        const data = THALI_DATA[state];
                        const isUT = ["Jammu and Kashmir", "Ladakh", "Chandigarh", "Delhi (NCT)", "Puducherry", "Lakshadweep", "Dadra and Nagar Haveli and Daman and Diu", "Andaman and Nicobar Islands"].includes(state);
                        
                        return (
                          <div 
                            key={state}
                            onClick={() => handleStateClick(state)}
                            style={{
                              padding: '12px 14px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              transition: 'transform 0.2s'
                            }}
                          >
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={12} style={{ color: isUT ? 'var(--hc-turmeric)' : 'var(--hc-saffron)', flexShrink: 0 }} />
                              {state}
                            </span>
                            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
        ) : (
          /* Zoomed Interactive Detail Drawer View */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {/* Custom Mockup Zoomed Map Node */}
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232, 105, 42, 0.15) 0%, rgba(30, 20, 15, 0) 70%)',
              border: '2px dashed var(--hc-saffron)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 20px rgba(232, 105, 42, 0.1)'
            }}>
              <MapPin size={40} className="animate-bounce" style={{ color: 'var(--hc-saffron)' }} />
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                backgroundColor: 'var(--hc-saffron)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#FFFFFF',
                whiteSpace: 'nowrap'
              }}>
                ZOOMED: {selectedState.toUpperCase()}
              </div>
            </div>

            {/* Bottom Drawer Card */}
            <div style={{
              width: '100%',
              backgroundColor: 'rgba(44, 26, 17, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid var(--hc-saffron)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 800, 
                    color: 'var(--hc-saffron)', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {selectedState} SPECIALTY
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0' }}>
                    {THALI_DATA[selectedState].dish}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {THALI_DATA[selectedState].tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        fontSize: '8px',
                        fontWeight: 800,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: '#FFFFFF'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ 
                fontSize: '13px', 
                color: 'rgba(255, 255, 255, 0.85)', 
                lineHeight: '20px',
                margin: '8px 0',
                fontStyle: 'italic'
              }}>
                "{THALI_DATA[selectedState].desc}"
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={handleBackToMap}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Back to Map
                </button>
                <button 
                  onClick={handleHungryClick}
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--hc-saffron)',
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
                  }}
                >
                  <ChefHat size={16} />
                  Feeling Hungry? Cook!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
