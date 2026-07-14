// src/app/page.js
import BookingWizard from '@/app/components/Booking/BookingWizard';

export const metadata = {
  title: 'MoroccoVehicles – Location de voitures au Maroc | Réservation en ligne',
  description:
    'Réservez votre voiture de location au Maroc en 3 étapes simples. Véhicules standard et de luxe disponibles à Fez, Casablanca, Marrakech, Rabat et Tanger.',
};

export default function Page() {
  return <BookingWizard />;
}