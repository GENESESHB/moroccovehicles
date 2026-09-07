// src/app/components/Booking/SearchPage.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/app/utils/api';
import ProductGrid from './ProductGrid';
import ChatBot from './ChatBot';
import ReservationSystem from './ReservationSystem';
import '../../styles/Booking.css';
import '../../styles/SearchPage.css';

const DESTINATIONS = [
  { name: 'Casablanca' }, { name: 'Marrakech' }, { name: 'Rabat' },
  { name: 'Fez' }, { name: 'Tanger' }, { name: 'Agadir' },
  { name: 'Oujda' }, { name: 'Nador' }, { name: 'Laâyoune' },
  { name: 'Dakhla' }, { name: 'Ouarzazate' }, { name: 'Essaouira' },
  { name: 'Tétouan' }, { name: 'Al Hoceima' }, { name: 'Errachidia' },
  { name: 'Béni Mellal' }, { name: 'Merzouga' }, { name: 'Chefchaouen' },
  { name: 'Meknes' }, { name: 'Kénitra' }, { name: 'Safi' },
  { name: 'El Jadida' }, { name: 'Mohammedia' }, { name: 'Settat' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(2); // Start at step 2 (results)
  const [category, setCategory] = useState('normal');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  const [driver, setDriver] = useState({ name: '', email: '', phone: '', cin: '' });
  const [extras, setExtras] = useState({ gps: false, babySeat: false, insurance: false });
  const [bookingDetails, setBookingDetails] = useState(null);

  const todayStr = () => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const nextWeekStr = () => {
    const d = new Date(); d.setDate(d.getDate() + 8);
    return d.toISOString().split('T')[0];
  };

  const [search, setSearch] = useState({
    pickup: searchParams.get('pickup') || 'Fez',
    dropoff: searchParams.get('dropoff') || 'Fez',
    dateFrom: searchParams.get('dateFrom') || todayStr(),
    dateTo: searchParams.get('dateTo') || nextWeekStr(),
  });

  const isLuxe = (v) => v.pricePerDay >= 500 || v.type?.toLowerCase().includes('premium');

  const getFilteredVehicles = (list) => {
    if (category === 'luxe') return list.filter(v => isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
    if (category === 'electrique') return list.filter(v => v.carburant?.toLowerCase() === 'electrique' || v.type?.toLowerCase().includes('electri'));
    return list.filter(v => !isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
  };

  const executeSearch = useCallback(async (searchCriteria, targetCat) => {
    setSearchLoading(true);
    try {
      const params = {
        pickup: searchCriteria.pickup,
        dropoff: searchCriteria.dropoff,
        dateFrom: searchCriteria.dateFrom,
        dateTo: searchCriteria.dateTo,
        category: targetCat,
      };
      const response = await api.get('/vehicles/public/available', { params });
      if (response.data?.success) {
        setSearchResults(response.data.vehicles || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erreur recherche:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Run search on mount from URL params
  useEffect(() => {
    const pickupParam = searchParams.get('pickup');
    const dropoffParam = searchParams.get('dropoff');
    const dateFromParam = searchParams.get('dateFrom');
    const dateToParam = searchParams.get('dateTo');
    const categoryParam = searchParams.get('category') || 'normal';

    const newSearch = {
      pickup: pickupParam || 'Fez',
      dropoff: dropoffParam || pickupParam || 'Fez',
      dateFrom: dateFromParam || todayStr(),
      dateTo: dateToParam || nextWeekStr(),
    };
    setSearch(newSearch);
    setCategory(categoryParam);
    executeSearch(newSearch, categoryParam);
  }, [searchParams]);

  const handleNewSearch = () => {
    const query = new URLSearchParams({
      pickup: search.pickup,
      dropoff: search.dropoff,
      dateFrom: search.dateFrom,
      dateTo: search.dateTo,
      category,
    }).toString();
    router.push(`/search?${query}`);
  };

  const handleBook = (car) => {
    setSelectedCar(car);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(2);
    setSelectedCar(null);
    setExtras({ gps: false, babySeat: false, insurance: false });
    setDriver({ name: '', email: '', phone: '', cin: '' });
    setBookingDetails(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const days = () => {
    const a = new Date(search.dateFrom);
    const b = new Date(search.dateTo);
    const diff = Math.ceil((b - a) / 86400000);
    return diff > 0 ? diff : 1;
  };

  const fmt = dateStr => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="search-page">

      {/* ── TOP COMPACT NAV ── */}
      <nav className="search-top-nav">
        <a href="/" className="stnav-logo">
          <span className="stnav-logo-icon">M.</span>
          <span className="stnav-logo-name">MoroccoVehicles</span>
        </a>
        <div className="stnav-links">
          <a href="/gestion-automobiles" className="stnav-link">Gestion de Flotte</a>
          <a href="/Dashboard" className="stnav-link">Mon espace</a>
          <a href="/login" className="stnav-connect">Se connecter</a>
        </div>
      </nav>

      {/* ── COMPACT SEARCH BAR ── */}
      <div className="search-compact-bar">
        <div className="scb-inner">
          {/* Category tabs */}
          <div className="scb-category-tabs">
            {['normal', 'luxe', 'electrique'].map(cat => (
              <button
                key={cat}
                className={`scb-cat-tab ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'normal' ? 'Standard' : cat === 'luxe' ? 'Luxe & Prestige' : 'Électrique'}
              </button>
            ))}
          </div>

          {/* Search fields */}
          <div className="scb-fields">
            <div className="scb-field">
              <label className="scb-label">Prise en charge</label>
              <select
                className="scb-select"
                value={search.pickup}
                onChange={e => setSearch(s => ({ ...s, pickup: e.target.value }))}
              >
                {DESTINATIONS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="scb-sep">⇄</div>
            <div className="scb-field">
              <label className="scb-label">Restitution</label>
              <select
                className="scb-select"
                value={search.dropoff}
                onChange={e => setSearch(s => ({ ...s, dropoff: e.target.value }))}
              >
                {DESTINATIONS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="scb-field">
              <label className="scb-label">Départ</label>
              <input
                type="date"
                className="scb-input"
                value={search.dateFrom}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSearch(s => ({ ...s, dateFrom: e.target.value }))}
              />
            </div>
            <div className="scb-field">
              <label className="scb-label">Retour</label>
              <input
                type="date"
                className="scb-input"
                value={search.dateTo}
                min={search.dateFrom}
                onChange={e => setSearch(s => ({ ...s, dateTo: e.target.value }))}
              />
            </div>
            <button className="scb-search-btn" onClick={handleNewSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* ── STEP TRACKER ── */}
      <div className="search-step-bar">
        <div className="search-steps-inner">
          {[
            { n: 1, label: 'Recherche' },
            { n: 2, label: 'Choisir un véhicule' },
            { n: 3, label: 'Sélectionner des Packs' },
            { n: 4, label: 'Informations Client' },
            { n: 5, label: 'Confirmation' },
          ].map(({ n, label }, i, arr) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={`step-item ${step === n ? 'active' : step > n ? 'done' : ''}`}>
                <span className="step-circle">{step > n ? '✓' : n}</span>
                <span>{label}</span>
              </div>
              {i < arr.length - 1 && <div className={`step-connector ${step > n ? 'done' : ''}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="search-results-main">

        {/* Step 2 – Results */}
        {step === 2 && (
          <div>
            {searchLoading ? (
              <div className="loader-wrap">
                <div className="spinner" />
                <p>Recherche en cours...</p>
              </div>
            ) : (
              <>
                <div className="search-results-header">
                  <h1 className="search-results-title">
                    {getFilteredVehicles(searchResults).length > 0
                      ? `${getFilteredVehicles(searchResults).length} véhicule(s) disponible(s)`
                      : 'Aucun véhicule trouvé'}
                  </h1>
                  <p className="search-results-sub">
                    {search.pickup} → {search.dropoff} &nbsp;·&nbsp; {fmt(search.dateFrom)} → {fmt(search.dateTo)}
                  </p>
                </div>
                {getFilteredVehicles(searchResults).length === 0 && (
                  <p style={{ color: '#64748b', marginBottom: '24px' }}>
                    Modifiez vos critères (ville, dates, catégorie) et relancez la recherche.
                  </p>
                )}
                <ProductGrid
                  vehicles={searchResults}
                  filteredVehicles={getFilteredVehicles(searchResults)}
                  proximityVehicles={[]}
                  userCity={search.pickup}
                  isLuxe={isLuxe}
                  loading={false}
                  locationLoading={false}
                  category={category}
                  onBook={handleBook}
                />
                <button
                  className="btn-back"
                  onClick={() => router.push('/')}
                  style={{ marginTop: '2rem' }}
                >
                  ← Modifier la recherche
                </button>
              </>
            )}
          </div>
        )}

        {/* Steps 3-5 – Reservation */}
        {step > 2 && (
          <ReservationSystem
            step={step}
            setStep={setStep}
            selectedCar={selectedCar}
            search={search}
            days={days}
            fmt={fmt}
            onReset={handleReset}
            driver={driver}
            setDriver={setDriver}
            extras={extras}
            setExtras={setExtras}
            bookingDetails={bookingDetails}
            setBookingDetails={setBookingDetails}
          />
        )}
      </div>

      <ChatBot />
    </div>
  );
}
