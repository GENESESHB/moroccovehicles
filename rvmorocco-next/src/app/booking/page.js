// src/app/booking/page.js
import BookingWizard from '@/app/components/Booking/BookingWizard';

export const metadata = {
  title: 'MoroccoVehicles – Réservation de véhicule en ligne',
  description: 'Réservez votre voiture de location au Maroc. Large choix de véhicules standard, de luxe et électriques.',
};

export default function BookingPage() {
  return <BookingWizard />;
}
