// src/app/location-voiture-casablanca-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Casablanca Pas Cher | Des 7 EUR par jour | MoroccoVehicles',
  description: 'Louez une voiture a Casablanca au meilleur prix des 7 EUR par jour. Sans frais caches, livraison gratuite aeroport Mohammed V (CMN), gare Casa-Voyageurs et centre-ville. Assistance 24/7.',
  keywords: ['location voiture casablanca', 'location voiture casablanca pas cher', 'louer voiture casablanca', 'voiture moins chere casablanca', 'rent a car casablanca maroc 2026'],
  openGraph: {
    title: 'Location Voiture Casablanca Pas Cher - MoroccoVehicles',
    description: 'Les meilleurs prix pour louer une voiture a Casablanca. Des 7 EUR par jour, sans frais de livraison.',
    url: 'https://moroccovehicles.com/location-voiture-casablanca-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-casablanca-pas-cher' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7 EUR', category: 'Economique', fuel: 'Diesel', seats: 5, transmission: 'Manuelle' },
  { name: 'Hyundai i10', price: '8 EUR', category: 'Citadine', fuel: 'Essence', seats: 5, transmission: 'Manuelle' },
  { name: 'Renault Clio', price: '9 EUR', category: 'Compacte', fuel: 'Essence', seats: 5, transmission: 'Manuelle' },
  { name: 'Dacia Duster', price: '14 EUR', category: 'SUV', fuel: 'Diesel', seats: 5, transmission: 'Manuelle' },
  { name: 'Volkswagen Golf', price: '18 EUR', category: 'Confort', fuel: 'Essence', seats: 5, transmission: 'Automatique' },
  { name: 'Toyota Corolla Hybride', price: '22 EUR', category: 'Berline', fuel: 'Hybride', seats: 5, transmission: 'Automatique' },
];

const faqs = [
  { q: 'Ou puis-je recuperer ma voiture a Casablanca ?', a: 'La prise en charge est gratuite a l aeroport Mohammed V (Terminaux 1 et 2), aux gares Casa-Voyageurs et Casa-Port, ainsi qu a votre hotel ou residence en centre-ville.' },
  { q: 'Quel est le tarif plancher pour louer une voiture a Casablanca ?', a: 'Nos tarifs debutent a 7 EUR par jour pour les citadines economiques (Dacia Logan, Hyundai i10). Ce tarif inclut l assurance de responsabilite civile, le kilometrage illimite et la TVA.' },
  { q: 'Quels sont les documents demandes pour le contrat de location ?', a: 'Une piece d identite valide (CIN marocaine ou passeport en cours de validite pour les touristes et MRE) ainsi qu un permis de conduire original valable depuis au moins un an.' },
  { q: 'Comment fonctionne la caution a Casablanca ?', a: 'La caution est realisee par simple pre-autorisation bancaire (empreinte de carte sans debit reel). Aucun prelevement n est effectue si le vehicule est restitue dans son etat initial.' },
];

const neighborLinks = [
  { name: 'Casablanca 7 EUR sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Marrakech sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
  { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
  { name: 'Fes sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
  { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
  { name: 'Portail Gestion de Flotte B2B', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function CasablancaPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#36c275', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Assistance WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Casablanca & Aeroport Mohammed V</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#16a34a' }}>Casablanca</span> Pas Cher<br />
          <span style={{ color: '#0f172a' }}>A partir de 7 EUR par jour - Livraison Gratuite</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Louez votre voiture a Casablanca au meilleur tarif garanti. Remise express au Terminal 1 ou 2 de l aeroport Mohammed V, en centre-ville Maatif, Gauthier ou aux gares ONCF. Contrat digitalise et aucun frais cache.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(22,163,74,.25)' }}>
            Reserver a Casablanca
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #16a34a', color: '#16a34a', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            Contacter par WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7 EUR', 'Prix de depart journalier'], ['0 EUR', 'Frais de mise a disposition'], ['24/7', 'Assistance aeroportuaire'], ['100%', 'Kilometrage illimite']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '34px', fontWeight: '900', color: '#4ade80' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
          Nos Modeles Disponibles a Casablanca
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                <span>Carburant : {v.fuel}</span>
                <span>Places : {v.seats} personnes</span>
                <span>Boite : {v.transmission}</span>
                <span>Assurance incluse</span>
              </div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Reserver ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' }}>Avantages Exclusifs pour votre Sejour a Casablanca</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '28px' }}>
            {[
              { title: 'Transparence Absolue', desc: 'Tarifs des 7 EUR par jour, toutes taxes et assurance de responsabilite civile incluses. Aucun frais cache.' },
              { title: 'Livraison Aeroport Gratuite', desc: 'Prise en charge au Terminal 1 et Terminal 2 de Casablanca Mohammed V sans surcout d aeroport.' },
              { title: 'Contrat Digital & Etat des Lieux', desc: 'Inspection 2D sur tablette avec reperage precis des eventuelles micro-rayures existantes.' },
              { title: 'Assistance Continue 24/7', desc: 'Notre equipe d assistance intervient sur toute la region du Grand Casablanca et les axes autoroutiers.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '24px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes sur la Location a Casablanca</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{q}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f1f5f9', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>
            Consultez les Destinations et Offres Associees
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {neighborLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: '#fff',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'center', padding: '28px 20px', fontSize: '13px' }}>
        2026 MoroccoVehicles - Casablanca, Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Contact</Link>
      </footer>
    </div>
  );
}
