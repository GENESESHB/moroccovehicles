// src/app/location-voiture-tanger-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Tanger Pas Cher | Dès 7€/jour | MoroccoVehicles',
  description: 'Location voiture Tanger dès 7€/jour. Idéal pour l\'arrivée au port de Tanger Med. Livraison aéroport Ibn Batouta gratuite. Tarif journalier sans frais cachés.',
  keywords: ['location voiture tanger', 'louer voiture tanger pas cher', 'rent a car tanger', 'location auto tanger', 'voiture tanger med'],
  openGraph: {
    title: 'Location Voiture Tanger Pas Cher - MoroccoVehicles',
    description: 'Louez une voiture à Tanger dès 7€/jour. Livraison aéroport Ibn Batouta et port Tanger Med.',
    url: 'https://moroccovehicles.com/location-voiture-tanger-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-tanger-pas-cher' },
  robots: { index: true, follow: true },
};

export default function TangerPage() {
  const vehicles = [
    { name: 'Dacia Logan', price: '7€', category: 'Économique', icon: '🚗', note: 'Parfait pour la ville' },
    { name: 'Renault Clio', price: '9€', category: 'Compacte', icon: '🚙', note: 'Confort citadin' },
    { name: 'Dacia Duster', price: '15€', category: 'SUV', icon: '⛵', note: 'Idéal littoral nord' },
    { name: 'Seat Leon', price: '18€', category: 'Berline Sport', icon: '🏎️', note: 'Sportif et confort' },
    { name: 'Kia Picanto', price: '8€', category: 'Mini', icon: '🚗', note: 'Économique parking' },
    { name: 'Mercedes GLA', price: '65€', category: 'SUV Luxe', icon: '✨', note: 'Arrivée VIP' },
  ];

  return (
    <div style={{ background: '#f0fdfa', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#0d9488', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#ccfbf1', color: '#134e4a', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>⛵ Tanger — Porte du Détroit</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#0d9488' }}>Tanger</span> Pas Cher<br />
          <span style={{ color: '#36c275' }}>Dès 7€/jour — Port & Aéroport</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Arrivé au port de Tanger Med ou à l&apos;aéroport Ibn Batouta ? Récupérez votre voiture immédiatement sans attente. Idéal pour explorer le nord du Maroc : Chefchaouen, Tétouan, Asilah.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            Réserver Maintenant →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #0d9488', color: '#0d9488', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#042f2e,#134e4a)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Prix / jour dès'], ['0€', 'Livraison port/aéroport'], ['∞', 'Km illimité'], ['250+', 'Clients à Tanger']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#5eead4' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#99f6e4', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>🚗 Flotte Disponible à Tanger</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #ccfbf1' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#ccfbf1', color: '#0f766e', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0d9488' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.note} · Km illimité · Assurance incluse</p>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#0d9488', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Bienvenue à Tanger ! ⛵</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Votre voiture vous attend au port ou à l&apos;aéroport. Réservez en 2 minutes.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#0d9488', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
