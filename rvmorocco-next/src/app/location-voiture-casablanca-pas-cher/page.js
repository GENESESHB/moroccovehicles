// src/app/location-voiture-casablanca-pas-cher/page.js
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Location Voiture Casablanca Pas Cher | Des 7 EUR/j | MoroccoVehicles",
  description: "Guide et reservation pour votre location voiture casablanca pas cher a l aeroport CMN, Maarif et Casa-Voyageurs. Des 7 EUR/j, sans frais caches et kilometrage illimite.",
  keywords: [
    "location voiture casablanca pas cher",
    "location voiture casablanca pas cher 2026",
    "location voiture casablanca pas cher aeroport",
    "location voiture casablanca pas cher sans frais",
    "location voiture casablanca pas cher avis",
    "location voiture maroc",
    "moroccovehicles"
  ],
  openGraph: {
    title: "Location Voiture Casablanca Pas Cher | Des 7 EUR/j | MoroccoVehicles",
    description: "Guide et reservation pour votre location voiture casablanca pas cher a l aeroport CMN, Maarif et Casa-Voyageurs. Des 7 EUR/j, sans frais caches et kilometrage illimite.",
    url: "https://moroccovehicles.com/location-voiture-casablanca-pas-cher",
    siteName: "MoroccoVehicles",
    locale: "fr_MA",
    type: "article",
  },
  alternates: {
    canonical: "https://moroccovehicles.com/location-voiture-casablanca-pas-cher",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const vehicles = [
  {
    "name": "Dacia Logan Diesel",
    "price": "7 EUR",
    "autonomy": "1000 km",
    "charge": "Diesel Economique",
    "seats": 5,
    "type": "Berline Casablanca"
  },
  {
    "name": "Hyundai i10",
    "price": "8 EUR",
    "autonomy": "740 km",
    "charge": "Essence Citadine",
    "seats": 5,
    "type": "Micro Citadine"
  },
  {
    "name": "Renault Clio 5",
    "price": "9 EUR",
    "autonomy": "860 km",
    "charge": "Moderne Confort",
    "seats": 5,
    "type": "Polyvalente"
  },
  {
    "name": "Dacia Duster",
    "price": "14 EUR",
    "autonomy": "1020 km",
    "charge": "Diesel 4x2",
    "seats": 5,
    "type": "SUV Urbain"
  }
];

const faqs = [
  {
    "q": "Ou s effectue la prise en charge a l aeroport CMN ?",
    "a": "Au Terminal 1 ou 2 de Mohammed V. Notre agent vous accueille directement au hall des arrivees avec une pancarte a votre nom."
  },
  {
    "q": "Combien coute une journee de location a Casablanca ?",
    "a": "Nos prix commencent des 7 EUR par jour pour les citadines economiques reservees en ligne."
  },
  {
    "q": "Le trajet vers Rabat est-il autorise avec le kilometrage illimite ?",
    "a": "Oui absolument, l axe autoroutier A1 de 87 km vers Rabat est inclus sans restriction de kilometrage."
  },
  {
    "q": "Quels modes de reglement sont acceptes a l arrivee ?",
    "a": "Carte bancaire internationale, carte bancaire marocaine ou reglement en especes selon votre convenance."
  }
];

const neighborLinks = [
  {
    "name": "Voiture Electrique Maroc",
    "href": "/voiture-electrique-location-maroc"
  },
  {
    "name": "Sans Frais de Livraison Maroc",
    "href": "/louer-voiture-maroc-sans-frais-livraison"
  },
  {
    "name": "Maroc 7 Euro Sans Livraison",
    "href": "/location-voiture-maroc-7-euro-sans-livraison"
  },
  {
    "name": "Casablanca Pas Cher",
    "href": "/location-voiture-casablanca-pas-cher"
  },
  {
    "name": "Casablanca 7 Euro Sans Caution",
    "href": "/location-voiture-casablanca-7-euro-sans-caution"
  },
  {
    "name": "Marrakech Pas Cher",
    "href": "/location-voiture-marrakech-pas-cher"
  },
  {
    "name": "Marrakech 7 Euro Sans Caution",
    "href": "/location-voiture-marrakech-7-euro-sans-caution"
  },
  {
    "name": "Tanger Pas Cher",
    "href": "/location-voiture-tanger-pas-cher"
  },
  {
    "name": "Rabat Pas Cher",
    "href": "/location-voiture-rabat-pas-cher"
  },
  {
    "name": "Fes Pas Cher",
    "href": "/location-voiture-fes-pas-cher"
  },
  {
    "name": "Fes 7 Euro Sans Caution",
    "href": "/location-voiture-fes-7-euro-sans-caution"
  },
  {
    "name": "Agadir Pas Cher",
    "href": "/location-voiture-agadir-pas-cher"
  },
  {
    "name": "Guide Expert Maroc 2026",
    "href": "/blogs/guide-expert-location-voiture-maroc-experience-terrain-2026"
  }
];

export default function DestinationLandingPage() {
  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Location Voiture Casablanca Pas Cher : Explorez la Capitale Economique des 7 EUR par jour',
    description: 'Guide et reservation pour votre location voiture casablanca pas cher a l aeroport CMN, Maarif et Casa-Voyageurs. Des 7 EUR/j, sans frais caches et kilometrage illimite.',
    author: {
      '@type': 'Organization',
      name: 'MoroccoVehicles',
      url: 'https://moroccovehicles.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoroccoVehicles',
      url: 'https://moroccovehicles.com'
    },
    datePublished: '2026-01-15T09:00:00+01:00',
    dateModified: '2026-03-20T11:00:00+01:00',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://moroccovehicles.com/location-voiture-casablanca-pas-cher'
    }
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Hero Section */}
      <section style={{ padding: '60px 20px 40px', textAlign: 'center', maxWidth: '1050px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px' }}>
          Casablanca & CMN 2026
        </div>
        
        <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: '900', lineHeight: 1.2, color: '#0f172a', marginBottom: '22px' }}>
          Location Voiture Casablanca Pas Cher : Explorez la Capitale Economique des 7 EUR par jour
        </h1>
        
        <p style={{ fontSize: '19px', color: '#475569', lineHeight: 1.7, maxWidth: '850px', margin: '0 auto 32px', fontWeight: '500' }}>
          Guide et reservation pour votre location voiture casablanca pas cher a l aeroport CMN, Maarif et Casa-Voyageurs. Des 7 EUR/j, sans frais caches et kilometrage illimite. Profitez d une reservation transparente pour votre <strong>location voiture casablanca pas cher</strong> avec assistance 24/7 et remise de cles sans attente.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/booking"
            style={{
              background: '#16a34a',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '16px 36px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              boxShadow: '0 10px 25px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            Lancer ma Reservation
          </Link>
          <a
            href="https://wa.me/212622283559"
            style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              color: '#0f172a',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              transition: 'all 0.2s ease'
            }}
          >
            Assistance WhatsApp Directe
          </a>
        </div>
      </section>

      {/* Trust Highlights Bar */}
      <section style={{ background: '#0f172a', padding: '36px 20px', margin: '40px 0 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', textAlign: 'center' }}>
          {[
            ['Des 7 EUR / jour', 'Tarif web transparent'],
            ['0 MAD Livraison', 'Aeroport et gare inclus'],
            ['Kilometrage Illimite', 'Explorez tout le Maroc'],
            ['Assistance 24/7', 'Equipe terrain reactive']
          ].map(([title, subtitle]) => (
            <div key={title}>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#4ade80' }}>{title}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <section style={{ padding: '0 20px 70px', maxWidth: '1150px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '12px', color: '#0f172a' }}>
          Vehicules Disponibles pour Votre location voiture casablanca pas cher
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>
          Tous nos vehicules sont rigoureusement controles, climatises et garantis sans mauvaise surprise.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {vehicles.map((v) => (
            <div
              key={v.name}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {v.type}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{v.name}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '22px', fontWeight: '900', color: '#16a34a' }}>{v.price}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}> /j</span>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.6 }}>
                  <div>Autonomie : {v.autonomy}</div>
                  <div>Specification : {v.charge}</div>
                  <div>Places : {v.seats} personnes</div>
                  <div>Assurance : Incluse au tiers</div>
                </div>
              </div>
              <Link
                href="/booking"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0f172a',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px',
                  transition: 'background 0.2s ease'
                }}
              >
                Choisir ce vehicule
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Main Expert Blog / Guide Article */}
      <section style={{ background: '#ffffff', padding: '80px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <article style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
          
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', fontSize: '14px', color: '#64748b' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#16a34a', color: '#fff', fontWeight: '800', display: 'grid', placeItems: 'center', fontSize: '16px' }}>
              MV
            </div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>Equipe Technique & Terrain MoroccoVehicles</div>
              <div style={{ fontSize: '13px' }}>Guide et retour d experience terrain 2026 - Temps de lecture : 11 minutes</div>
            </div>
          </div>

          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', marginBottom: '24px', lineHeight: 1.3 }}>
            Pourquoi reserver votre location voiture casablanca pas cher chez MoroccoVehicles
          </h2>

          <p style={{ marginBottom: '22px' }}>
            Casablanca s etire de la Marina aux zones financieres de Sidi Maarouf. Compter uniquement sur les taxis rouges aux heures de pointe complique vite l emploi du temps et alourdit fortement le budget.
          </p>

          <p style={{ marginBottom: '22px' }}>
            Pour assurer votre independance, une location voiture casablanca pas cher vous garantit une autonomie absolue entre vos rendez-vous d affaires et vos promenades le long du boulevard de la Corniche.
          </p>

          <p style={{ marginBottom: '22px' }}>
            Nos agents interviennent 24h/24 aux terminaux 1 et 2 de Casablanca Nouaceur, aux gares Casa-Port et Casa-Voyageurs, ainsi que dans les quartiers du Maarif, Gauthier et Bourgogne.
          </p>

          <p style={{ marginBottom: '26px' }}>
            Tous nos vehicules sont equipes de la climatisation verifiee et de supports telephone adaptes pour faciliter le guidage GPS a travers les grandes arteres de la metropole.
          </p>

          {/* Section Retour d Experience Reel */}
          <div style={{ background: '#f8fafc', borderLeft: '4px solid #16a34a', padding: '28px', borderRadius: '0 12px 12px 0', margin: '36px 0' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '14px' }}>
              1. Retour d experience vecu : Dix ans de livraisons au Terminal 2 de Casablanca Mohammed V : Les pieges evites
            </h3>
            <p style={{ marginBottom: '16px', color: '#334155' }}>
              L aeroport Mohammed V de Casablanca constitue le poumon aerien du Royaume. De nombreux voyageurs se font accoster a la sortie douaniere par des rabatteurs informels proposant des citadines defraichies avec depot d especes non consigne et absence totale d assurance commerciale.
            </p>
            <p style={{ marginBottom: '16px', color: '#334155' }}>
              En choisissant notre prestation organisee, un jeune couple de vacanciers a ete accueilli au terminal avec leur contrat numerique pret a signer sur ecran tactile. Dix minutes plus tard, ils quittaient Nouaceur au volant d une citadine climatisee pour rejoindre la corniche d Ain Diab en toute securite.
            </p>
            <p style={{ margin: 0, color: '#334155' }}>
              Cette prise en main professionnelle evite les files d attente epuisantes et les cautions astronomiques. Notre equipe veille a chaque detail de conformite mecanique avant de remettre les cles aux conducteurs.
            </p>
          </div>

          <p style={{ marginBottom: '22px' }}>
            Cette histoire vecue resume exactement pourquoi nous avons concu notre offre de <strong>location voiture casablanca pas cher</strong> autour de principes stricts de transparence. Trop d agences traditionnelles attirent les locataires avec un montant d appel factice pour ensuite facturer des frais annexes arbitraires. En reservant directement aupres de notre portail, vous avez l assurance d un contrat net, sans frais caches et sans surprise.
          </p>

          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '40px', marginBottom: '16px' }}>
            Circulation urbaine et conseils pour votre location voiture casablanca pas cher
          </h3>

          <p style={{ marginBottom: '22px' }}>
            Pour circuler aisement dans la ville blanche, privilegiez les grands boulevards comme Zerktouni et la rocade sud pour eviter les engorgements du centre-ville entre 8h30 et 10h00.
          </p>

          <p style={{ marginBottom: '22px' }}>
            En programmant vos itineraires avec soin, vous gagnez du temps en stationnant dans les parkings souterrains gardes de la place Mohammed V ou du Maarif.
          </p>

          <p style={{ marginBottom: '22px' }}>
            Dans la gestion continue de notre parc de <strong>location voiture casablanca pas cher</strong>, nous constatons que la clarte administrative est la premiere attente des voyageurs. Un contrat clair, une inspection de carrosserie certifiee sur tablette avec photos horodatees et la remise immediate d un double numerique permettent de demarrer son periple l esprit totalement serein.
          </p>

          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '40px', marginBottom: '16px' }}>
            Flotte ideale pour une location voiture casablanca pas cher et agile
          </h3>

          <p style={{ marginBottom: '22px' }}>
            Nos compactes diesel et citadines agiles s inserent sans peine dans les ruelles commercantes tout en garantissant un coffre spacieux pour vos bagages d arrivee.
          </p>

          <p style={{ marginBottom: '22px' }}>
            Choisir notre formule chez MoroccoVehicles, c est allier securite mecanique certifiee, assistance continue et tarification directe des 7 EUR par jour.
          </p>

          <p style={{ marginBottom: '26px' }}>
            La maitrise des couts operationnels est la cle de notre positionnement. En eliminant les commissions des centrales de reservation etrangeres, nous pouvons reinvestir directement dans l entretien rigoureux de notre parc tout en garantissant des tarifs hautement competitifs sur le marche marocain.
          </p>

          {/* Strategic Checklist Box */}
          <div style={{ background: '#f1f5f9', padding: '28px', borderRadius: '12px', margin: '40px 0', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '12px' }}>
              Checklist Conseils Terrain MoroccoVehicles pour Votre Sejour
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
              <li>Verifiez toujours la validite de votre permis de conduire (au moins 12 mois d anciennete requis).</li>
              <li>Exigez un etat des lieux contradictoire numerise au depart pour votre contrat de <strong>location voiture casablanca pas cher</strong>.</li>
              <li>Privilegiez le pass Jawaz pour franchir les peages des autoroutes ADM sans file d attente.</li>
              <li>Enregistrez le numero de notre assistance continue 24/7 dans votre telephone portable des la remise des cles.</li>
              <li>Restituez le vehicule avec le meme niveau d energie ou de carburant stipule sur le contrat initial.</li>
            </ul>
          </div>

          <p style={{ marginBottom: '0' }}>
            En conclusion, que vous veniez pour des vacances en famille, un road trip cotier ou des reunions d affaires, opter pour notre formule de <strong>location voiture casablanca pas cher</strong> vous assure une mobilite fluide, economique et fiable sur toutes les routes du Royaume.
          </p>

        </article>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', maxWidth: '850px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '12px', color: '#0f172a' }}>
          Questions Frequentes Pratiques
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>
          Toutes les reponses claires a vos questions pratiques avant de reserver votre vehicule.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                border: '1px solid #e2e8f0'
              }}
            >
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{q}</h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Linking Mesh across Moroccan Destinations */}
      <section style={{ background: '#f1f5f9', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>
            Consultez Nos Autres Guides & Destinations au Maroc
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {neighborLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
