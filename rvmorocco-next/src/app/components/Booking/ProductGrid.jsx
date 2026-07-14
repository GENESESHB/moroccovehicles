'use client';

/* =========================================================
   ProductGrid – Vehicle Cards + Proximity Section
   ========================================================= */
function CarCard({ car, userCity, isLuxe, onBook }) {
  const nearby = car.partnerId?.city?.toLowerCase() === userCity?.toLowerCase();
  const isSmart = car.vehicleSource === 'smartcar';

  return (
    <article className="car-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="car-img-wrap" style={{ position: 'relative' }}>
        <img
          src={car.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80'}
          alt={car.name}
          className="car-img"
          loading="lazy"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        {isLuxe && <span className="badge-luxe" style={{ position: 'absolute', top: '12px', left: '12px', background: '#f59e0b', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Prestige</span>}
        {isSmart && <span className="badge-smart" style={{ position: 'absolute', top: '12px', right: '12px', background: '#3b82f6', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Luxury Connecté</span>}
        {nearby && !isLuxe && <span className="badge-nearby" style={{ position: 'absolute', top: '12px', left: '12px', background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>À Proximité</span>}
      </div>
      <div className="car-body" style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div className="car-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="car-type-chip" style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{car.type || 'Standard'}</span>
          <span className="car-city" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {car.partnerId?.city || 'Maroc'}
          </span>
        </div>
        <h3 className="car-name" style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{car.name}</h3>
        <p className="car-desc" style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px' }}>{car.description || 'Véhicule fiable et confortable.'}</p>
        
        {/* Partner Agency Banner */}
        <div className="partner-agency-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#36c275', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
            {car.partnerId?.entreprise?.charAt(0) || 'A'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700' }}>Agence Partenaire</span>
            <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>{car.partnerId?.entreprise || car.partnerId?.name || 'Agence Locale'}</span>
          </div>
        </div>

        <div className="car-specs-row" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div className="spec-chip" style={{ background: '#f8fafc', color: '#64748b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', border: '1px solid #e2e8f0' }}>{car.transmission || car.boiteVitesse || 'Manuelle'}</div>
          <div className="spec-chip" style={{ background: '#f8fafc', color: '#64748b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', border: '1px solid #e2e8f0' }}>{car.carburant || 'Gasoil'}</div>
        </div>
        <div className="car-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div className="car-price-block">
            <span className="price-num" style={{ fontSize: '20px', fontWeight: '800', color: '#36c275' }}>{car.pricePerDay} MAD</span>
            <span className="price-label" style={{ fontSize: '12px', color: '#64748b' }}>/jour</span>
          </div>
          <button className="reserve-btn" onClick={() => onBook(car)} style={{ background: '#36c275', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }}>Réserver</button>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ 
  vehicles, 
  filteredVehicles, 
  proximityVehicles,
  userCity, 
  isLuxe, 
  loading, 
  locationLoading,
  category,
  onBook 
}) {
  return (
    <>
      {/* ── GEO BANNER ── */}
      {!locationLoading && userCity && (
        <div className="geo-banner">
          <div className="geo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div className="geo-text">
            <h4>Position détectée : {userCity}, Maroc</h4>
            <p>Les véhicules les plus proches de votre localisation sont mis en avant.</p>
          </div>
        </div>
      )}

      {/* ── FILTERED VEHICLES ── */}
      <h2 className="section-heading">
        Véhicules {category === 'luxe' ? 'Prestige & Luxe' : category === 'electrique' ? '100% Électriques' : 'Standard'} disponibles
        <span className="count-pill">{filteredVehicles.length}</span>
      </h2>

      {loading ? (
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Recherche des véhicules disponibles…</p>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="empty-state">
          Aucun véhicule disponible dans cette catégorie. Essayez l'autre catégorie.
        </div>
      ) : (
        <div className="vehicles-grid">
          {filteredVehicles.map(car => (
            <CarCard 
              key={car._id} 
              car={car} 
              userCity={userCity} 
              isLuxe={isLuxe(car)} 
              onBook={onBook} 
            />
          ))}
        </div>
      )}

      {/* ── PROXIMITY VEHICLES ── */}
      {!loading && vehicles.length > 0 && (
        <>
          <h2 className="section-heading" style={{ marginTop: '48px' }}>
            Véhicules à proximité de {userCity || 'votre région'}
            <span className="count-pill">{proximityVehicles.length}</span>
          </h2>
          <div className="vehicles-grid">
            {proximityVehicles.map(car => (
              <CarCard 
                key={`prox-${car._id}`} 
                car={car} 
                userCity={userCity} 
                isLuxe={isLuxe(car)} 
                onBook={onBook} 
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}