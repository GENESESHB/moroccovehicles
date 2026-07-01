// src/app/components/Booking/BookingWizard.jsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/app/utils/api';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import ReservationSystem from './ReservationSystem';
import ChatBot from './ChatBot';
import '../../styles/Booking.css';

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('normal');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userCity, setUserCity] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  // User and Booking States
  const [driver, setDriver] = useState({ name: '', email: '', phone: '', cin: '' });
  const [extras, setExtras] = useState({ gps: false, babySeat: false, insurance: false });
  const [errors, setErrors] = useState({});
  const [bookingDetails, setBookingDetails] = useState(null);

  const todayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const nextWeekStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split('T')[0];
  };

  const [search, setSearch] = useState({
    pickup: 'Fez',
    dropoff: 'Fez',
    dateFrom: todayStr(),
    dateTo: nextWeekStr(),
  });

  // Localisation and initial public vehicle list
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://moroccovehicles-1-6zww.onrender.com/api';
    const serverOrigin = apiBase.replace('/api', '');

    api.get(`${serverOrigin}/whoami/place`, { timeout: 6000 })
      .then(res => {
        const city = res.data?.geolocation?.city || '';
        const CITIES = ['Fez', 'Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'];
        const matched = CITIES.find(c => c.toLowerCase() === city.toLowerCase());
        if (matched) {
          setUserCity(matched);
          setSearch(p => ({ ...p, pickup: matched, dropoff: matched }));
        } else setUserCity(city || 'Fez');
      })
      .catch(() => setUserCity('Fez'))
      .finally(() => setLocationLoading(false));

    api.get('/vehicles/public/available')
      .then(res => { if (res.data?.success) setVehicles(res.data.vehicles); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const days = () => {
    const a = new Date(search.dateFrom);
    const b = new Date(search.dateTo);
    const diff = Math.ceil((b - a) / 86400000);
    return diff > 0 ? diff : 1;
  };

  const isLuxe = (v) => v.pricePerDay >= 500 || v.type?.toLowerCase().includes('premium');

  // Category filtering
  const getFilteredVehicles = (list) => {
    if (category === 'luxe') {
      return list.filter(v => isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
    }
    if (category === 'electrique') {
      return list.filter(v => v.carburant?.toLowerCase() === 'electrique' || v.type?.toLowerCase().includes('electri'));
    }
    return list.filter(v => !isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
  };

  const validateDriverForm = () => {
    const errs = {};
    if (!driver.name.trim()) errs.name = 'Nom complet obligatoire';
    if (!driver.email.trim() || !/\S+@\S+\.\S+/.test(driver.email)) errs.email = 'Email invalide';
    if (!driver.phone.trim()) errs.phone = 'Téléphone obligatoire';
    if (!driver.cin.trim()) errs.cin = 'CIN / Passeport obligatoire';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Trigger search and go to Step 2
  const handleSearch = async () => {
    if (!validateDriverForm()) {
      const el = document.getElementById('driver-info-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSearchLoading(true);
    try {
      const params = {
        pickup: search.pickup,
        dropoff: search.dropoff,
        dateFrom: search.dateFrom,
        dateTo: search.dateTo,
        category: category,
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
      setStep(2); // Go to Select Vehicle
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Choose vehicle and go to Step 3
  const handleBook = (car) => {
    if (!validateDriverForm()) {
      const el = document.getElementById('driver-info-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSelectedCar(car);
    setStep(3); // Go to Select Packs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCar(null);
    setSearchResults([]);
    setExtras({ gps: false, babySeat: false, insurance: false });
    setDriver({ name: '', email: '', phone: '', cin: '' });
    setBookingDetails(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fmt = dateStr => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const proximityVehicles = [...vehicles]
    .sort((a, b) => {
      const aMatch = a.partnerId?.city?.toLowerCase() === userCity.toLowerCase() ? 1 : 0;
      const bMatch = b.partnerId?.city?.toLowerCase() === userCity.toLowerCase() ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <div className="booking-page">
      <HeroSection
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        loading={searchLoading || loading}
      />

      <div className="booking-main">
        {/* Step tracker */}
        <div className="step-track">
          <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
            <span className="step-circle">{step > 1 ? '✓' : '1'}</span>
            <span>Informations Client</span>
          </div>
          <div className={`step-connector ${step > 1 ? 'done' : ''}`} />
          <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
            <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
            <span>Choisir un véhicule</span>
          </div>
          <div className={`step-connector ${step > 2 ? 'done' : ''}`} />
          <div className={`step-item ${step === 3 ? 'active' : step > 3 ? 'done' : ''}`}>
            <span className="step-circle">{step > 3 ? '✓' : '3'}</span>
            <span>Sélectionner des Packs</span>
          </div>
          <div className={`step-connector ${step > 3 ? 'done' : ''}`} />
          <div className={`step-item ${step === 4 ? 'active' : ''}`}>
            <span className="step-circle">4</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: User Form and Suggestions */}
        {step === 1 && (
          <div className="step1-container">
            {/* Driver Information Form */}
            <div id="driver-info-form" className="driver-form-card" style={{ maxWidth: 800, margin: '0 auto 40px', padding: '32px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Informations du conducteur principal</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Renseignez vos coordonnées de contact pour votre dossier de réservation.</p>
              
              <div className="driver-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Nom complet</label>
                  <input
                    style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '14px', outline: 'none' }}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="ex : Ahmed Benali"
                    value={driver.name}
                    onChange={e => setDriver({ ...driver, name: e.target.value })}
                  />
                  {errors.name && <span className="form-error" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</span>}
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Adresse e-mail</label>
                  <input
                    type="email"
                    style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '14px', outline: 'none' }}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="ex : ahmed@mail.com"
                    value={driver.email}
                    onChange={e => setDriver({ ...driver, email: e.target.value })}
                  />
                  {errors.email && <span className="form-error" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</span>}
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Téléphone</label>
                  <input
                    type="tel"
                    style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '14px', outline: 'none' }}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+212 6XX-XXXXXX"
                    value={driver.phone}
                    onChange={e => setDriver({ ...driver, phone: e.target.value })}
                  />
                  {errors.phone && <span className="form-error" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</span>}
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>CIN / Passeport</label>
                  <input
                    style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '14px', outline: 'none' }}
                    className={`form-input ${errors.cin ? 'error' : ''}`}
                    placeholder="ex : CD123456"
                    value={driver.cin}
                    onChange={e => setDriver({ ...driver, cin: e.target.value })}
                  />
                  {errors.cin && <span className="form-error" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.cin}</span>}
                </div>
              </div>
            </div>

            <ProductGrid
              vehicles={vehicles}
              filteredVehicles={getFilteredVehicles(proximityVehicles)}
              proximityVehicles={getFilteredVehicles(proximityVehicles)}
              userCity={userCity}
              isLuxe={isLuxe}
              loading={loading}
              locationLoading={locationLoading}
              category={category}
              onBook={handleBook}
            />
          </div>
        )}

        {/* Step 2: Search Results */}
        {step === 2 && (
          <div className="search-results-section" style={{ padding: '2rem' }}>
            {searchLoading ? (
              <div className="loading-spinner">Recherche en cours...</div>
            ) : (
              <>
                <h2>
                  {getFilteredVehicles(searchResults).length > 0
                    ? `${getFilteredVehicles(searchResults).length} véhicule(s) trouvé(s)`
                    : 'Aucun véhicule trouvé pour ces critères'}
                </h2>
                {getFilteredVehicles(searchResults).length === 0 && (
                  <p>Modifiez vos critères (ville, dates, catégorie) et relancez la recherche.</p>
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
                  onClick={() => setStep(1)}
                  style={{ marginTop: '1.5rem' }}
                >
                  ← Modifier la recherche
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 3 & 4: Select Packs & Confirmation */}
        {(step === 3 || step === 4) && (
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