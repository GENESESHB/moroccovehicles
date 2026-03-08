import React from 'react';
// Importing icons
import { FaBan, FaPhone, FaIdCard, FaEnvelope } from 'react-icons/fa';

const Blacklist = ({ blacklist }) => {
  return (
    <div className="blacklist-container">
      <h2 className="blacklist-title">Liste Noire ({blacklist.length})</h2>

      {blacklist.length === 0 ? (
        <div className="empty-state">
          <FaBan className="empty-icon" />
          <p>Aucun client dans la liste noire</p>
        </div>
      ) : (
        <div className="blacklist-grid">
          {blacklist.map(client => (
            <div key={client.id} className="blacklist-card">
              {/* Card Header with Status Icon and Name */}
              <div className="card-header">
                <div className="ban-wrapper">
                    <FaBan />
                </div>
                <div className="client-header-info">
                    <h4>{client.clientName}</h4>
                    <span className="added-date">
                        Ajouté le {new Date(client.createdAt).toLocaleDateString()} par {client.addedBy}
                    </span>
                </div>
              </div>

              {/* Client Details with Green Icons */}
              <div className="client-details">
                {client.clientCIN && (
                  <div className="detail-row">
                    <span className="icon-box"><FaIdCard /></span>
                    <span>{client.clientCIN}</span>
                  </div>
                )}
                {client.clientPhone && (
                  <div className="detail-row">
                    <span className="icon-box"><FaPhone /></span>
                    <span>{client.clientPhone}</span>
                  </div>
                )}
                {client.clientEmail && (
                  <div className="detail-row">
                    <span className="icon-box"><FaEnvelope /></span>
                    <span>{client.clientEmail}</span>
                  </div>
                )}
              </div>

              {/* Reason Section */}
              {client.reason && (
                <div className="reason-section">
                  <span className="reason-label">Raison:</span>
                  <span className="reason-text">{client.reason}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style>{`
        .blacklist-container {
          background-color: #1E2329;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #2B3139;
        }

        .blacklist-title {
          color: #EAECEF;
          margin: 0 0 20px 0;
          font-size: 20px;
          font-weight: 600;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            color: #848E9C;
            gap: 12px;
        }

        .empty-icon {
            width: 32px;
            height: 32px;
            color: #2B3139;
        }

        .blacklist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .blacklist-card {
            background-color: #2B3139;
            border-radius: 8px;
            padding: 16px;
            border: 1px solid #363e4a;
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .blacklist-card:hover {
            transform: translateY(-2px);
            border-color: #36c275;
        }

        .card-header {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #363e4a;
        }

        .ban-wrapper {
            color: #dc2626; /* Red for banned status */
            background: rgba(220, 38, 38, 0.1);
            padding: 8px;
            border-radius: 8px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .client-header-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .client-header-info h4 {
            margin: 0;
            color: #EAECEF;
            font-size: 16px;
            font-weight: 600;
        }

        .added-date {
            font-size: 11px;
            color: #848E9C;
        }

        .client-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .detail-row {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #EAECEF;
            font-size: 14px;
        }

        .icon-box {
            color: #36c275; /* Requested Green Color */
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .icon-box svg {
            width: 16px;
            height: 16px;
        }

        .reason-section {
            background: rgba(220, 38, 38, 0.05);
            padding: 10px;
            border-radius: 6px;
            border-left: 3px solid #dc2626;
            margin-top: 4px;
        }

        .reason-label {
            display: block;
            font-size: 11px;
            color: #dc2626;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .reason-text {
            font-size: 13px;
            color: #fca5a5;
            line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default Blacklist;