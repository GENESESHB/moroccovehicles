'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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

  // Récupération de la localisation et liste initiale (suggestions)
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const serverOrigin = apiBase.replace('/api', '');

    axios.get(`${serverOrigin}/whoami/place`, { timeout: 6000 })
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

  // --- Recherche réelle ---
  const handleSearch = async () => {
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
      // On passe à l'étape 2 même si erreur ou aucun résultat
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBook = (car) => {
    setSelectedCar(car);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCar(null);
    setSearchResults([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fmt = dateStr => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isLuxe = (v) => v.pricePerDay >= 500 || v.type?.toLowerCase().includes('premium');

  // Véhicules proches (suggestions)
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
        {/* Tracker d'étapes */}
        <div className="step-track">
          <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
            <span className="step-circle">{step > 1 ? '✓' : '1'}</span>
            <span>Recherche</span>
          </div>
          <div className={`step-connector ${step > 1 ? 'done' : ''}`} />
          <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
            <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
            <span>Choisir un véhicule</span>
          </div>
          <div className={`step-connector ${step > 2 ? 'done' : ''}`} />
          <div className={`step-item ${step === 3 ? 'active' : step > 3 ? 'done' : ''}`}>
            <span className="step-circle">{step > 3 ? '✓' : '3'}</span>
            <span>Détails & Options</span>
          </div>
          <div className={`step-connector ${step > 3 ? 'done' : ''}`} />
          <div className={`step-item ${step === 4 ? 'active' : ''}`}>
            <span className="step-circle">4</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Étape 1 : Suggestions */}
        {step === 1 && (
          <ProductGrid
            vehicles={vehicles}
            filteredVehicles={proximityVehicles}
            proximityVehicles={proximityVehicles}
            userCity={userCity}
            isLuxe={isLuxe}
            loading={loading}
            locationLoading={locationLoading}
            category={category}
            onBook={handleBook}
          />
        )}

        {/* Étape 2 : Résultats de recherche */}
        {step === 2 && (
          <div className="search-results-section" style={{ padding: '2rem' }}>
            {searchLoading ? (
              <div className="loading-spinner">Recherche en cours...</div>
            ) : (
              <>
                <h2>
                  {searchResults.length > 0
                    ? `${searchResults.length} véhicule(s) trouvé(s)`
                    : 'Aucun véhicule trouvé pour ces critères'}
                </h2>
                {searchResults.length === 0 && (
                  <p>Modifiez vos critères (ville, dates) et relancez la recherche.</p>
                )}
                <ProductGrid
                  vehicles={searchResults}
                  filteredVehicles={searchResults}
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

        {/* Étape 3 & 4 : Formulaire et confirmation */}
        {(step === 3 || step === 4) && (
          <ReservationSystem
            step={step}
            setStep={setStep}
            selectedCar={selectedCar}
            search={search}
            days={days}
            fmt={fmt}
            onReset={handleReset}
          />
        )}
      </div>

      <ChatBot />
    </div>
  );
}