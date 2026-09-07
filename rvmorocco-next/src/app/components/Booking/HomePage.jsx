'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/utils/api';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import ChatBot from './ChatBot';
import '../../styles/Booking.css';

export default function HomePage() {
  const router = useRouter();

  const [category, setCategory] = useState('normal');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);

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

  const isLuxe = (v) => v.pricePerDay >= 500 || v.type?.toLowerCase().includes('premium');

  const getFilteredVehicles = (list) => {
    if (category === 'luxe') {
      return list.filter(v => isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
    }
    if (category === 'electrique') {
      return list.filter(v => v.carburant?.toLowerCase() === 'electrique' || v.type?.toLowerCase().includes('electri'));
    }
    return list.filter(v => !isLuxe(v) && v.carburant?.toLowerCase() !== 'electrique');
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      pickup: search.pickup,
      dropoff: search.dropoff,
      dateFrom: search.dateFrom,
      dateTo: search.dateTo,
      category: category,
    }).toString();

    router.push(`/search?${query}`);
  };

  const handleBook = (car) => {
    router.push(`/booking?carId=${car._id}&step=3`);
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
        loading={false}
      />
      <div className="booking-main" style={{ marginTop: '0', paddingTop: '40px' }}>
        <div className="step1-container" style={{ padding: '0 20px' }}>
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
      </div>
      <ChatBot />
    </div>
  );
}
