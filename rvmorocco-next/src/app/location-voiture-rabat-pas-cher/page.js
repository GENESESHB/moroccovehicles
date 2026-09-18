// src/app/location-voiture-rabat-pas-cher/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Location Voiture Rabat Pas Cher | Des 7 EUR par jour | MoroccoVehicles',
  description: 'Location voiture Rabat a partir de 7 EUR par jour. Livraison gratuite aeroport Rabat-Sale (RBA), gare Rabat-Ville, Agdal ou a votre adresse. Assistance 24/7 et kilometrage illimite.',
  keywords: ['location voiture rabat', 'louer voiture rabat pas cher', 'rent a car rabat', 'location auto rabat', 'voiture moins chere rabat 2026'],
  openGraph: {
    title: 'Location Voiture Rabat Pas Cher - MoroccoVehicles',
    description: 'Louez une voiture a Rabat des 7 EUR par jour. Livraison aeroport Rabat-Sale gratuite et service sans caution bloquee.',
    url: 'https://moroccovehicles.com/location-voiture-rabat-pas-cher',
    siteName: 'MoroccoVehicles',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: { canonical: 'https://moroccovehicles.com/location-voiture-rabat-pas-cher' },
  robots: { index: true, follow: true },
};

const vehicles = [
  { name: 'Dacia Logan', price: '7 EUR', category: 'Economique', fuel: 'Diesel' },
  { name: 'Renault Clio', price: '9 EUR', category: 'Compacte', fuel: 'Essence' },
  { name: 'Volkswagen Polo', price: '12 EUR', category: 'Confort', fuel: 'Essence' },
  { name: 'Dacia Duster', price: '16 EUR', category: 'SUV', fuel: 'Diesel' },
  { name: 'Peugeot 308', price: '19 EUR', category: 'Berline', fuel: 'Diesel' },
  { name: 'BMW Serie 3', price: '60 EUR', category: 'Luxe Business', fuel: 'Essence' },
];

const faqs = [
  { q: 'Puis-je recuperer ma voiture a la gare de Rabat ?', a: 'Oui, nous livrons gratuitement a la gare Rabat-Ville, a la gare Rabat-Agdal, a l aeroport Rabat-Sale ainsi qu aux hotels et ambassades de la capitale.' },
  { q: 'Y a-t-il des reductions pour les locations longue duree a Rabat ?', a: 'Oui, au-dela de 7 jours vous beneficiez d une remise automatique de 10%, et au-dela de 14 jours d une remise de 20% sur le tarif journalier.' },
  { q: 'Peut-on circuler entre Rabat et Casablanca avec le vehicule ?', a: 'Oui, la circulation inter-villes est entierement libre. Le trajet autoroutier A1 Rabat-Casablanca de 87 km est inclus dans le kilometrage illimite.' },
  { q: 'Quelles sont les modalites de caution a Rabat ?', a: 'Une simple pre-autorisation par empreinte de carte bancaire non debitee suffit. Aucun montant n est encaisse.' },
];

const neighborLinks = [
  { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
  { name: 'Livraison gratuite Maroc', href: '/louer-voiture-maroc-sans-frais-livraison' },
  { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
  { name: 'Casablanca sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
  { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
  { name: 'Marrakech sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
  { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
  { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
  { name: 'Fes sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
  { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
  { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
];

export default function RabatPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px', marginTop: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#4f46e5', color: '#fff', fontWeight: '800', fontSize: '16px', display: 'grid', placeItems: 'center' }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Tarifs</Link>
          <Link href="/booking" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Reservation</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#4f46e5', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Assistance WhatsApp</a>
        </nav>
      </header>

      <section style={{ padding: '70px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Rabat Capitale & Aeroport Rabat-Sale</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Location Voiture <span style={{ color: '#4f46e5' }}>Rabat</span> Pas Cher<br />
          <span style={{ color: '#0f172a' }}>Des 7 EUR par jour - Sans Frais de Livraison</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Deplacements professionnels, visites institutionnelles ou tourisme a Rabat et ses environs. Livraison gratuite a l aeroport de Rabat-Sale, en gare TGV Agdal ou a votre bureau.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#4f46e5', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(79,70,229,.25)' }}>
            Reserver a Rabat
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #4f46e5', color: '#4f46e5', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            WhatsApp Direct
          </a>
        </div>
      </section>

      <section style={{ background: '#1e1b4b', padding: '40px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px', textAlign: 'center' }}>
          {[['7 EUR', 'Prix de depart par jour'], ['0 EUR', 'Livraison a domicile'], ['100%', 'Kilometrage illimite'], ['24/7', 'Support disponible']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '34px', fontWeight: '900', color: '#a5b4fc' }}>{val}</div>
              <div style={{ fontSize: '14px', color: '#c7d2fe', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Flotte Disponible a Rabat</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div key={v.name} style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <span style={{ fontSize: '12px', background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>{v.category}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#4f46e5' }}>{v.price}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Carburant : {v.fuel} - Capacite : 5 places - Kilometrage illimite</p>
              <Link href="/booking" style={{ display: 'block', textAlign: 'center', background: '#4f46e5', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
                Selectionner ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Questions Frequentes - Location a Rabat</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e0e7ff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#312e81' }}>{q}</h3>
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
        2026 MoroccoVehicles - Rabat, Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Contact</Link>
      </footer>
    </div>
  );
}
