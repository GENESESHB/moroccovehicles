// src/app/voiture-electrique-location-maroc/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Electrique Maroc | Smart & EV 2026 | MoroccoVehicles',
  description: 'Louez une voiture electrique au Maroc. Dacia Spring, Tesla Model 3, Renault Zoe disponibles. Prix des 7 EUR par jour, sans frais de livraison. Recharge et assistance incluses.',
  keywords: ['location voiture electrique maroc', 'louer voiture electrique maroc', 'rent electric car morocco', 'dacia spring location maroc', 'tesla location maroc', 'bornes recharge maroc 2026'],
  openGraph: {
    title: 'Location Voiture Electrique au Maroc - MoroccoVehicles',
    description: 'Voitures electriques disponibles au Maroc. Dacia Spring des 7 EUR par jour, livraison gratuite et assistance 24/7.',
    url: 'https://moroccovehicles.com/voiture-electrique-location-maroc',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/voiture-electrique-location-maroc' },
  robots: { index: true, follow: true },
};

export default function ElectricPage() {
  const evs = [
    { name: 'Dacia Spring', price: '7 EUR', autonomy: '230 km', charge: '30 min (rapide)', seats: 4, label: 'Citadine EV', highlight: 'Plus Populaire' },
    { name: 'Renault Zoe E-Tech', price: '14 EUR', autonomy: '395 km', charge: '40 min (rapide)', seats: 5, label: 'Polyvalente', highlight: 'Grande Autonomie' },
    { name: 'Nissan Leaf', price: '18 EUR', autonomy: '270 km', charge: '45 min (rapide)', seats: 5, label: 'Compacte', highlight: 'Confort Urbain' },
    { name: 'Tesla Model 3', price: '75 EUR', autonomy: '560 km', charge: '25 min (Supercharge)', seats: 5, label: 'Berline Premium', highlight: 'Haut de Gamme' },
    { name: 'BYD Atto 3', price: '35 EUR', autonomy: '420 km', charge: '35 min (rapide)', seats: 5, label: 'SUV Electrique', highlight: 'SUV Moderne' },
    { name: 'Hyundai Kona EV', price: '28 EUR', autonomy: '484 km', charge: '48 min (rapide)', seats: 5, label: 'Crossover', highlight: 'Polyvalent' },
  ];

  const faqs = [
    { q: 'Ou recharger une voiture electrique au Maroc en 2026 ?', a: 'Le reseau national compte des stations de recharge rapide sur les autoroutes A1, A2 et A3 reliant Tanger, Rabat, Casablanca, Marrakech et Agadir. Les centres commerciaux, grands hotels et stations-service partenaires disposent de bornes de 50 a 150 kW.' },
    { q: 'La recharge initiale est-elle incluse dans la location ?', a: 'Chaque vehicule electrique vous est livre avec un niveau de batterie garanti a 80% minimum. Nous fournissons les cables Type 2 et Combo CCS adaptes aux standards de recharge marocains.' },
    { q: 'Peut-on voyager entre Casablanca et Marrakech en voiture electrique ?', a: 'Tout a fait. La distance de 240 km se parcourt sans difficulte avec une seule charge complete sur des modeles tels que la Renault Zoe, la BYD Atto 3 ou la Tesla Model 3, avec deux aires d arret equipees de bornes de recharge rapide sur l autoroute A3.' },
    { q: 'Existe-t-il des frais de livraison pour les vehicules electriques ?', a: 'Non, la livraison est gratuite dans les aeroports principaux (Casablanca Mohammed V, Marrakech Menara, Rabat-Sale, Tanger Ibn Batouta) et aux adresses urbaines de votre choix.' },
  ];

  const neighborLinks = [
    { name: 'Location sans frais de livraison', href: '/louer-voiture-maroc-sans-frais-livraison' },
    { name: 'Location a 7 EUR sans caution', href: '/location-voiture-maroc-7-euro-sans-livraison' },
    { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
    { name: 'Casablanca sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
    { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
    { name: 'Marrakech sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
    { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
    { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
    { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
    { name: 'Fes sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
    { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
    { name: 'Portail Partenaires B2B', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#dcfce7', color: '#14532d', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Mobilite Electrique 2026</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#16a34a' }}>Electrique</span> au Maroc<br />
          <span style={{ color: '#047857' }}>Des 7 EUR par jour - Sans Frais de Livraison</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Explorez le Maroc avec une flotte 100% propre et moderne. De la Dacia Spring urbaine a la Tesla Model 3 pour les longs trajets, profitez d une conduite silencieuse avec livraison gratuite et assistance permanente.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(22,163,74,.25)' }}>
            Reserver un Vehicule Electrique
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #16a34a', color: '#16a34a', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            Demande d Information
          </a>
        </div>
      </section>

      <section style={{ background: '#0f172a', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7 EUR', 'Dacia Spring par jour'], ['560 km', 'Autonomie max Tesla Model 3'], ['0 g', 'Emission directe de CO2'], ['6', 'Modeles electriques disponibles']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '34px', fontWeight: '900', color: '#4ade80' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Notre Flotte Electrique au Maroc</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          {evs.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', position: 'relative' }}>
              {v.highlight && <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#16a34a', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '999px' }}>{v.highlight}</div>}
              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>{v.label}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{v.name}</h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                <span>Autonomie : {v.autonomy}</span>
                <span>Recharge : {v.charge}</span>
                <span>Capacite : {v.seats} places</span>
                <span>Assurance incluse</span>
              </div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Selectionner ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes sur les Voitures Electriques au Maroc</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>{q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f1f5f9', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>
            Decouvrez Nos Autres Services et Destinations au Maroc
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
        2026 MoroccoVehicles - Service de location de vehicules au Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/terms" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Conditions Generales</Link>
      </footer>
    </div>
  );
}
