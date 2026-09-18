// src/app/location-voiture-agadir-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Agadir Pas Cher | Des 7 EUR par jour | MoroccoVehicles',
  description: 'Location voiture Agadir au meilleur prix des 7 EUR par jour. Livraison gratuite a l aeroport Al Massira (AGA), Taghazout et baie d Agadir. Sans frais caches et assistance 24/7.',
  keywords: ['location voiture agadir', 'louer voiture agadir pas cher', 'rent a car agadir', 'voiture location agadir', 'location auto agadir maroc 2026'],
  openGraph: {
    title: 'Location Voiture Agadir Pas Cher - MoroccoVehicles',
    description: 'Louez une voiture a Agadir des 7 EUR par jour. Livraison aeroport Al Massira gratuite et kilometrage illimite.',
    url: 'https://moroccovehicles.com/location-voiture-agadir-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-agadir-pas-cher' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7 EUR', category: 'Economique', desc: 'Diesel sobre, 5 places, coffre spacieux pour bagages' },
  { name: 'Hyundai i20', price: '9 EUR', category: 'Citadine', desc: 'Essence, climatisation performante, confort' },
  { name: 'Dacia Sandero Stepway', price: '10 EUR', category: 'Compacte Surlevee', desc: 'Garde au sol elevee pour les routes cotieres' },
  { name: 'Dacia Duster', price: '15 EUR', category: 'SUV Polyvalent', desc: 'Ideal pour les plages du sud, Mirleft et Legzira' },
  { name: 'Kia Sportage', price: '24 EUR', category: 'SUV Confort', desc: 'Boite automatique et confort familial' },
  { name: 'Mercedes Classe C', price: '55 EUR', category: 'Berline Prestige', desc: 'Prestige et elegance pour voyages d affaires' },
];

const faqs = [
  { q: 'Comment se passe la prise en charge a l aeroport Al Massira d Agadir ?', a: 'Notre agent vous attend au terminal d arrivee de l aeroport Al Massira avec les cles et le contrat numerique. Aucun deplacement vers une navette eloignee n est necessaire.' },
  { q: 'Peut-on rejoindre Taghazout et Imsouane avec le vehicule ?', a: 'Oui, tous nos vehicules beneficient du kilometrage illimite pour explorer la route cotiere, les spots de surf de Taghazout et la vallee du Paradis.' },
  { q: 'Quelles sont les conditions pour louer sans caution bloquante ?', a: 'Une empreinte de carte bancaire securisee est effectuee sans encaissement reel, liberant vos plafonds financiers durant vos vacances.' },
];

const neighborLinks = [
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Marrakech sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
  { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
  { name: 'Casablanca sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
  { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
  { name: 'Fes sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
  { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function AgadirPage() {
  return (
    <div style={{ background: '#f0f9ff', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#0284c7', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#0284c7', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Assistance WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Agadir & Cote Souss-Massa</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#0284c7' }}>Agadir</span> Pas Cher<br />
          <span style={{ color: '#0f172a' }}>Des 7 EUR par jour - Aeroport Al Massira & Taghazout</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Parcourez la baie d Agadir, la marina, les spots de surf de Taghazout et les routes de l Anti-Atlas en toute liberte. Livraison gratuite a l aeroport Al Massira ou a votre hotel.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#0284c7', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(2,132,199,.25)' }}>
            Reserver a Agadir
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #0284c7', color: '#0284c7', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            WhatsApp Direct
          </a>
        </div>
      </section>

      <section style={{ background: '#0c4a6e', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7 EUR', 'Prix de depart journalier'], ['0 EUR', 'Frais aeroport Al Massira'], ['100%', 'Kilometrage illimite'], ['24/7', 'Assistance balneaire']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '34px', fontWeight: '900', color: '#7dd3fc' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#bae6fd', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Vehicules Disponibles a Agadir</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e0f2fe' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.desc}</p>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#0284c7', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Reserver ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes - Location a Agadir</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f0f9ff', padding: '24px', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#0369a1' }}>{q}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
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
        2026 MoroccoVehicles - Agadir, Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Contact</Link>
      </footer>
    </div>
  );
}
