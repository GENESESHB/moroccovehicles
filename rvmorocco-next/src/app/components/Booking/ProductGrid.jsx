'use client';

/* =========================================================
   ProductGrid – Vehicle Cards + Proximity Section
   ========================================================= */
function CarCard({ car, userCity, isLuxe, onBook }) {
  const nearby = car.partnerId?.city?.toLowerCase() === userCity?.toLowerCase();

  return (
    <article className="car-card">
      <div className="car-img-wrap">
        <img
          src={car.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80'}
          alt={car.name}
          className="car-img"
          loading="lazy"
        />
        {isLuxe && <span className="badge-luxe">Prestige</span>}
        {nearby && !isLuxe && <span className="badge-nearby">À Proximité</span>}
      </div>
      <div className="car-body">
        <div className="car-top-row">
          <span className="car-type-chip">{car.type || 'Standard'}</span>
          <span className="car-city">{car.partnerId?.city || ''}</span>
        </div>
        <h3 className="car-name">{car.name}</h3>
        <p className="car-desc">{car.description || 'Véhicule fiable et confortable.'}</p>
        <div className="car-specs-row">
          <div className="spec-chip">{car.transmission || 'Manuelle'}</div>
          <div className="spec-chip">{car.seats || 5} places</div>
          <div className="spec-chip">{car.doors || 4} portes</div>
        </div>
        <div className="car-footer">
          <div className="car-price-block">
            <span className="price-num">{car.pricePerDay} MAD</span>
            <span className="price-label">/jour</span>
          </div>
          <button className="reserve-btn" onClick={() => onBook(car)}>Réserver</button>
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