// src/app/location-voiture-fes-7-euro-sans-caution/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Fes 7 Euro Sans Caution | Offre 2026 | MoroccoVehicles',
  description: 'Louez une voiture a Fes a 7 EUR par jour sans caution bloquee. Pre-autorisation simplifiee sans prelevement. Livraison gratuite aeroport Fes-Saiss et medina.',
  keywords: ['location voiture fes sans caution', 'location voiture fes 7 euro sans caution', 'louer voiture sans caution fes', 'rent car fes no deposit 2026'],
  openGraph: {
    title: 'Location Voiture Fes 7 EUR Sans Caution - MoroccoVehicles',
    description: 'Offre exclusive Fes : 7 EUR / jour sans depot de caution bloquee, livraison gratuite Fes-Saiss.',
    url: 'https://moroccovehicles.com/location-voiture-fes-7-euro-sans-caution',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-fes-7-euro-sans-caution' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7 EUR', category: 'Citadine Economique', desc: 'Sobre et endurante pour les circuits Fes, Meknes et Ifrane' },
  { name: 'Renault Clio 5', price: '9 EUR', category: 'Compacte Confort', desc: 'Climatisation excellente pour les journees d ete' },
  { name: 'Dacia Duster', price: '15 EUR', category: 'SUV Polyvalent', desc: 'Ideal pour les routes pittoresques du Moyen Atlas' },
];

const faqs = [
  { q: 'Comment reserver a Fes sans bloquer une caution bancaire ?', a: 'Une simple pre-autorisation par empreinte bancaire non encaissee securise le contrat sans debiter vos plafonds de paiement.' },
  { q: 'La prise en charge a l aeroport de Fes-Saiss est-elle gratuite ?', a: 'Oui, la remise des cles et la signature du contrat digital s effectuent sans frais supplementaires au terminal passagers.' },
  { q: 'Quelles sont les conditions d age et de permis ?', a: 'Avoir au moins 21 ans et etre titulaire d un permis de conduire valide depuis plus d un an.' },
];

const neighborLinks = [
  { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
  { name: 'Casablanca 7 EUR sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
  { name: 'Marrakech 7 EUR sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
  { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function FesSansCautionPage() {
  return (
    <div style={{ background: '#fdf4ff', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#9333ea', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Nos Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#9333ea', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Assistance WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#f3e8ff', color: '#581c87', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Fes Sans Caution Bloquee</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#9333ea' }}>Fes 7 Euro</span><br />
          <span style={{ color: '#0f172a' }}>Sans Caution Bloquante - Aeroport Fes-Saiss Inclus</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Parcourez la medina de Fes, Meknes et le Moyen Atlas sans subir de caution pesante. Tarif clair des 7 EUR par jour avec kilometrage illimite.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#9333ea', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(147,51,234,.25)' }}>
            Reserver a Fes Sans Caution
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #9333ea', color: '#9333ea', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            WhatsApp Direct
          </a>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Vehicules Sans Caution a Fes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f3e8ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', color: '#9333ea', fontWeight: '700' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#9333ea' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{v.desc}</p>
              <div style={{ fontSize: '12px', color: '#581c87', fontWeight: '700', marginBottom: '16px' }}>Zero caution debitee - Kilometrage illimite</div>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#9333ea', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Reserver ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes sur la Location a Fes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#fdf4ff', padding: '24px', borderRadius: '12px', border: '1px solid #f3e8ff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#581c87' }}>{q}</h3>
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
        2026 MoroccoVehicles - Fes, Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Contact</Link>
      </footer>
    </div>
  );
}
