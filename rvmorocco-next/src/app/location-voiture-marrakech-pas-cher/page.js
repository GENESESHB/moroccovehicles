// src/app/location-voiture-marrakech-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Marrakech Pas Cher | Dès 7€/jour | MoroccoVehicles',
  description: 'Location voiture Marrakech au meilleur prix dès 7€/jour. Livraison gratuite à l\'aéroport Ménara et en Medina. Sans frais cachés. Réservez en ligne en 2 minutes.',
  keywords: ['location voiture marrakech', 'louer voiture marrakech pas cher', 'voiture location marrakech', 'rent a car marrakech', 'location auto marrakech'],
  openGraph: {
    title: 'Location Voiture Marrakech Pas Cher - MoroccoVehicles',
    description: 'Louez votre voiture à Marrakech dès 7€/jour. Livraison aéroport Ménara gratuite.',
    url: 'https://moroccovehicles.com/location-voiture-marrakech-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-marrakech-pas-cher' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7€', category: 'Économique', fuel: 'Diesel', seats: 5, icon: '🚗' },
  { name: 'Fiat Panda', price: '8€', category: 'Citadine', fuel: 'Essence', seats: 5, icon: '🚙' },
  { name: 'Renault Clio', price: '10€', category: 'Compacte', fuel: 'Essence', seats: 5, icon: '🚗' },
  { name: 'Dacia Duster', price: '15€', category: 'SUV 4x4', fuel: 'Diesel', seats: 5, icon: '🏔️' },
  { name: 'Citroën C3', price: '11€', category: 'Confort', fuel: 'Essence', seats: 5, icon: '🚗' },
  { name: 'Mercedes Classe A', price: '45€', category: 'Luxe', fuel: 'Essence', seats: 5, icon: '✨' },
];

const faqs = [
  { q: 'Où récupérer ma voiture à Marrakech ?', a: 'Livraison gratuite à l\'aéroport Ménara de Marrakech, à votre riad en Medina, à l\'hôtel ou au train. Contactez-nous 30 minutes avant pour coordonner.' },
  { q: 'Un SUV est-il recommandé pour les excursions autour de Marrakech ?', a: 'Oui, pour les excursions vers l\'Atlas, Ouarzazate ou Essaouira, un SUV Dacia Duster est idéal. Disponible dès 15€/jour.' },
  { q: 'Puis-je traverser les montagnes de l\'Atlas avec la voiture ?', a: 'Oui, toutes nos voitures sont autorisées sur les routes nationales marocaines. Pour des pistes, choisissez notre SUV 4x4.' },
  { q: 'Le kilométrage est-il illimité ?', a: 'Oui, tous nos véhicules proposent un kilométrage illimité. Aucun supplément au retour quelle que soit la distance parcourue.' },
];

export default function MarrakechPage() {
  return (
    <div style={{ background: '#faf5f0', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px rgba(54,194,117,.35)' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Nos Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#e97316', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#fed7aa', color: '#9a3412', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>🌹 Marrakech La Rouge</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#e97316' }}>Marrakech</span> Pas Cher<br />
          <span style={{ color: '#36c275' }}>À partir de 7€/jour — Kilométrage Illimité</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Explorez Marrakech et ses environs (Atlas, Essaouira, Ouarzazate) à votre rythme. Livraison gratuite à l&apos;aéroport Ménara ou à votre riad. Prix tout inclus, zéro mauvaise surprise.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#e97316,#c2610c)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(233,115,22,.35)' }}>
            Réserver Maintenant →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #e97316', color: '#e97316', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#431407,#7c2d12)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Prix / jour dès'], ['0€', 'Livraison aéroport'], ['∞', 'Km illimité'], ['400+', 'Clients à Marrakech']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#fdba74' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#fed7aa', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>🚗 Flotte Disponible à Marrakech</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#e97316' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                <span>⛽ {v.fuel}</span><span>👥 {v.seats} places</span>
                <span>🛣️ Km illimité</span><span>✅ Assurance incluse</span>
              </div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', marginTop: '20px', background: '#e97316', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver ce véhicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>FAQ – Location à Marrakech</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#faf5f0', padding: '24px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#7c2d12' }}>❓ {q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#e97316,#c2610c)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Découvrez Marrakech en voiture 🌹</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Réservez dès maintenant, kilométrage illimité, livraison aéroport gratuite.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#e97316', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
