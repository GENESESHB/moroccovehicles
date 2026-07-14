// src/app/location-voiture-agadir-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Agadir Pas Cher | Dès 7€/jour | MoroccoVehicles',
  description: 'Location voiture Agadir à prix discount dès 7€/jour. Livraison gratuite à l\'aéroport Al Massira. Parfait pour plages et excursions Souss-Massa. Réservez en ligne.',
  keywords: ['location voiture agadir', 'louer voiture agadir pas cher', 'rent a car agadir', 'voiture location agadir', 'location auto agadir maroc'],
  openGraph: {
    title: 'Location Voiture Agadir Pas Cher - MoroccoVehicles',
    description: 'Louez une voiture à Agadir dès 7€/jour. Livraison aéroport Al Massira gratuite.',
    url: 'https://moroccovehicles.com/location-voiture-agadir-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-agadir-pas-cher' },
  robots: { index: true, follow: true },
};

export default function AgadirPage() {
  const vehicles = [
    { name: 'Dacia Logan', price: '7€', category: 'Économique', icon: '🚗', desc: 'Diesel, 5 places, idéal ville' },
    { name: 'Hyundai i20', price: '9€', category: 'Citadine', icon: '🚙', desc: 'Essence, clim, confort' },
    { name: 'Dacia Sandero', price: '10€', category: 'Compacte', icon: '🚗', desc: 'Diesel, grand coffre' },
    { name: 'Dacia Duster', price: '15€', category: 'SUV', icon: '🏖️', desc: 'Idéal plages et pistes' },
    { name: 'Kia Sportage', price: '24€', category: 'SUV Premium', icon: '✨', desc: '4x4, automatique' },
    { name: 'Mercedes Classe C', price: '55€', category: 'Luxe', icon: '🌟', desc: 'Pour voyages d\'affaires' },
  ];

  return (
    <div style={{ background: '#f0f9ff', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#0ea5e9', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#bae6fd', color: '#0c4a6e', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>🌊 Agadir Balnéaire</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#0ea5e9' }}>Agadir</span> Pas Cher<br />
          <span style={{ color: '#36c275' }}>Dès 7€/jour — Plages & Excursions</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Explorez les plages d&apos;Agadir, Taghazout, Essaouira et le désert de Sahara à votre rythme. Livraison gratuite à l&apos;aéroport Al Massira. Tarifs tout inclus sans surprise.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(14,165,233,.35)' }}>
            Réserver Maintenant →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #0ea5e9', color: '#0ea5e9', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Prix / jour dès'], ['0€', 'Frais aéroport'], ['∞', 'Km illimité'], ['300+', 'Clients à Agadir']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#7dd3fc' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#bae6fd', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>🚗 Véhicules Disponibles à Agadir</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e0f2fe' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0ea5e9' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.desc}</p>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#0ea5e9', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver ce véhicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Profitez d&apos;Agadir en liberté 🌊</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Réservez votre voiture maintenant, livraison aéroport Al Massira gratuite.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#0ea5e9', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
