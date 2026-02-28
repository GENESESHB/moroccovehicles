// VehiclesServer.jsx - Server Component pour le contenu SEO
import { VEHICLE_STATS, VEHICLES_LIST } from './constants';

export default function VehiclesServerContent() {
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* Contenu caché pour SEO - visible par Googlebot */}
      <article>
        <header>
          <h1>Gestion de Flotte Automobile - Smart Car Location</h1>
          <p>
            Système complet de gestion de parc automobile au Maroc permettant 
            l'ajout, la modification, le suivi des entretiens et la gestion 
            des disponibilités. Notre solution gère {VEHICLE_STATS.total} véhicules 
            répartis en catégories Citadine, Berline, SUV, Luxury et Van.
          </p>
        </header>

        <section>
          <h2>Statistiques de la Flotte</h2>
          <ul>
            <li>Total véhicules: {VEHICLE_STATS.total}</li>
            <li>Disponibles: {VEHICLE_STATS.available}</li>
            <li>En location: {VEHICLE_STATS.rented}</li>
            <li>En maintenance: {VEHICLE_STATS.maintenance}</li>
          </ul>
        </section>

        <section>
          <h2>Répartition par Catégorie</h2>
          <ul>
            <li>Citadine: {VEHICLE_STATS.categories.citadine} véhicules</li>
            <li>Berline: {VEHICLE_STATS.categories.berline} véhicules</li>
            <li>SUV: {VEHICLE_STATS.categories.suv} véhicules</li>
            <li>Luxury: {VEHICLE_STATS.categories.luxury} véhicules</li>
            <li>Van: {VEHICLE_STATS.categories.van} véhicules</li>
          </ul>
        </section>

        <section>
          <h2>Liste des Véhicules</h2>
          {VEHICLES_LIST.map(vehicle => (
            <article key={vehicle.id}>
              <h3>{vehicle.brand} {vehicle.model} ({vehicle.year})</h3>
              <p>Catégorie: {vehicle.category}, Type: {vehicle.type}</p>
              <p>Statut: {vehicle.status}, Tarif: {vehicle.dailyRate} MAD/jour</p>
              <p>Immatriculation: {vehicle.licensePlate}, Kilométrage: {vehicle.mileage} km</p>
              <p>Carburant: {vehicle.fuelType}, Places: {vehicle.seats}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>Fonctionnalités du Système</h2>
          <ul>
            <li>Ajout de nouveaux véhicules avec fiches détaillées</li>
            <li>Modification et mise à jour des informations</li>
            <li>Gestion des dommages et réparations</li>
            <li>Planification des maintenances préventives</li>
            <li>Gestion documentaire (assurances, contrôle technique)</li>
            <li>Architecture API RESTful</li>
          </ul>
        </section>

        <footer>
          <p>Smart Car Location - Solution de gestion de flotte automobile au Maroc</p>
        </footer>
      </article>
    </div>
  );
}