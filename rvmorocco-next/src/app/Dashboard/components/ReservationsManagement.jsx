'use client';

import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ReservationsManagement({ user, setMessage, loadAllData }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      // Fetch contracts with status='pending'
      const res = await api.get('/contracts/my-contracts', {
        params: { status: 'pending', limit: 100 }
      });
      if (res.data?.success) {
        setReservations(res.data.contracts || []);
      }
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setMessage('Erreur lors de la récupération des demandes de réservation.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setProcessingId(id);
      const res = await api.patch(`/contracts/${id}`, { status: newStatus });
      if (res.data?.success) {
        setMessage(`✅ Réservation mise à jour avec succès : ${newStatus === 'active' ? 'Acceptée' : 'Refusée'}`);
        // Refresh local reservations and dashboard counters
        await fetchReservations();
        if (loadAllData) loadAllData();
      }
    } catch (err) {
      console.error('Error updating reservation status:', err);
      setMessage(err.response?.data?.message || 'Erreur lors de la modification de la réservation.');
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = reservations.filter(res => {
    const clientName = `${res.clientInfo?.firstName} ${res.clientInfo?.lastName}`.toLowerCase();
    const carName = (res.vehicleInfo?.name || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return clientName.includes(query) || carName.includes(query) || res.contractNumber?.toLowerCase().includes(query);
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={{
      background: '#1E2329',
      padding: '24px',
      borderRadius: '16px',
      color: '#EAECEF',
      minHeight: '600px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#F0B90B' }}>
            Demandes de Réservation
          </h2>
          <p style={{ color: '#848E9C', fontSize: '14px', margin: '4px 0 0' }}>
            Gérez les demandes reçues en temps réel via la plateforme de réservation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Rechercher (client, voiture, réf)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: '#2B3139',
              border: '1px solid #474F59',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              width: '260px'
            }}
          />
          <button
            onClick={fetchReservations}
            style={{
              background: '#2B3139',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              color: '#F0B90B',
              cursor: 'pointer'
            }}
            title="Rafraîchir"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(240, 185, 11, 0.2)',
            borderTopColor: '#F0B90B',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#848E9C', marginTop: '16px', fontSize: '14px' }}>Chargement des réservations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#2B3139',
          borderRadius: '12px',
          border: '1px dashed #474F59'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#848E9C" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#EAECEF', margin: '0 0 8px' }}>
            Aucune demande en attente
          </h3>
          <p style={{ color: '#848E9C', fontSize: '13px', margin: 0 }}>
            {searchTerm ? 'Aucun résultat ne correspond à votre recherche.' : 'Toutes les demandes de réservation ont été traitées.'}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2B3139', color: '#848E9C', fontSize: '13px' }}>
                <th style={{ padding: '12px 16px' }}>Référence</th>
                <th style={{ padding: '12px 16px' }}>Client</th>
                <th style={{ padding: '12px 16px' }}>Véhicule</th>
                <th style={{ padding: '12px 16px' }}>Dates & Villes</th>
                <th style={{ padding: '12px 16px' }}>Options</th>
                <th style={{ padding: '12px 16px' }}>Montant</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(res => {
                const isProcessing = processingId === res._id;
                const optionsList = [];
                if (res.rentalInfo?.surveillanceCost > 0) optionsList.push('GPS');
                if (res.rentalInfo?.babySeatCost > 0) optionsList.push('Siège Bébé');
                if (res.rentalInfo?.insuranceCost > 0) optionsList.push('Assurance 0 Franchise');

                return (
                  <tr key={res._id} style={{
                    borderBottom: '1px solid #2B3139',
                    fontSize: '14px',
                    backgroundColor: '#1E2329',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2B3139'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E2329'}
                  >
                    <td style={{ padding: '16px' }}>
                      <strong style={{ color: '#F0B90B', display: 'block' }}>{res.contractNumber}</strong>
                      <span style={{ fontSize: '11px', color: '#848E9C' }}>Reçu le {formatDate(res.createdAt)}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>
                        {res.clientInfo?.firstName} {res.clientInfo?.lastName}
                      </strong>
                      <span style={{ fontSize: '12px', color: '#848E9C' }}>CIN: {res.clientInfo?.cin}</span>
                      <span style={{ fontSize: '12px', color: '#848E9C', display: 'block' }}>Tél: {res.clientInfo?.phone}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>{res.vehicleInfo?.name}</strong>
                      <span style={{ fontSize: '12px', color: '#848E9C' }}>Matricule: {res.vehicleInfo?.matricule}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                        <div><strong>Du:</strong> {formatDate(res.rentalInfo?.startDateTime)}</div>
                        <div><strong>Au:</strong> {formatDate(res.rentalInfo?.endDateTime)}</div>
                        <span style={{ color: '#848E9C', fontSize: '12px' }}>{res.rentalInfo?.startLocation}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      {optionsList.length > 0 ? (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {optionsList.map(opt => (
                            <span key={opt} style={{ background: '#474F59', color: '#EAECEF', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>
                              {opt}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#848E9C', fontSize: '12px' }}>Aucune</span>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ color: '#36c275', fontSize: '15px' }}>
                        {res.rentalInfo?.prixTotal || res.rentalInfo?.subtotal || 0} MAD
                      </strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#848E9C' }}>
                        {res.rentalInfo?.rentalDays} jour(s)
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          disabled={isProcessing}
                          onClick={() => handleUpdateStatus(res._id, 'active')}
                          style={{
                            background: '#36c275',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 14px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: 'pointer',
                            opacity: isProcessing ? 0.6 : 1
                          }}
                        >
                          Accepter
                        </button>
                        <button
                          disabled={isProcessing}
                          onClick={() => handleUpdateStatus(res._id, 'cancelled')}
                          style={{
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 14px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: 'pointer',
                            opacity: isProcessing ? 0.6 : 1
                          }}
                        >
                          Décliner
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
