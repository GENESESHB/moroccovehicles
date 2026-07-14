// src/app/voiture-electrique-location-maroc/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Électrique Maroc | Smart & EV | MoroccoVehicles',
  description: 'Louez une voiture électrique au Maroc. Dacia Spring, Tesla Model 3, Renault Zoé disponibles. Prix dès 7€/jour, sans frais de livraison. Recharge incluse dans les villes principales.',
  keywords: ['location voiture electrique maroc', 'louer voiture electrique maroc', 'rent electric car morocco', 'dacia spring location maroc', 'tesla location maroc'],
  openGraph: {
    title: 'Location Voiture Électrique au Maroc - MoroccoVehicles',
    description: 'Voitures électriques disponibles au Maroc. Dacia Spring dès 7€/jour, livraison gratuite.',
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
    { name: 'Dacia Spring', price: '7€', autonomy: '230 km', charge: '30 min (rapide)', seats: 4, icon: '⚡', highlight: 'Best Seller' },
    { name: 'Renault Zoé', price: '14€', autonomy: '395 km', charge: '40 min (rapide)', seats: 5, icon: '⚡', highlight: 'Grande Autonomie' },
    { name: 'Nissan Leaf', price: '18€', autonomy: '270 km', charge: '45 min (rapide)', seats: 5, icon: '⚡', highlight: 'Fiable & Confort' },
    { name: 'Tesla Model 3', price: '75€', autonomy: '560 km', charge: '25 min (Supercharger)', seats: 5, icon: '🚀', highlight: 'Premium' },
    { name: 'BYD Atto 3', price: '35€', autonomy: '420 km', charge: '35 min (rapide)', seats: 5, icon: '⚡', highlight: 'SUV Électrique' },
    { name: 'Hyundai Kona EV', price: '28€', autonomy: '484 km', charge: '48 min (rapide)', seats: 5, icon: '⚡', highlight: 'Polyvalent' },
  ];

  const faqs = [
    { q: 'Où recharger ma voiture électrique au Maroc ?', a: 'Les principales villes (Casablanca, Marrakech, Rabat, Agadir) disposent de bornes de recharge rapides. Nous vous fournissons une carte des stations incluse dans la location.' },
    { q: 'La recharge est-elle incluse dans le prix ?', a: 'Le véhicule vous est remis avec 80% de charge. La recharge pendant votre séjour est à votre charge, mais nous vous assistons pour trouver les meilleures bornes.' },
    { q: 'Puis-je faire une longue distance avec un électrique au Maroc ?', a: 'Pour les longues distances, nous recommandons la Renault Zoé (395 km) ou la Tesla Model 3 (560 km). Le réseau de recharge sur l\'axe Casablanca-Marrakech est bien développé.' },
    { q: 'Quelle voiture électrique pour Marrakech-Agadir ?', a: 'Nous recommandons la Tesla Model 3 ou la BYD Atto 3 pour ce trajet de 240 km. Avec une charge de départ à 100%, le trajet est confortable avec une seule recharge optionnelle.' },
  ];

  return (
    <div style={{ background: '#f0fdf4', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#dcfce7', color: '#14532d', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>⚡ Mobilité Électrique</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#16a34a' }}>Électrique</span> au Maroc<br />
          <span style={{ color: '#f59e0b' }}>Dès 7€/jour — Éco-Responsable</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Découvrez le Maroc de façon éco-responsable avec nos voitures électriques. De la Dacia Spring économique à la Tesla Model 3 premium. Livraison gratuite, assurance incluse.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(22,163,74,.35)' }}>
            Réserver un EV →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #16a34a', color: '#16a34a', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 Conseils WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Dacia Spring / jour'], ['560km', 'Autonomie max Tesla'], ['0g', 'CO₂ émis'], ['6', 'Modèles EV dispo']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#86efac' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#bbf7d0', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>⚡ Notre Flotte Électrique</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          {evs.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #dcfce7', position: 'relative', overflow: 'hidden' }}>
              {v.highlight && <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#16a34a', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '999px' }}>{v.highlight}</div>}
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{v.name}</h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#16a34a' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                <span>🔋 {v.autonomy}</span>
                <span>⚡ {v.charge}</span>
                <span>👥 {v.seats} places</span>
                <span>✅ Assurance incluse</span>
              </div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver ce véhicule EV
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>FAQ – Voitures Électriques au Maroc</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f0fdf4', padding: '24px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#14532d' }}>⚡ {q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Voyagez Vert au Maroc ⚡🇲🇦</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Réservez votre voiture électrique, livraison gratuite, zéro émission.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#16a34a', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver un EV Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
