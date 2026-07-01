// src/app/components/Booking/ReservationSystem.jsx
'use client';

import { useState } from 'react';
import api from '@/app/utils/api';

const EXTRAS_CONFIG = [
  { key: 'gps', label: 'GPS Premium', price: 50, desc: 'Navigation satellite mise à jour en temps réel.' },
  { key: 'babySeat', label: 'Siège Bébé', price: 30, desc: 'Siège certifié conforme aux normes européennes.' },
  { key: 'insurance', label: 'Assurance Zéro Franchise', price: 100, desc: 'Couverture complète, franchise réduite à 0 MAD.' },
];

export default function ReservationSystem({
  step,
  setStep,
  selectedCar,
  search,
  days,
  fmt,
  onReset,
  driver,
  setDriver,
  extras,
  setExtras,
  bookingDetails,
  setBookingDetails
}) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const calcTotal = () => {
    if (!selectedCar) return 0;
    let total = selectedCar.pricePerDay * days();
    if (extras.gps) total += 50 * days();
    if (extras.babySeat) total += 30 * days();
    if (extras.insurance) total += 100 * days();
    return total;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        vehicleId: selectedCar._id,
        pickup: search.pickup,
        dropoff: search.dropoff,
        dateFrom: search.dateFrom,
        dateTo: search.dateTo,
        driverInfo: driver,
        extras: extras
      };

      const response = await api.post('/contracts/public/reserve', payload);
      
      if (response.data?.success) {
        setBookingDetails(response.data);
        setStep(4); // Go to Step 4: Confirmation page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(response.data?.message || 'Erreur lors de la création de la réservation.');
      }
    } catch (err) {
      console.error('Erreur API Réservation:', err);
      setErrorMsg(err.response?.data?.message || 'Erreur réseau lors de la communication avec la base de données.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 3 && selectedCar) {
    return (
      <div className="wizard-panel">
        <div className="wizard-panel-head">
          <h2>Sélectionnez vos options & packs</h2>
          <p>Personnalisez votre voyage en choisissant vos packs additionnels.</p>
        </div>
        <div className="wizard-panel-body">
          <form onSubmit={handleConfirm}>
            <div className="step2-grid">
              <div>
                {/* ── EXTRAS ── */}
                <p className="extras-heading">Options supplémentaires</p>
                <div className="extras-row">
                  {EXTRAS_CONFIG.map(ex => (
                    <div
                      key={ex.key}
                      className={`extra-card ${extras[ex.key] ? 'selected' : ''}`}
                      onClick={() => setExtras({ ...extras, [ex.key]: !extras[ex.key] })}
                    >
                      <div className="extra-card-top">
                        <input type="checkbox" readOnly checked={extras[ex.key]} />
                        <strong>{ex.label}</strong>
                      </div>
                      <span className="extra-price-tag">+{ex.price} MAD/jour</span>
                      <p className="extra-desc">{ex.desc}</p>
                    </div>
                  ))}
                </div>

                {/* ── DRIVER DETAILS REVIEW ── */}
                <p className="extras-heading" style={{ marginTop: '32px' }}>Détails du conducteur (Résumé)</p>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                    <div><strong>Conducteur :</strong> {driver.name}</div>
                    <div><strong>CIN / Passeport :</strong> {driver.cin}</div>
                    <div><strong>Email :</strong> {driver.email}</div>
                    <div><strong>Téléphone :</strong> {driver.phone}</div>
                  </div>
                </div>

                {errorMsg && (
                  <div style={{ color: '#ef4444', background: '#fef2f2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                    {errorMsg}
                  </div>
                )}

                <div className="wizard-actions">
                  <button type="button" className="btn-back" onClick={() => setStep(2)} disabled={submitting}>
                    ← Modifier le véhicule
                  </button>
                  <button type="submit" className="btn-confirm" disabled={submitting} style={{ background: '#36c275', color: '#fff', padding: '14px 28px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {submitting ? (
                      <>
                        <span className="btn-spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                        Enregistrement...
                      </>
                    ) : (
                      'Confirmer & Enregistrer'
                    )}
                  </button>
                </div>
              </div>

              {/* ── SUMMARY PANEL ── */}
              <div className="summary-panel">
                <h3>Récapitulatif</h3>
                <img
                  src={selectedCar.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80'}
                  alt={selectedCar.name}
                  className="summary-car-img"
                  style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
                />
                <div className="summary-row"><span>Véhicule</span><span>{selectedCar.name}</span></div>
                <div className="summary-row"><span>Catégorie</span><span>{selectedCar.carburant === 'Electrique' ? 'Électrique' : selectedCar.type || 'Standard'}</span></div>
                <div className="summary-row"><span>Départ</span><span>{search.pickup}</span></div>
                <div className="summary-row"><span>Retour</span><span>{search.dropoff}</span></div>
                <div className="summary-row"><span>Du</span><span>{fmt(search.dateFrom)}</span></div>
                <div className="summary-row"><span>Au</span><span>{fmt(search.dateTo)}</span></div>
                <div className="summary-row"><span>Durée</span><span>{days()} jour(s)</span></div>
                <div className="summary-row"><span>Tarif de base</span><span>{selectedCar.pricePerDay * days()} MAD</span></div>
                {extras.gps && <div className="summary-row"><span>GPS Premium</span><span>+{50 * days()} MAD</span></div>}
                {extras.babySeat && <div className="summary-row"><span>Siège Bébé</span><span>+{30 * days()} MAD</span></div>}
                {extras.insurance && <div className="summary-row"><span>Assurance 0 Franchise</span><span>+{100 * days()} MAD</span></div>}
                <div className="summary-total" style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '16px', marginTop: '16px', fontWeight: '800', fontSize: '18px' }}>
                  <span>Total estimé</span>
                  <span>{calcTotal()} MAD</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (step === 4 && selectedCar && bookingDetails) {
    const { contractNumber, totalPrice } = bookingDetails;
    return (
      <div className="wizard-panel">
        <div className="success-body" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
          <div className="success-icon" style={{ width: '64px', height: '64px', background: '#36c275', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 24px', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Votre véhicule est réservé !</h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>
            Merci <strong>{driver.name}</strong>. Votre demande de réservation a bien été enregistrée dans notre base de données. Notre agence partenaire prendra contact avec vous très rapidement.
          </p>
          
          <div className="ref-box" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', margin: '0 auto 32px', maxWidth: '380px' }}>
            <span className="ref-label" style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', marginBottom: '4px' }}>Code de Réservation (Numéro de Contrat)</span>
            <span className="ref-code" style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{contractNumber}</span>
          </div>

          <div className="receipt-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'left', marginBottom: '32px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <p className="receipt-title" style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              Détails de la réservation
            </p>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Véhicule</span>
              <strong>{selectedCar.name} — {selectedCar.carburant === 'Electrique' ? 'Électrique' : selectedCar.type || 'Standard'}</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Retrait & Restitution</span>
              <strong>{search.pickup}</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Dates de location</span>
              <strong>Du {search.dateFrom} au {search.dateTo}</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Durée</span>
              <strong>{days()} jour(s)</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Conducteur</span>
              <strong>{driver.name} ({driver.cin})</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Téléphone</span>
              <strong>{driver.phone}</strong>
            </div>
            <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#64748b' }}>Options incluses</span>
              <strong>
                {[extras.gps && 'GPS', extras.babySeat && 'Siège bébé', extras.insurance && 'Assurance 0 Franchise']
                  .filter(Boolean).join(', ') || 'Aucune'}
              </strong>
            </div>
            <div className="receipt-row total-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', fontSize: '18px', fontWeight: '800', borderTop: '2px dashed #e2e8f0', marginTop: '12px' }}>
              <span>Total Estimé</span>
              <span style={{ color: '#36c275' }}>{totalPrice} MAD</span>
            </div>
          </div>

          <div className="info-box" style={{ display: 'flex', gap: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '32px', fontSize: '14px', color: '#166534', alignItems: 'flex-start' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <div>
              <strong>Instructions de retrait :</strong> Présentez-vous à l'agence de <strong>{search.pickup}</strong> le <strong>{fmt(search.dateFrom)}</strong> muni de votre permis de conduire original, de votre CIN/Passeport ({driver.cin}) et du montant total de la location ({totalPrice} MAD).
            </div>
          </div>
          
          <div className="success-actions">
            <button className="btn-new-booking" onClick={onReset} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}