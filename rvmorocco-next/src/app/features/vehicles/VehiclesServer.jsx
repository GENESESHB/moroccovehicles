// VehiclesServer.jsx - Server Component pur (pas de 'use client')
import { VEHICLE_STATS, VEHICLES_LIST, Icons } from './constants';
import { faqs } from './faqs';
import styles from './vehicles.module.css';

export default function VehiclesServer() {
  return (
    <div className={styles.seoContent}>
      {/* HERO SECTION - Server Side */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.containerContent}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>
                <Icons.Car /> Gestion de Flotte
              </span>
              <h1>Gérez Votre Parc Automobile</h1>
              <p className={styles.heroSubtitle}>
                Système complet de gestion de flotte permettant l'ajout, la modification,
                le suivi des entretiens, la gestion des disponibilités et l'historique
                complet des locations. Chaque véhicule dispose d'une fiche détaillée
                avec photos, caractéristiques techniques et documents associés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Server Side */}
      <section className={styles.statsSection}>
        <div className={styles.containerContent}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard} style={{ borderLeftColor: '#36c275' }}>
              <div className={styles.statIcon} style={{ backgroundColor: '#36c27520', color: '#36c275' }}>
                <Icons.Car />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Total Véhicules</span>
                <span className={styles.statValue}>{VEHICLE_STATS.total}</span>
                <span className={styles.statSubtext}>Dans la flotte active</span>
              </div>
            </div>

            <div className={styles.statCard} style={{ borderLeftColor: '#22c55e' }}>
              <div className={styles.statIcon} style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}>
                <Icons.Check />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Disponibles</span>
                <span className={styles.statValue}>{VEHICLE_STATS.available}</span>
                <span className={styles.statSubtext}>Prêts à louer</span>
              </div>
            </div>

            <div className={styles.statCard} style={{ borderLeftColor: '#3b82f6' }}>
              <div className={styles.statIcon} style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
                <Icons.Clock />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>En Location</span>
                <span className={styles.statValue}>{VEHICLE_STATS.rented}</span>
                <span className={styles.statSubtext}>Actuellement en circulation</span>
              </div>
            </div>

            <div className={styles.statCard} style={{ borderLeftColor: '#f59e0b' }}>
              <div className={styles.statIcon} style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
                <Icons.Wrench />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Maintenance</span>
                <span className={styles.statValue}>{VEHICLE_STATS.maintenance}</span>
                <span className={styles.statSubtext}>En réparation ou révision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS SECTION - Server Side (sans graphiques interactifs) */}
      <section className={`${styles.moduleSection} ${styles.bgLight}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2><Icons.BarChart /> Analyse de la Flotte</h2>
            <p>
              Visualisez la répartition de vos véhicules par catégorie,
              suivez l'évolution de votre parc et analysez les coûts de maintenance
              pour optimiser vos investissements.
            </p>
          </div>

          <div className={styles.analyticsGridServer}>
            {/* Remplacement des graphiques par des données textuelles pour SEO */}
            <div className={styles.chartCard}>
              <h5><Icons.PieChart /> Répartition par Catégorie</h5>
              <ul className={styles.categoryList}>
                <li>Citadine: {VEHICLE_STATS.categories.citadine} véhicules</li>
                <li>Berline: {VEHICLE_STATS.categories.berline} véhicules</li>
                <li>SUV: {VEHICLE_STATS.categories.suv} véhicules</li>
                <li>Luxury: {VEHICLE_STATS.categories.luxury} véhicules</li>
                <li>Van: {VEHICLE_STATS.categories.van} véhicules</li>
              </ul>
            </div>

            <div className={styles.chartCard}>
              <h5><Icons.Activity /> Évolution de la Flotte</h5>
              <p>Données mensuelles des ajouts et retraits de véhicules sur 12 mois.</p>
              <ul>
                <li>Total ajouts cette année: {VEHICLE_STATS.monthlyAdditions.reduce((a, b) => a + b.added, 0)}</li>
                <li>Total retraits cette année: {VEHICLE_STATS.monthlyAdditions.reduce((a, b) => a + b.removed, 0)}</li>
              </ul>
            </div>

            <div className={styles.chartCard}>
              <h5><Icons.Wrench /> Coûts de Maintenance</h5>
              <p>Suivi des coûts préventifs et correctifs.</p>
              <ul>
                <li>Coût total maintenance (6 mois): {VEHICLE_STATS.maintenanceData.reduce((a, b) => a + b.cost, 0).toLocaleString()} MAD</li>
                <li>Interventions préventives: {VEHICLE_STATS.maintenanceData.reduce((a, b) => a + b.preventive, 0)}</li>
                <li>Interventions correctives: {VEHICLE_STATS.maintenanceData.reduce((a, b) => a + b.corrective, 0)}</li>
              </ul>
            </div>

            <div className={styles.insightCard}>
              <h5><Icons.Zap /> Insights Clés</h5>
              <ul className={styles.insightList}>
                <li>
                  <span className={styles.insightValue}>+24%</span>
                  <span className={styles.insightLabel}>Croissance du parc sur 12 mois</span>
                </li>
                <li>
                  <span className={styles.insightValue}>94.2%</span>
                  <span className={styles.insightLabel}>Taux de disponibilité moyen</span>
                </li>
                <li>
                  <span className={styles.insightValue}>12.5 jours</span>
                  <span className={styles.insightLabel}>Durée moyenne de location</span>
                </li>
                <li>
                  <span className={styles.insightValue}>8,450 MAD</span>
                  <span className={styles.insightLabel}>Coût moyen de maintenance/véhicule</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE LIST SECTION - Server Side */}
      <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
        <div className={styles.containerContent}>
          <div className={styles.listHeader}>
            <div className={styles.listTitle}>
              <h2><Icons.List /> Liste des Véhicules</h2>
              <span className={styles.countBadge}>{VEHICLES_LIST.length} véhicules</span>
            </div>
          </div>

          <div className={`${styles.vehiclesContainer} ${styles.grid}`}>
            {VEHICLES_LIST.map(vehicle => (
              <article key={vehicle.id} className={styles.vehicleCard}>
                <div className={styles.vehicleContent}>
                  <div className={styles.vehicleHeader}>
                    <h4>{vehicle.brand} {vehicle.model}</h4>
                    <span className={styles.vehicleYear}>{vehicle.year}</span>
                  </div>

                  <div className={styles.vehicleMeta}>
                    <span className={styles.vehicleType}>{vehicle.type}</span>
                    <span className={styles.vehiclePlate}>{vehicle.licensePlate}</span>
                  </div>

                  <div className={styles.vehicleSpecs}>
                    <div className={styles.spec}>
                      <Icons.Gauge />
                      <span>{vehicle.mileage.toLocaleString()} km</span>
                    </div>
                    <div className={styles.spec}>
                      <Icons.Fuel />
                      <span>{vehicle.fuelType}</span>
                    </div>
                    <div className={styles.spec}>
                      <Icons.Users />
                      <span>{vehicle.seats} places</span>
                    </div>
                  </div>

                  <div className={styles.vehiclePricing}>
                    <div className={styles.price}>
                      <span className={styles.priceValue}>{vehicle.dailyRate} MAD</span>
                      <span className={styles.priceLabel}>/jour</span>
                    </div>
                    <div className={styles.maintenanceInfo}>
                      <Icons.Calendar />
                      <span>Prochaine révision: {vehicle.nextMaintenance}</span>
                    </div>
                  </div>

                  {vehicle.damageReports.length > 0 && (
                    <div className={styles.damageAlert}>
                      <Icons.AlertCircle />
                      <span>{vehicle.damageReports.length} dommage(s) signalé(s)</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Server Side */}
      <section className={`${styles.moduleSection} ${styles.bgLight}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2><Icons.Settings /> Fonctionnalités du Système</h2>
            <p>
              Explorez les capacités complètes du module de gestion des véhicules,
              de l'ajout initial au suivi avancé des opérations.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3><Icons.Plus /> Ajout de Véhicules</h3>
              <p>Processus complet d'intégration avec informations générales, caractéristiques techniques, upload de photos et documents légaux.</p>
            </div>
            <div className={styles.featureCard}>
              <h3><Icons.Edit /> Modification</h3>
              <p>Gestion du cycle de vie complet : mise à jour kilométrage, ajustement tarifaire, changement de statut, renouvellement documents.</p>
            </div>
            <div className={styles.featureCard}>
              <h3><Icons.Alert /> Gestion des Dommages</h3>
              <p>Suivi complet des incidents : constat initial, évaluation, réparation et clôture avec analyse statistique des coûts.</p>
            </div>
            <div className={styles.featureCard}>
              <h3><Icons.Wrench /> Maintenance</h3>
              <p>Planification automatique des entretiens préventifs et gestion des pannes correctives avec calendrier visuel.</p>
            </div>
            <div className={styles.featureCard}>
              <h3><Icons.FileText /> Documents</h3>
              <p>Coffre-fort numérique pour assurances, contrôles techniques et cartes grises avec alertes d'expiration automatiques.</p>
            </div>
            <div className={styles.featureCard}>
              <h3><Icons.Code /> Architecture API</h3>
              <p>Structure technique complète avec endpoints RESTful, modèle de données relationnel et documentation d'intégration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Server Side */}
      <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2>Questions Fréquentes</h2>
            <p>Tout savoir sur la gestion de votre flotte automobile au Maroc</p>
          </div>

          <div className={styles.faqContainer} style={{maxWidth: '800px', margin: '0 auto'}}>
            {faqs.map((faq, index) => (
              <details key={index} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Server Side */}
      <section className={styles.ctaSection}>
        <div className={styles.containerContent}>
          <div className={styles.ctaBox}>
            <h2>Optimisez la Gestion de Votre Flotte</h2>
            <p>
              Gérez efficacement vos {VEHICLE_STATS.total} véhicules avec notre solution complète
              de suivi, maintenance et analyse des performances. Intégration API
              disponible pour connecter vos systèmes existants.
            </p>
            <div className={styles.ctaStats}>
              <span><Icons.Check /> Ajout en 2 minutes</span>
              <span>•</span>
              <span><Icons.Shield /> Documents sécurisés</span>
              <span>•</span>
              <span><Icons.Activity /> Suivi temps réel</span>
              <span>•</span>
              <span><Icons.Database /> Backup automatique</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}