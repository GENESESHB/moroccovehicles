// src/app/louer-voiture-maroc-sans-frais-livraison/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Louer Voiture Maroc Sans Frais de Livraison | MoroccoVehicles',
  description: 'Louez une voiture au Maroc sans frais de livraison cachés. Dépôt à l\'aéroport, hôtel ou port GRATUIT. Prix transparent dès 7€/jour dans toutes les villes du Maroc.',
  keywords: ['louer voiture maroc sans livraison', 'location voiture maroc sans frais livraison', 'voiture maroc pas cher livraison gratuite', 'location sans depot livraison maroc'],
  openGraph: {
    title: 'Louer Voiture Maroc Sans Frais de Livraison - MoroccoVehicles',
    description: 'Zéro frais de livraison au Maroc. Dès 7€/jour, livraison gratuite à l\'aéroport, hôtel ou port.',
    url: 'https://moroccovehicles.com/louer-voiture-maroc-sans-frais-livraison',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/louer-voiture-maroc-sans-frais-livraison' },
  robots: { index: true, follow: true },
};

export default function SansLivraisonPage() {
  const cities = [
    { name: 'Casablanca', airport: 'Mohammed V', price: '7€', icon: '🏙️' },
    { name: 'Marrakech', airport: 'Ménara', price: '7€', icon: '🌹' },
    { name: 'Agadir', airport: 'Al Massira', price: '7€', icon: '🌊' },
    { name: 'Rabat', airport: 'Rabat-Salé', price: '7€', icon: '🏛️' },
    { name: 'Tanger', airport: 'Ibn Batouta', price: '7€', icon: '⛵' },
    { name: 'Fès', airport: 'Fès-Saïss', price: '7€', icon: '🕌' },
    { name: 'Essaouira', airport: 'Mogador', price: '9€', icon: '🌬️' },
    { name: 'Ouarzazate', airport: 'Moulay Ali Ch.', price: '10€', icon: '🏜️' },
  ];

  const advantages = [
    { icon: '🚫', title: 'Zéro Frais Cachés', desc: 'Pas de frais de livraison, pas de supplément aéroport, pas de frais de carburant. Le prix affiché est le prix final.' },
    { icon: '📍', title: 'Livraison Partout', desc: 'Aéroport, gare, hôtel, port, riad, Airbnb… Nous venons à vous, où que vous soyez au Maroc.' },
    { icon: '⚡', title: 'Disponible 24h/24', desc: 'Vol de nuit ? Pas de problème. Nos équipes assurent les livraisons à toute heure, 7j/7.' },
    { icon: '💳', title: 'Paiement Flexible', desc: 'Payez par carte, virement ou espèces à la livraison. Aucun acompte obligatoire en ligne.' },
    { icon: '🛡️', title: 'Assurance Incluse', desc: 'Assurance responsabilité civile incluse dans tous les tarifs. Extension tous risques disponible.' },
    { icon: '📞', title: 'Support WhatsApp', desc: 'Besoin d\'aide ? Notre équipe répond sur WhatsApp en moins de 5 minutes, en arabe, français ou anglais.' },
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
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Réservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#36c275', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>✅ Livraison 100% Gratuite</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Louer une Voiture au <span style={{ color: '#36c275' }}>Maroc</span><br />
          <span style={{ color: '#f59e0b' }}>Sans Frais de Livraison — Dès 7€/jour</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Contrairement à d&apos;autres agences qui facturent 200 à 500 MAD de frais de livraison, chez MoroccoVehicles la livraison est TOUJOURS gratuite. Prix affiché = prix payé.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg,#36c275,#22a05e)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(54,194,117,.35)' }}>
            Réserver Sans Frais →
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #36c275', color: '#36c275', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      {/* CITIES TABLE */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>📍 Livraison Gratuite dans Toutes Ces Villes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '20px' }}>
          {cities.map((c) => (
            <div key={c.name} style={{ background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{c.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Aéroport {c.airport}</div>
                <div style={{ fontSize: '11px', color: '#36c275', fontWeight: '700', marginTop: '4px' }}>✅ Livraison Gratuite</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#36c275' }}>dès {c.price}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}
      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' }}>Pourquoi Choisir MoroccoVehicles ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '32px' }}>
            {advantages.map(({ icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '36px', flexShrink: 0 }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '80px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', textAlign: 'center', marginBottom: '32px' }}>Comparaison Transparente</h2>
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: '#0f172a', color: '#fff', padding: '16px 24px', fontWeight: '700', fontSize: '14px' }}>
            <span>Service</span><span style={{ textAlign: 'center' }}>Autres agences</span><span style={{ textAlign: 'center', color: '#36c275' }}>MoroccoVehicles</span>
          </div>
          {[
            ['Frais de livraison aéroport', '200–500 MAD', 'GRATUIT ✅'],
            ['Frais de carburant', 'Souvent cachés', 'Transparent ✅'],
            ['Caution bloquée', '5 000–10 000 MAD', 'Empreinte carte ✅'],
            ['Kilométrage', 'Limité souvent', 'Illimité ✅'],
            ['Assurance', 'En supplément', 'Incluse ✅'],
            ['Support client', 'Heures bureau', '24/7 WhatsApp ✅'],
          ].map(([service, other, us], i) => (
            <div key={service} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 24px', background: i % 2 === 0 ? '#f8fafc' : '#fff', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: '600' }}>{service}</span>
              <span style={{ textAlign: 'center', color: '#ef4444' }}>{other}</span>
              <span style={{ textAlign: 'center', color: '#36c275', fontWeight: '700' }}>{us}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#36c275,#22a05e)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>Réservez Sans Surprise 🇲🇦</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Le prix que vous voyez est le prix que vous payez. Livraison toujours gratuite.</p>
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
