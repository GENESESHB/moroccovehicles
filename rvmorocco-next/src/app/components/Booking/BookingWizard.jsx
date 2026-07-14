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
  const [hasSearched, setHasSearched] = useState(false);
  const [userCity, setUserCity] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  // User and Booking States
  const [driver, setDriver] = useState({ name: '', email: '', phone: '', cin: '' });
  const [extras, setExtras] = useState({ gps: false, babySeat: false, insurance: false });
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

  // Trigger search on Step 1
  const handleSearch = async () => {
    setSearchLoading(true);
    setHasSearched(true);
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
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  // Choose vehicle and go to Step 2
  const handleBook = (car) => {
    setSelectedCar(car);
    setStep(2); // Go to Select Packs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCar(null);
    setSearchResults([]);
    setHasSearched(false);
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
            <span>Choisir un véhicule</span>
          </div>
          <div className={`step-connector ${step > 1 ? 'done' : ''}`} />
          <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
            <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
            <span>Sélectionner des Packs</span>
          </div>
          <div className={`step-connector ${step > 2 ? 'done' : ''}`} />
          <div className={`step-item ${step === 3 ? 'active' : step > 3 ? 'done' : ''}`}>
            <span className="step-circle">{step > 3 ? '✓' : '3'}</span>
            <span>Informations Client</span>
          </div>
          <div className={`step-connector ${step > 3 ? 'done' : ''}`} />
          <div className={`step-item ${step === 4 ? 'active' : ''}`}>
            <span className="step-circle">4</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Vehicle selection (Hero Search + Grid) */}
        {step === 1 && (
          <div className="step1-container" style={{ padding: '0 20px' }}>
            {hasSearched ? (
              <div className="search-results-section">
                {searchLoading ? (
                  <div className="loader-wrap">
                    <div className="spinner" />
                    <p>Recherche en cours...</p>
                  </div>
                ) : (
                  <>
                    <h2 className="section-heading">
                      {getFilteredVehicles(searchResults).length > 0
                        ? `${getFilteredVehicles(searchResults).length} véhicule(s) trouvé(s)`
                        : 'Aucun véhicule trouvé pour ces critères'}
                    </h2>
                    {getFilteredVehicles(searchResults).length === 0 && (
                      <p style={{ color: '#64748b', marginBottom: '24px' }}>Modifiez vos critères (ville, dates, catégorie) et relancez la recherche.</p>
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
                      onClick={() => setHasSearched(false)}
                      style={{ marginTop: '2rem' }}
                    >
                      ← Voir les suggestions de proximité
                    </button>
                  </>
                )}
              </div>
            ) : (
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
            )}
          </div>
        )}

        {/* Step 2, 3 & 4: Reservation System (Packs, Driver info, Confirmation) */}
        {step > 1 && (
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