// src/app/layout.js
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

export const metadata = {
  title: {
    default: 'MoroccoVehicles – Logiciel de gestion de flotte au Maroc',
    template: '%s | MoroccoVehicles',
  },
  description: 'La solution digitale complète pour gérer votre parc automobile au Maroc : digitalisation des contrats, suivi en temps réel, gestion de la maintenance.',
  metadataBase: new URL('https://moroccovehicles.com'),
  openGraph: {
    title: 'MoroccoVehicles – Logiciel de gestion de flotte automobile',
    description: 'Optimisez vos locations, suivez vos véhicules en temps réel et maximisez votre rentabilité avec MoroccoVehicles.',
    url: 'https://moroccovehicles.com',
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: '/images/rv-morocco.jpeg',
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Interface de gestion de flotte',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: '/moroccovehicles-logo.svg',
    apple: '/apple-icon.png',
  },
  // ✅ Google Search Console verification
  other: {
    'google-site-verification': 'VMZfS3UmEcW5Fb6qwJq756y7WUGCD_TTi1xpfTXgX-U',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main style={{ padding: '0px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}