'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/app/utils/api';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import ReservationSystem from './ReservationSystem';
import ChatBot from './ChatBot';
import '../styles/Booking.css';

/* =========================================================
   BookingWizard – Main orchestrator component
   ========================================================= */
export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('normal');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
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

  /* ── Fetch location on mount ── */
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
  }, []);

  /* ── Fetch vehicles when search changes ── */
  const handleSearch = async () => {
    setSearchLoading(true);
    setStep(1); // Go to vehicle selection step

    try {
      // Call your backend API with search params
      const response = await api.get('/vehicles/public/available', {
        params: {
          pickup: search.pickup,
          dropoff: search.dropoff,
          dateFrom: search.dateFrom,
          dateTo: search.dateTo,
          category: category
        }
      });

      if (response.data?.success) {
        setVehicles(response.data.vehicles);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback: load all vehicles if API fails
      try {
        const fallback = await api.get('/vehicles/public/available');
        if (fallback.data?.success) {
          setVehicles(fallback.data.vehicles);
        }
      } catch (e) {
        setVehicles([]);
      }
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };

  /* ── Initial load ── */
  useEffect(() => {
    handleSearch();
  }, []);

  const days = () => {
    const a = new Date(search.dateFrom);
    const b = new Date(search.dateTo);
    const diff = Math.ceil((b - a) / 86400000);
    return diff > 0 ? diff : 1;
  };

  const isLuxe = v => v.pricePerDay >= 500 || v.type?.toLowerCase().includes('premium') || v.type?.toLowerCase().includes('coupé');

  const filteredVehicles = vehicles.filter(v => category === 'luxe' ? isLuxe(v) : !isLuxe(v));

  const proximityVehicles = [...vehicles]
    .sort((a, b) => {
      const aMatch = a.partnerId?.city?.toLowerCase() === userCity.toLowerCase() ? 1 : 0;
      const bMatch = b.partnerId?.city?.toLowerCase() === userCity.toLowerCase() ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const handleBook = car => {
    setSelectedCar(car);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCar(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fmt = dateStr => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="booking-page">
      {/* ── HERO ── */}
      <HeroSection
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        loading={searchLoading}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="booking-main">
        {/* Step Tracker */}
        <div className="step-track">
          <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
            <span className="step-circle">{step > 1 ? '✓' : '1'}</span>
            <span>Choisir un véhicule</span>
          </div>
          <div className={`step-connector ${step > 1 ? 'done' : ''}`} />
          <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
            <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
            <span>Détails & Options</span>
          </div>
          <div className={`step-connector ${step > 2 ? 'done' : ''}`} />
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* ── STEP 1: Product Grid ── */}
        {step === 1 && (
          <ProductGrid
            vehicles={vehicles}
            filteredVehicles={filteredVehicles}
            proximityVehicles={proximityVehicles}
            userCity={userCity}
            isLuxe={isLuxe}
            loading={loading || searchLoading}
            locationLoading={locationLoading}
            category={category}
            onBook={handleBook}
          />
        )}

        {/* ── STEP 2 & 3: Reservation System ── */}
        {(step === 2 || step === 3) && (
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

      {/* ── CHATBOT ── */}
      <ChatBot />
    </div>
  );
}