// src/app/location-voiture-marrakech-7-euro-sans-caution/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Marrakech 7 Euro Sans Caution | Offre 2026 | MoroccoVehicles',
  description: 'Louez une voiture a Marrakech a 7 EUR par jour sans caution bloquee. Pre-autorisation par carte sans debit reel. Livraison gratuite aeroport Menara, Medina et Gueliz.',
  keywords: ['location voiture marrakech sans caution', 'location voiture marrakech 7 euro sans caution', 'louer voiture marrakech sans depot', 'rent car marrakech no deposit 2026'],
  openGraph: {
    title: 'Location Voiture Marrakech 7 EUR Sans Caution - MoroccoVehicles',
    description: 'Offre exclusive Marrakech : 7 EUR / jour sans caution bloquee, kilometrage illimite et remise gratuite Menara.',
    url: 'https://moroccovehicles.com/location-voiture-marrakech-7-euro-sans-caution',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-marrakech-7-euro-sans-caution' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan Diesel', price: '7 EUR', category: 'Economique', desc: 'Faible consommation et grand confort sur les routes de l Atlas' },
  { name: 'Fiat Panda Urban', price: '8 EUR', category: 'Citadine Pratique', desc: 'Maniable pour circuler dans les ruelles autour de la Medina' },
  { name: 'Renault Clio 5', price: '10 EUR', category: 'Polyvalente', desc: 'Idéale pour virées a Essaouira et desert d Agafay' },
  { name: 'Dacia Duster', price: '15 EUR', category: 'SUV Baroudeur', desc: 'Garde au sol sure pour excursions montagneuses' },
];

const faqs = [
  { q: 'Comment beneficier de la location a Marrakech sans depot bloque ?', a: 'Notre formule sans caution s appuie sur une pre-autorisation securisee sans prelevement reel de fonds sur votre compte, vous preservant des soucis de plafond bancaire durant votre sejour.' },
  { q: 'Ou se fait la remise du vehicule a Marrakech ?', a: 'A l aeroport Marrakech-Menara des l atterrissage de votre avion, a votre riad en Medina ou a votre hotel a Gueliz ou en Palmeraie.' },
  { q: 'Le kilometrage est-il limite ?', a: 'Non, tous nos vehicules incluent le kilometrage illimite sans restriction d itineraire au Maroc.' },
];

const neighborLinks = [
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Casablanca 7 EUR sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
  { name: 'Fes 7 EUR sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
  { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
  { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
  { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function MarrakechSansCautionPage() {
  return (
    <div style={{ background: '#faf5f0', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ea580c', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Nos Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#ea580c', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Assistance WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#ffedd5', color: '#9a3412', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Offre Sans Caution Marrakech</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#ea580c' }}>Marrakech 7 Euro</span><br />
          <span style={{ color: '#16a34a' }}>Sans Caution Bloquee - Aeroport Menara Inclus</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Profitez de la magie de Marrakech et de l Atlas sans immobiliser votre budget vacances. Formule transparente des 7 EUR par jour avec etat des lieux 2D digitalise.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#ea580c', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(234,88,12,.3)' }}>
            Reserver a Marrakech
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #ea580c', color: '#ea580c', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            WhatsApp Direct
          </a>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Modeles Disponibles Sans Caution a Marrakech</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#ea580c' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.desc}</p>
              <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: '700', marginBottom: '16px' }}>Sans caution debitée - Kilometrage illimite</div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#ea580c', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
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
              <div key={q} style={{ background: '#faf5f0', padding: '24px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#7c2d12' }}>{q}</h3>
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
        2026 MoroccoVehicles - Marrakech, Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Contact</Link>
      </footer>
    </div>
  );
}
