// src/app/booking/page.js
import { Suspense } from 'react';
import BookingWizard from '@/app/components/Booking/BookingWizard';

export const metadata = {
  title: 'MoroccoVehicles – Réservation de véhicule en ligne',
  description: 'Réservez votre voiture de location au Maroc. Large choix de véhicules standard, de luxe et électriques.',
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Chargement des véhicules disponibles...</div>}>
      <BookingWizard />
    </Suspense>
  );
}

