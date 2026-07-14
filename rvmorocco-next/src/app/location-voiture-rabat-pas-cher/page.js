// src/app/location-voiture-rabat-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Rabat Pas Cher | Dès 7€/jour | MoroccoVehicles',
  description: 'Location voiture Rabat à partir de 7€/jour. Livraison gratuite aéroport Rabat-Salé, gare Rabat-Ville ou à votre adresse. Sans livraison payante. Réservez instantanément.',
  keywords: ['location voiture rabat', 'louer voiture rabat pas cher', 'rent a car rabat', 'location auto rabat', 'voiture moins chère rabat'],
  openGraph: {
    title: 'Location Voiture Rabat Pas Cher - MoroccoVehicles',
    description: 'Louez une voiture à Rabat dès 7€/jour. Livraison aéroport Rabat-Salé gratuite.',
    url: 'https://moroccovehicles.com/location-voiture-rabat-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-rabat-pas-cher' },
  robots: { index: true, follow: true },
};

export default function RabatPage() {
  const vehicles = [
    { name: 'Dacia Logan', price: '7€', category: 'Économique', icon: '🚗', fuel: 'Diesel' },
    { name: 'Renault Clio', price: '9€', category: 'Compacte', icon: '🚙', fuel: 'Essence' },
    { name: 'Volkswagen Polo', price: '12€', category: 'Confort', icon: '🚗', fuel: 'Essence' },
    { name: 'Dacia Duster', price: '16€', category: 'SUV', icon: '🏛️', fuel: 'Diesel' },
    { name: 'Peugeot 308', price: '19€', category: 'Berline', icon: '🚗', fuel: 'Diesel' },
    { name: 'BMW Série 3', price: '60€', category: 'Luxe Business', icon: '💼', fuel: 'Essence' },
  ];

  const faqs = [
    { q: 'Puis-je récupérer ma voiture à la gare de Rabat ?', a: 'Oui, nous livrons gratuitement à la gare Rabat-Ville, à l\'aéroport Rabat-Salé, au Parlement ou à votre hôtel en médina.' },
    { q: 'Y a-t-il des réductions pour les locations longue durée à Rabat ?', a: 'Oui, au-delà de 7 jours vous bénéficiez d\'une remise de 10%, au-delà de 14 jours une remise de 20%.' },
    { q: 'Puis-je aller jusqu\'à Casablanca avec la voiture ?', a: 'Oui, la circulation inter-villes est autorisée. L\'autoroute Rabat-Casablanca fait environ 90km, compris dans le kilométrage illimité.' },
    { q: 'Y a-t-il un dépôt de garantie ?', a: 'Une simple empreinte de carte bancaire suffit. Aucun montant n\'est prélevé si le véhicule est restitué en bon état.' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#6366f1', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#e0e7ff', color: '#312e81', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>🏛️ Rabat Capitale</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#6366f1' }}>Rabat</span> Pas Cher<br />
          <span style={{ color: '#36c275' }}>Dès 7€/jour — Livraison Gratuite</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Louez votre voiture à Rabat pour explorer la capitale du Maroc, visiter la Kasbah des Oudayas, ou relier Casablanca, Salé et Kenitra. Kilométrage illimité, prix transparent.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}>
            Réserver Maintenant →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #6366f1', color: '#6366f1', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Prix / jour dès'], ['0€', 'Livraison aéroport'], ['∞', 'Km illimité'], ['350+', 'Clients à Rabat']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#a5b4fc' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#c7d2fe', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>🚗 Flotte à Rabat</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#6366f1' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>⛽ {v.fuel} · 👥 5 places · 🛣️ Km illimité</p>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#6366f1', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>FAQ – Location à Rabat</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e0e7ff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#312e81' }}>❓ {q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Explorez Rabat en voiture 🏛️</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Livraison gratuite, kilométrage illimité, prix garanti dès 7€/jour.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#6366f1', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
