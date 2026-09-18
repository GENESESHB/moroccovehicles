// src/app/location-voiture-casablanca-7-euro-sans-caution/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Casablanca 7 Euro Sans Caution | Offre 2026 | MoroccoVehicles',
  description: 'Louez une voiture a Casablanca a 7 EUR par jour sans depot de garantie bloque. Pre-autorisation simplifiee sans debit reel. Livraison gratuite aeroport Mohammed V et centre-ville.',
  keywords: ['location voiture casablanca sans caution', 'location voiture casablanca 7 euro sans caution', 'louer voiture sans depot casablanca', 'rent car casablanca no deposit 2026'],
  openGraph: {
    title: 'Location Voiture Casablanca 7 EUR Sans Caution - MoroccoVehicles',
    description: 'Offre exclusive Casablanca : 7 EUR / jour sans caution bloquee et sans frais de livraison.',
    url: 'https://moroccovehicles.com/location-voiture-casablanca-7-euro-sans-caution',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-casablanca-7-euro-sans-caution' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan Diesel', price: '7 EUR', category: 'Citadine Economique', desc: 'Vehicule sobre, climatise, ideal pour circulation Casablanca' },
  { name: 'Hyundai i10 Grand', price: '8 EUR', category: 'Micro Citadine', desc: 'Stationnement aise dans tous les quartiers de Casa' },
  { name: 'Renault Clio 5', price: '9 EUR', category: 'Compacte Moderne', desc: 'Tres confortable pour trajets autoroutiers Casa-Rabat' },
  { name: 'Dacia Duster 4x2', price: '14 EUR', category: 'SUV Urbain', desc: 'Garde au sol elevee et grand coffre familial' },
];

const faqs = [
  { q: 'Comment fonctionne la formule sans caution a Casablanca ?', a: 'Au lieu d immobiliser ou debiter 5 000 a 10 000 MAD sur votre carte bancaire, nous effectuons une simple empreinte de pre-autorisation non debitee. Vos fonds restent disponibles sur votre compte.' },
  { q: 'Y a-t-il des frais de livraison a l aeroport Mohammed V ?', a: 'Non, la mise a disposition au Terminal 1 ou Terminal 2 de l aeroport Mohammed V est 100% gratuite 7j/7 et 24h/24.' },
  { q: 'Quels documents fournir a la prise en charge ?', a: 'Votre CIN marocaine ou passeport en cours de validite ainsi que votre permis de conduire original valable depuis au moins 12 mois.' },
];

const neighborLinks = [
  { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
  { name: 'Marrakech 7 EUR sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
  { name: 'Fes 7 EUR sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
  { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function CasablancaSansCautionPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#16a34a', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Contact WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Formule Sans Caution Bloquee</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#16a34a' }}>Casablanca 7 Euro</span><br />
          <span style={{ color: '#0f172a' }}>Sans Caution Bloquante - Livraison Aeroport Gratuite</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Louez votre vehicule a Casablanca sans subir de blocage financier sur votre carte bancaire. Tarif clair des 7 EUR par jour avec kilometrage illimite et assurance complete.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(22,163,74,.25)' }}>
            Reserver Sans Caution
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #16a34a', color: '#16a34a', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            Information WhatsApp
          </a>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Modeles Disponibles Sans Caution a Casablanca</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.desc}</p>
              <div style={{ fontSize: '12px', color: '#166534', fontWeight: '700', marginBottom: '16px' }}>Zero caution debitee - Kilometrage illimite</div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Reserver ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes sur la Formule Sans Caution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f1f5f9', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>
            Consultez Nos Autres Guides & Villes
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
