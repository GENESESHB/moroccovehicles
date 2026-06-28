'use client';

export default function SearchResults({ vehicles, loading, onBook, search, days }) {
  if (loading) {
    return <div className="loading-spinner">Recherche en cours...</div>;
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="no-results">
        <p>Aucun véhicule disponible pour ces critères.</p>
        <p>Ville : {search.pickup} → {search.dropoff}</p>
        <p>Du {search.dateFrom} au {search.dateTo}</p>
        <button onClick={() => window.history.back()}>Modifier la recherche</button>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>{vehicles.length} véhicule(s) disponible(s)</h2>
      <div className="product-grid">
        {vehicles.map(car => (
          <div key={car._id} className="car-card">
            <img src={car.image || '/placeholder.jpg'} alt={car.name} />
            <h3>{car.name}</h3>
            <p>{car.type} - {car.seats} places</p>
            <p><strong>{car.pricePerDay} MAD</strong> / jour</p>
            <button className="btn-book" onClick={() => onBook(car)}>
              Réserver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}