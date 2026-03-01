import FleetSoftwareShowcase from './components/FleetSoftwareShowcase';

export const metadata = {
  title: 'MoroccoVehicles – Logiciel de gestion de flotte automobile au Maroc',
  description: 'Optimisez vos locations, suivez vos véhicules en temps réel et maximisez votre rentabilité avec MoroccoVehicles. Solution complète pour agences de location.',
  openGraph: {
    title: 'MoroccoVehicles – Logiciel de gestion de flotte automobile',
    description: 'Optimisez vos locations, suivez vos véhicules en temps réel et maximisez votre rentabilité avec MoroccoVehicles.',
    url: 'https://moroccovehicles.com',
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: 'https://moroccovehicles.com/images/morocco-vehicles1.jpeg', // or rv-morocco.jpeg – pick the most representative image
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Interface de gestion de flotte',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function Page() {
  return <FleetSoftwareShowcase />;
}