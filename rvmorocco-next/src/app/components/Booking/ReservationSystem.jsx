'use client';

import { useState } from 'react';

const EXTRAS_CONFIG = [
  { key: 'gps', label: 'GPS Premium', price: 50, desc: 'Navigation satellite mise à jour en temps réel.' },
  { key: 'babySeat', label: 'Siège Bébé', price: 30, desc: 'Siège certifié conforme aux normes européennes.' },
  { key: 'insurance', label: 'Assurance Zéro Franchise', price: 100, desc: 'Couverture complète, franchise réduite à 0 MAD.' },
];

/* =========================================================
   ReservationSystem – Step 2 (Form) & Step 3 (Success)
   ========================================================= */
export default function ReservationSystem({
  step,
  setStep,
  selectedCar,
  search,
  days,
  fmt,
  onReset
}) {
  const [extras, setExtras] = useState({ gps: false, babySeat: false, insurance: false });
  const [driver, setDriver] = useState({ name: '', email: '', phone: '', cin: '' });
  const [errors, setErrors] = useState({});
  const [bookingRef, setBookingRef] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const calcTotal = () => {
    if (!selectedCar) return 0;
    let total = selectedCar.pricePerDay * days();
    if (extras.gps) total += 50 * days();
    if (extras.babySeat) total += 30 * days();
    if (extras.insurance) total += 100 * days();
    return total;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const errs = {};
    if (!driver.name.trim()) errs.name = 'Nom obligatoire';
    if (!driver.email.trim() || !/\S+@\S+\.\S+/.test(driver.email)) errs.email = 'Email invalide';
    if (!driver.phone.trim()) errs.phone = 'Téléphone obligatoire';
    if (!driver.cin.trim()) errs.cin = 'CIN / Passeport obligatoire';
    if (Object.keys(errs).length) return setErrors(errs);

    const ref = `MVR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setTotalPrice(calcTotal());
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setExtras({ gps: false, babySeat: false, insurance: false });
    setDriver({ name: '', email: '', phone: '', cin: '' });
    setErrors({});
    setBookingRef('');
    setTotalPrice(0);
    onReset();
  };

  if (step === 2 && selectedCar) {
    return (
      <div className="wizard-panel">
        <div className="wizard-panel-head">
          <h2>Vos informations & options supplémentaires</h2>
          <p>Complétez les champs ci-dessous pour finaliser votre réservation.</p>
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

                {/* ── DRIVER FORM ── */}
                <p className="extras-heading">Informations du conducteur</p>
                <div className="driver-form-grid">
                  <div className="form-field">
                    <label>Nom complet</label>
                    <input
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="ex : Ahmed Benali"
                      value={driver.name}
                      onChange={e => setDriver({ ...driver, name: e.target.value })}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label>Adresse e-mail</label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="ex : ahmed@mail.com"
                      value={driver.email}
                      onChange={e => setDriver({ ...driver, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-field">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+212 6XX-XXXXXX"
                      value={driver.phone}
                      onChange={e => setDriver({ ...driver, phone: e.target.value })}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-field">
                    <label>CIN / Passeport</label>
                    <input
                      className={`form-input ${errors.cin ? 'error' : ''}`}
                      placeholder="ex : CD123456"
                      value={driver.cin}
                      onChange={e => setDriver({ ...driver, cin: e.target.value })}
                    />
                    {errors.cin && <span className="form-error">{errors.cin}</span>}
                  </div>
                </div>

                <div className="wizard-actions">
                  <button type="button" className="btn-back" onClick={() => setStep(1)}>Retour</button>
                  <button type="submit" className="btn-confirm">Confirmer la réservation</button>
                </div>
              </div>

              {/* ── SUMMARY PANEL ── */}
              <div className="summary-panel">
                <h3>Récapitulatif</h3>
                <img
                  src={selectedCar.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80'}
                  alt={selectedCar.name}
                  className="summary-car-img"
                />
                <div className="summary-row"><span>Véhicule</span><span>{selectedCar.name}</span></div>
                <div className="summary-row"><span>Départ</span><span>{search.pickup}</span></div>
                <div className="summary-row"><span>Retour</span><span>{search.dropoff}</span></div>
                <div className="summary-row"><span>Du</span><span>{fmt(search.dateFrom)}</span></div>
                <div className="summary-row"><span>Au</span><span>{fmt(search.dateTo)}</span></div>
                <div className="summary-row"><span>Durée</span><span>{days()} jour(s)</span></div>
                <div className="summary-row"><span>Tarif de base</span><span>{selectedCar.pricePerDay * days()} MAD</span></div>
                {extras.gps && <div className="summary-row"><span>GPS Premium</span><span>+{50 * days()} MAD</span></div>}
                {extras.babySeat && <div className="summary-row"><span>Siège Bébé</span><span>+{30 * days()} MAD</span></div>}
                {extras.insurance && <div className="summary-row"><span>Assurance 0 Franchise</span><span>+{100 * days()} MAD</span></div>}
                <div className="summary-total"><span>Total estimé</span><span>{calcTotal()} MAD</span></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === 3 && selectedCar) {
    return (
      <div className="wizard-panel">
        <div className="success-body">
          <div className="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h2>Réservation Confirmée !</h2>
          <p>Merci <strong>{driver.name}</strong>. Votre demande a bien été enregistrée. Notre agence partenaire vous contactera sous 24 h.</p>
          <div className="ref-box">
            <span className="ref-label">Code de réservation</span>
            <span className="ref-code">{bookingRef}</span>
          </div>
          <div className="receipt-card">
            <p className="receipt-title">Reçu estimé</p>
            <div className="receipt-row"><span>Véhicule</span><span>{selectedCar.name} — {selectedCar.type}</span></div>
            <div className="receipt-row"><span>Lieu de retrait</span><span>{search.pickup}</span></div>
            <div className="receipt-row"><span>Durée</span><span>{days()} jour(s)</span></div>
            <div className="receipt-row"><span>Conducteur</span><span>{driver.name} ({driver.cin})</span></div>
            <div className="receipt-row"><span>Téléphone</span><span>{driver.phone}</span></div>
            <div className="receipt-row">
              <span>Options</span>
              <span>
                {[extras.gps && 'GPS', extras.babySeat && 'Siège bébé', extras.insurance && 'Assurance 0 Franchise']
                  .filter(Boolean).join(', ') || 'Aucune'}
              </span>
            </div>
            <div className="receipt-row total-row"><span>Total estimé</span><span>{totalPrice} MAD</span></div>
          </div>
          <div className="info-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <strong>Instructions :</strong> Présentez-vous à l'agence à <strong>{search.pickup}</strong> le <strong>{fmt(search.dateFrom)}</strong> muni de votre permis de conduire original, votre pièce d'identité ({driver.cin}) et le montant de la location ({totalPrice} MAD).
          </div>
          <div className="success-actions">
            <button className="btn-new-booking" onClick={reset}>Nouvelle réservation</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}