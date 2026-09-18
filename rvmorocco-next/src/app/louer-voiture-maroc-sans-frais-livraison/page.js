// src/app/louer-voiture-maroc-sans-frais-livraison/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Louer Voiture Maroc Sans Frais de Livraison | Edition 2026 | MoroccoVehicles',
  description: 'Louez une voiture au Maroc sans frais de livraison caches. Remise gratuite a l aeroport, a l hotel ou au port. Prix transparent des 7 EUR par jour a Casablanca, Marrakech, Rabat, Agadir, Tanger, Fes.',
  keywords: ['louer voiture maroc sans livraison', 'location voiture maroc sans frais livraison', 'voiture maroc pas cher livraison gratuite', 'location sans depot livraison maroc 2026'],
  openGraph: {
    title: 'Louer Voiture Maroc Sans Frais de Livraison - MoroccoVehicles',
    description: 'Zero frais de livraison au Maroc. Des 7 EUR par jour, livraison gratuite a l aeroport, hotel ou port.',
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
    { name: 'Casablanca', airport: 'Mohammed V (CMN)', price: '7 EUR', tag: 'Axe Economique' },
    { name: 'Marrakech', airport: 'Menara (RAK)', price: '7 EUR', tag: 'Axe Touristique' },
    { name: 'Agadir', airport: 'Al Massira (AGA)', price: '7 EUR', tag: 'Cote Atlantique' },
    { name: 'Rabat', airport: 'Rabat-Sale (RBA)', price: '7 EUR', tag: 'Capitale Administrative' },
    { name: 'Tanger', airport: 'Ibn Batouta (TNG) / Port Tanger Med', price: '7 EUR', tag: 'Porte du Nord' },
    { name: 'Fes', airport: 'Fes-Saiss (FEZ)', price: '7 EUR', tag: 'Centre Historique' },
    { name: 'Essaouira', airport: 'Mogador (ESU)', price: '9 EUR', tag: 'Littoral Ouest' },
    { name: 'Ouarzazate', airport: 'Moulay Ali Cherif', price: '10 EUR', tag: 'Sud & Portes du Desert' },
  ];

  const advantages = [
    { title: 'Zero Frais Caches', desc: 'Pas de taxe d aeroport imprevue, pas de frais de prise en charge nocturne. Le montant confirme sur votre bon de commande correspond exactement au montant du contrat.' },
    { title: 'Livraison sur Mesure', desc: 'Prise en charge directement a la sortie du terminal aeroportuaire, a votre hotel, riad ou gare ferroviaire ONCF sans deplacement inutile.' },
    { title: 'Disponibilite 24h/24 et 7j/7', desc: 'Nos coordinateurs s adaptent aux retards de vols grace au suivi en direct des numeros de vol pour vous remettre les cles des votre atterrissage.' },
    { title: 'Paiement Flexible', desc: 'Reglement par carte bancaire securisee, virement bancaire ou especes lors de la remise des cles avec recu officiel.' },
    { title: 'Assurance et Assistance 24/7', desc: 'Assurance comprise des la signature du contrat, avec assistance remorquage sur l ensemble du reseau routier marocain.' },
    { title: 'Coordination Directe WhatsApp', desc: 'Echange direct avec l agent assigne a votre remise de cles pour une coordination sans attente.' },
  ];

  const neighborLinks = [
    { name: 'Voitures electriques Maroc', href: '/voiture-electrique-location-maroc' },
    { name: 'Location a 7 EUR sans livraison', href: '/location-voiture-maroc-7-euro-sans-livraison' },
    { name: 'Casablanca pas cher', href: '/location-voiture-casablanca-pas-cher' },
    { name: 'Casablanca sans caution', href: '/location-voiture-casablanca-7-euro-sans-caution' },
    { name: 'Marrakech pas cher', href: '/location-voiture-marrakech-pas-cher' },
    { name: 'Marrakech sans caution', href: '/location-voiture-marrakech-7-euro-sans-caution' },
    { name: 'Tanger pas cher', href: '/location-voiture-tanger-pas-cher' },
    { name: 'Rabat pas cher', href: '/location-voiture-rabat-pas-cher' },
    { name: 'Fes pas cher', href: '/location-voiture-fes-pas-cher' },
    { name: 'Fes sans caution', href: '/location-voiture-fes-7-euro-sans-caution' },
    { name: 'Agadir pas cher', href: '/location-voiture-agadir-pas-cher' },
    { name: 'Partenaires B2B Flotte', href: '/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere' },
  ];

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
        <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Transparence Tarifaire Garantie</span>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '20px' }}>
          Louer une Voiture au <span style={{ color: '#16a34a' }}>Maroc</span><br />
          <span style={{ color: '#0f172a' }}>Sans Frais de Livraison - Des 7 EUR par jour</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Alors que les centrales de reservation intermediaires facturent generalement 200 a 400 MAD de frais de livraison en dehors des comptoirs d agence, chez MoroccoVehicles la mise a disposition est 100% gratuite.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', boxShadow: '0 8px 24px rgba(22,163,74,.25)' }}>
            Reserver Sans Frais de Livraison
          </Link>
          <a href="https://wa.me/212622283559" style={{ background: '#fff', border: '2px solid #16a34a', color: '#16a34a', textDecoration: 'none', padding: '16px 36px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}>
            Assistance WhatsApp
          </a>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>Livraison Gratuite dans Toutes les Grandes Villes du Maroc</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
          {cities.map((c) => (
            <div key={c.name} style={{ background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>{c.tag}</span>
                <div style={{ fontWeight: '800', fontSize: '18px', color: '#0f172a', marginTop: '4px' }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{c.airport}</div>
                <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', marginTop: '6px' }}>Livraison Gratuite 7j/7</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a' }}>des {c.price}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>par jour</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' }}>Les Engagements de Service MoroccoVehicles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '32px' }}>
            {advantages.map(({ title, desc }) => (
              <div key={title} style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', maxWidth: '750px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', textAlign: 'center', marginBottom: '32px' }}>Tableau Comparatif des Pratiques Locatives</h2>
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: '#0f172a', color: '#fff', padding: '16px 24px', fontWeight: '700', fontSize: '14px' }}>
            <span>Prestation</span><span style={{ textAlign: 'center' }}>Agences Ordinaires</span><span style={{ textAlign: 'center', color: '#4ade80' }}>MoroccoVehicles</span>
          </div>
          {[
            ['Livraison Aeroport & Gare', '200 a 450 MAD', 'Gratuit'],
            ['Calcul des Litres Carburant', 'Estimation arbitraire', 'Jauge numerique precise'],
            ['Caution & Depot', 'Debit physique 5000+ MAD', 'Empreinte non debitee'],
            ['Kilometrage Journalier', 'Souvent plafonne', 'Kilometrage illimite'],
            ['Assistance Routiere', 'Option payante', 'Incluse 24/7'],
            ['Support Client', 'Horaires de bureau', 'Coordination continue 24/7'],
          ].map(([service, other, us], i) => (
            <div key={service} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 24px', background: i % 2 === 0 ? '#f8fafc' : '#fff', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: '600' }}>{service}</span>
              <span style={{ textAlign: 'center', color: '#dc2626' }}>{other}</span>
              <span style={{ textAlign: 'center', color: '#16a34a', fontWeight: '700' }}>{us}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f1f5f9', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>
            Consultez les Guides et Offres par Destination
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
        2026 MoroccoVehicles - Service de location automobile transparent au Maroc. <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Confidentialite</Link> - <Link href="/terms" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Conditions Generales</Link>
      </footer>
    </div>
  );
}
