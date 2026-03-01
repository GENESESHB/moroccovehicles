import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

export const metadata = {
  title: {
    default: 'MoroccoVehicles – Logiciel de gestion de flotte automobile au Maroc',
    template: '%s | MoroccoVehicles',
  },
  description: 'Logiciel de gestion de flotte automobile au Maroc. Digitalisation des contrats, suivi GPS temps réel, maintenance préventive. Solution SaaS pour loueurs et entreprises.',
  keywords: [
    'gestion de flotte Maroc',
    'logiciel parc automobile',
    'fleet management Morocco',
    'digitalisation contrats location',
    'suivi véhicules temps réel',
    'maintenance préventive véhicules',
    'logiciel location voiture Maroc',
    'système gestion véhicules entreprise',
    'Morocco fleet software',
    'SaaS gestion automobile'
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-MA" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      
      <body className="antialiased">
        <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: '-9999px', zIndex: 999 }}>
          Aller au contenu principal
        </a>
        
        <Header />
        
        <main id="main-content" role="main" style={{ padding: '0px' }}>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}