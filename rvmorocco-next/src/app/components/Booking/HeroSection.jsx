'use client';

import { useState, useRef, useEffect } from 'react';

/* =========================================================
   DESTINATIONS – All Morocco airports & cities
   ========================================================= */
const DESTINATIONS = [
  { name: 'Casablanca', type: 'city', airport: 'Aéroport Mohammed V (CMN)' },
  { name: 'Marrakech', type: 'city', airport: 'Aéroport Menara (RAK)' },
  { name: 'Rabat', type: 'city', airport: 'Aéroport Rabat-Salé (RBA)' },
  { name: 'Fez', type: 'city', airport: 'Aéroport Saïss (FEZ)' },
  { name: 'Tanger', type: 'city', airport: 'Aéroport Ibn Battouta (TNG)' },
  { name: 'Agadir', type: 'city', airport: 'Aéroport Al Massira (AGA)' },
  { name: 'Oujda', type: 'city', airport: 'Aéroport Angads (OUD)' },
  { name: 'Nador', type: 'city', airport: 'Aéroport Nador (NDR)' },
  { name: 'Laâyoune', type: 'city', airport: 'Aéroport Hassan I' },
  { name: 'Dakhla', type: 'city', airport: 'Aéroport Dakhla' },
  { name: 'Ouarzazate', type: 'city', airport: 'Aéroport Ouarzazate' },
  { name: 'Essaouira', type: 'city', airport: 'Aéroport Mogador' },
  { name: 'Tétouan', type: 'city', airport: 'Aéroport Sania Ramel' },
  { name: 'Al Hoceima', type: 'city', airport: 'Aéroport Cherif Al Idrissi' },
  { name: 'Errachidia', type: 'city', airport: 'Aéroport Moulay Ali Cherif' },
  { name: 'Béni Mellal', type: 'city', airport: 'Aéroport Béni Mellal' },
  { name: 'Guelmim', type: 'city', airport: 'Aéroport Guelmim' },
  { name: 'Zagora', type: 'city', airport: 'Aéroport Zagora' },
  { name: 'Tan-Tan', type: 'city', airport: 'Aéroport Tan Tan' },
  { name: 'Bouarfa', type: 'city', airport: 'Aéroport Bouarfa' },
  { name: 'Ben Slimane', type: 'city', airport: 'Aéroport Ben Slimane' },
  { name: 'Merzouga', type: 'spot', airport: null },
  { name: 'Chefchaouen', type: 'spot', airport: null },
  { name: 'Ifrane', type: 'spot', airport: null },
  { name: 'Safi', type: 'spot', airport: null },
  { name: 'El Jadida', type: 'spot', airport: null },
  { name: 'Taroudant', type: 'spot', airport: null },
  { name: 'Azilal', type: 'spot', airport: null },
  { name: 'Tinghir', type: 'spot', airport: null },
  { name: 'Saidia', type: 'spot', airport: null },
  { name: 'Taghazout', type: 'spot', airport: null },
  { name: 'Meknes', type: 'spot', airport: null },
  { name: 'Volubilis', type: 'spot', airport: null },
  { name: 'Asilah', type: 'spot', airport: null },
  { name: 'Larache', type: 'spot', airport: null },
  { name: 'Kénitra', type: 'spot', airport: null },
  { name: 'Khénifra', type: 'spot', airport: null },
  { name: 'Midelt', type: 'spot', airport: null },
  { name: 'Settat', type: 'spot', airport: null },
  { name: 'Berrechid', type: 'spot', airport: null },
  { name: 'Mohammedia', type: 'spot', airport: null },
];

/* =========================================================
   SearchableDropdown – Reusable searchable select
   ========================================================= */
function SearchableDropdown({ value, onChange, placeholder, label, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  const filtered = query.trim() === ''
    ? DESTINATIONS
    : DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        (d.airport && d.airport.toLowerCase().includes(query.toLowerCase()))
      );

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = DESTINATIONS.find(d => d.name === value);

  return (
    <div className="searchable-dropdown" ref={containerRef}>
      <div className="search-field-label">{label}</div>
      <div
        className={`search-field-value dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-icon">{icon}</span>
        <span className={`dropdown-text ${!selected ? 'placeholder' : ''}`}>
          {selected ? selected.name : placeholder}
        </span>
        <svg className="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      {isOpen && (
        <div className="dropdown-panel">
          <div className="dropdown-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="dropdown-search-input"
              placeholder="Rechercher une ville ou aéroport..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="dropdown-list">
            {filtered.length === 0 ? (
              <div className="dropdown-empty">Aucun résultat</div>
            ) : (
              filtered.map(dest => (
                <div
                  key={dest.name}
                  className={`dropdown-item ${dest.name === value ? 'selected' : ''}`}
                  onClick={() => { onChange(dest.name); setIsOpen(false); setQuery(''); }}
                >
                  <div className="dropdown-item-main">
                    <span className="dropdown-item-name">{dest.name}</span>
                    {dest.type === 'city' && <span className="dropdown-item-badge">Ville</span>}
                    {dest.type === 'spot' && <span className="dropdown-item-badge spot">Destination</span>}
                  </div>
                  {dest.airport && (
                    <span className="dropdown-item-airport">{dest.airport}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HeroSection – Navigation + Search + Promo Bar
   ========================================================= */
export default function HeroSection({
  category,
  setCategory,
  search,
  setSearch,
  onSearch,
  loading
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="wego-hero">
      <div className="wego-hero-bg" />
      <div className="hero-overlay-pattern" />

      {/* ── NAVIGATION ── */}
      <nav className="wego-booking-nav" style={{ position: 'relative' }}>
        <div className="wnav-left">
          <a href="/" className="wnav-logo">
            <span className="wnav-logo-text">M.</span>
            <span className="wnav-logo-badge">Moroccovehicles</span>
          </a>
        </div>
        <div className="wnav-center">
          <div className="wnav-brand-label">
            <strong>MoroccoVehicles</strong>
            <span>Location de voitures au Maroc</span>
          </div>
          <div className="wnav-divider" />
          <span className="wnav-flag">MA</span>
          <span className="wnav-lang">FR | MAD</span>
        </div>
        
        {/* Desktop nav links */}
        <div className="wnav-right">
          <button className="wnav-link">Assistance</button>
          <a href="/gestion-automobiles" className="wnav-link">Gestion de Flotte</a>
          <a href="/Dashboard" className="wnav-link">Mon espace</a>
          <a href="/login" className="wnav-connect-btn">Se connecter</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 110,
            outline: 'none'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div 
            className="mobile-dropdown-menu"
            style={{
              position: 'absolute',
              top: '70px',
              left: '16px',
              right: '16px',
              background: 'rgba(14, 35, 54, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 100,
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              animation: 'slideDown 0.25s ease-out'
            }}
          >
            <a href="/assistance" className="mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Assistance
            </a>
            <a href="/gestion-automobiles" className="mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
              Gestion de Flotte
            </a>
            <a href="/Dashboard" className="mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Mon espace
            </a>
            <a href="/login" className="mobile-menu-link-btn" style={{ textAlign: 'center', background: '#36c275', color: '#fff', textDecoration: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', marginTop: '8px', boxShadow: '0 4px 12px rgba(54, 194, 117, 0.3)' }}>
              Se connecter
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO CONTENT ── */}
      <div className="wego-hero-content">
        {/* Service Tabs */}
        <div className="service-tabs">
          <button
            className={`service-tab ${category === 'normal' ? 'active' : ''}`}
            onClick={() => setCategory('normal')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
              <circle cx="7" cy="17" r="2"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
            Standard
          </button>
          <button
            className={`service-tab ${category === 'luxe' ? 'active' : ''}`}
            onClick={() => setCategory('luxe')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Luxe & Prestige
          </button>
          <button
            className={`service-tab ${category === 'electrique' ? 'active' : ''}`}
            onClick={() => setCategory('electrique')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Électrique
          </button>
        </div>

        {/* Search Card */}
        <div className="search-card-wrapper">
          <div className="search-card">
            <div className="trip-type-tabs">
              <button className="trip-tab active">Aller-retour</button>
              <button className="trip-tab">Aller simple</button>
            </div>
            <div className="search-inputs-row">
              <SearchableDropdown
                label="Prise en charge"
                placeholder="Choisir ville ou aéroport"
                value={search.pickup}
                onChange={(val) => setSearch(s => ({ ...s, pickup: val }))}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
              />
              <button
                className="swap-btn"
                title="Inverser"
                onClick={() => setSearch(s => ({ ...s, pickup: s.dropoff, dropoff: s.pickup }))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16V4M7 4L3 8M7 4l4 4"/>
                  <path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </button>
              <SearchableDropdown
                label="Restitution"
                placeholder="Choisir ville ou aéroport"
                value={search.dropoff}
                onChange={(val) => setSearch(s => ({ ...s, dropoff: val }))}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
              />
              <div className="field-sep" />
              <div className="search-field">
                <div className="search-field-label">Départ</div>
                <div className="search-field-value date-field">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input
                    type="date"
                    value={search.dateFrom}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setSearch({ ...search, dateFrom: e.target.value })}
                  />
                </div>
              </div>
              <div className="search-field">
                <div className="search-field-label">Retour</div>
                <div className="search-field-value date-field">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input
                    type="date"
                    value={search.dateTo}
                    min={search.dateFrom}
                    onChange={e => setSearch({ ...search, dateTo: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="search-filters-row">
              <label className="filter-check">
                <input type="checkbox" /> Livraison à domicile
              </label>
              <select className="filter-dropdown">
                <option>1 Conducteur</option>
                <option>2 Conducteurs</option>
              </select>
              <select className="filter-dropdown">
                <option>Toutes catégories</option>
                <option>Citadine</option>
                <option>SUV</option>
                <option>Berline</option>
                <option>Luxe</option>
              </select>
              <select className="filter-dropdown">
                <option>Paiement sur place</option>
                <option>Carte bancaire</option>
                <option>Virement</option>
              </select>
              <div className="filter-spacer" />
              <button 
                className="search-go-btn" 
                onClick={onSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner" />
                    Recherche...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    Rechercher
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROMO BAR ── */}
      <div className="hero-promo-bar">
        <div className="promo-badge">
          <span className="promo-new-tag">Nouveau</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Contrat digital instantané
        </div>
        <div className="promo-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Suivi GPS temps réel
        </div>
      </div>
    </section>
  );
}