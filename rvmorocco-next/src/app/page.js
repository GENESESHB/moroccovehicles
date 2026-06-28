import BookingWizard from '@/app/components/Booking/BookingWizard';

export const metadata = {
  title: 'MoroccoVehicles – Location de voitures au Maroc | Réservation en ligne',
  description:
    'Réservez votre voiture de location au Maroc en 3 étapes simples. Véhicules standard et de luxe disponibles à Fez, Casablanca, Marrakech, Rabat et Tanger.',
  openGraph: {
    title: 'MoroccoVehicles – Location de voitures au Maroc',
    description:
      'Réservez votre voiture de location au Maroc en 3 étapes simples. Véhicules standard et de luxe disponibles dans toutes les grandes villes.',
    url: 'https://moroccovehicles.com',
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: 'https://moroccovehicles.com/images/morocco-vehicles1.jpeg',
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Location de voitures au Maroc',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function Page() {
  return <BookingWizard />;
}