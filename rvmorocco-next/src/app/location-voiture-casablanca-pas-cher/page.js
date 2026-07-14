// src/app/location-voiture-casablanca-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Casablanca Pas Cher | À partir de 7€/jour | MoroccoVehicles',
  description: 'Louez une voiture à Casablanca au meilleur prix dès 7€/jour. Sans frais cachés, sans livraison surprise. Disponible à l\'aéroport Mohammed V et en ville. Réservation en ligne rapide.',
  keywords: ['location voiture casablanca', 'location voiture casablanca pas cher', 'louer voiture casablanca', 'voiture moins chère casablanca', 'rent a car casablanca maroc'],
  openGraph: {
    title: 'Location Voiture Casablanca Pas Cher - MoroccoVehicles',
    description: 'Les meilleurs prix pour louer une voiture à Casablanca. Dès 7€/jour, sans frais de livraison.',
    url: 'https://moroccovehicles.com/location-voiture-casablanca-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-casablanca-pas-cher' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7€', category: 'Économique', fuel: 'Diesel', seats: 5, transmission: 'Manuelle', icon: '🚗' },
  { name: 'Hyundai i10', price: '8€', category: 'Citadine', fuel: 'Essence', seats: 5, transmission: 'Manuelle', icon: '🚙' },
  { name: 'Renault Clio', price: '9€', category: 'Compacte', fuel: 'Essence', seats: 5, transmission: 'Manuelle', icon: '🚗' },
  { name: 'Dacia Duster', price: '14€', category: 'SUV', fuel: 'Diesel', seats: 5, transmission: 'Manuelle', icon: '🚙' },
  { name: 'Volkswagen Golf', price: '18€', category: 'Confort', fuel: 'Essence', seats: 5, transmission: 'Automatique', icon: '🚗' },
  { name: 'Toyota Corolla', price: '22€', category: 'Berline', fuel: 'Hybride', seats: 5, transmission: 'Automatique', icon: '🚘' },
];

const faqs = [
  { q: 'Où puis-je récupérer ma voiture à Casablanca ?', a: 'Nous proposons la prise en charge à l\'aéroport Mohammed V de Casablanca, en centre-ville Casa, au port de Casablanca, ou à votre hôtel. Aucun frais de livraison supplémentaire.' },
  { q: 'Quel est le prix minimum pour louer une voiture à Casablanca ?', a: 'Nos tarifs débutent à 7€ par jour pour une Dacia Logan ou un véhicule de catégorie économique. Le prix inclut l\'assurance de base et la TVA marocaine.' },
  { q: 'Faut-il un permis international pour louer à Casablanca ?', a: 'Les ressortissants de l\'UE, USA, Canada et plus de 40 pays peuvent utiliser leur permis national. Pour d\'autres nationalités, un permis international est recommandé.' },
  { q: 'Y a-t-il une caution obligatoire ?', a: 'Une caution de 1500 à 3000 MAD est demandée par empreinte de carte bancaire selon le véhicule. Elle est restituée immédiatement à la restitution du véhicule en bon état.' },
];

export default function CasablancaPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#36c275', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px rgba(54,194,117,.35)' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Nos Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#36c275', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>🏙️ Casablanca</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#36c275' }}>Casablanca</span> Pas Cher<br />
          <span style={{ color: '#f59e0b' }}>À partir de 7€/jour</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Louez une voiture à Casablanca au meilleur prix garanti. Livraison gratuite à l&apos;aéroport Mohammed V, en centre-ville ou à votre hôtel. Aucun frais cachés, aucune mauvaise surprise.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#36c275,#22a05e)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(54,194,117,.35)' }}>
            Réserver Maintenant →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #36c275', color: '#36c275', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 Contacter par WhatsApp
          </a>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7€', 'Prix / jour dès'], ['0€', 'Frais de livraison'], ['24/7', 'Assistance disponible'], ['500+', 'Clients Casablanca']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#36c275' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VEHICLES GRID */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
          🚗 Nos Véhicules Disponibles à Casablanca
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#36c275' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                <span>⛽ {v.fuel}</span>
                <span>👥 {v.seats} places</span>
                <span>⚙️ {v.transmission}</span>
                <span>✅ Assurance incluse</span>
              </div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', marginTop: '20px', background: '#36c275', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Réserver ce véhicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' }}>Pourquoi choisir MoroccoVehicles à Casablanca ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '32px' }}>
            {[
              { icon: '💰', title: 'Tarifs Transparents', desc: 'Dès 7€/jour. Le prix affiché est le prix final, TVA et assurance incluses.' },
              { icon: '🚀', title: 'Livraison Gratuite', desc: 'Livraison à l\'aéroport Mohammed V, Casa-Port, Casa-Voyageurs ou votre hôtel sans frais.' },
              { icon: '📱', title: 'Réservation Instantanée', desc: 'Confirmez votre réservation en moins de 2 minutes depuis votre smartphone.' },
              { icon: '🛡️', title: 'Assurance Complète', desc: 'Assurance tous risques optionnelle, assistance routière 24/7 incluse.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Fréquentes – Location Casablanca</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>❓ {q}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ background: 'linear-gradient(135deg,#36c275,#22a05e)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Prêt à louer à Casablanca ?</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Réservez maintenant et profitez du meilleur tarif garanti dès 7€/jour.</p>
        <Link href="/booking" style={{ background: '#fff', color: '#36c275', textDecoration: 'none', padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: '800', display: 'inline-block' }}>
          Réserver Maintenant →
        </Link>
      </section>

      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 MoroccoVehicles · <Link href="/privacy" style={{ color: '#64748b' }}>Confidentialité</Link> · <Link href="/contact" style={{ color: '#64748b' }}>Contact</Link>
      </footer>
    </div>
  );
}
