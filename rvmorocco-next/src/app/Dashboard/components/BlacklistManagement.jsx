import React, { useState } from 'react';
import api from '../utils/api';
import { 
  FaSearch, 
  FaIdCard, 
  FaBan, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaCar,
  FaTimes,
  FaFilter,
  FaEllipsisV
} from 'react-icons/fa';

const BlacklistManagement = ({ user, setMessage }) => {
  const [cin, setCin] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCinChange = (e) => {
    setCin(e.target.value);
    setCheckResult(null);
  };

  const verifyByCIN = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCheckResult(null);

    try {
      const res = await api.get('/blacklist-verify/verify-by-cin', {
        params: { cin }
      });

      setCheckResult(res.data);
      setMessage(res.data.isBlacklisted ? '❌ Client trouvé dans la liste noire!' : '✅ Client non trouvé dans la liste noire');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error verifying CIN:', err);
      setMessage('❌ Erreur lors de la vérification');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333',
      padding: '20px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '8px'
            }}>
              Vérification de la Liste Noire
            </h1>
            <p style={{
              margin: 0,
              color: '#666666',
              fontSize: '14px'
            }}>
              Vérifiez si un client se trouve dans la liste noire en utilisant son CIN
            </p>
          </div>
          
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#F44336',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '24px'
          }}>
            <FaSearch />
          </div>
        </div>
      </div>

      {/* Verification Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '24px',
        marginBottom: '20px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #E0E0E0'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#333333',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaIdCard style={{ color: '#F44336' }} />
            Vérifier par CIN
          </h2>
          
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#FFF3E0',
            color: '#FF9800',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FaExclamationTriangle />
            <span>Protection contre la fraude</span>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={verifyByCIN}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '14px'
              }}>
                CIN du client <span style={{color: '#F44336'}}>*</span>
              </label>
              <input
                type="text"
                value={cin}
                onChange={handleCinChange}
                placeholder="Saisir le numéro CIN"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${checkResult ? (checkResult.isBlacklisted ? '#F44336' : '#4CAF50') : '#E0E0E0'}`,
                  borderRadius: '6px',
                  color: '#333333',
                  fontSize: '14px',
                  transition: 'border-color 0.2s ease'
                }}
              />
              <div style={{
                fontSize: '12px',
                color: '#666666',
                marginTop: '4px'
              }}>
                Format: 6 chiffres + 2 lettres (ex: 123456AB)
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !cin.trim()}
              style={{
                padding: '12px 24px',
                backgroundColor: loading ? '#BDBDBD' : '#2196F3',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: loading || !cin.trim() ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '28px',
                whiteSpace: 'nowrap',
                minWidth: '140px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!loading && cin.trim()) e.target.style.backgroundColor = '#1976D2';
              }}
              onMouseLeave={(e) => {
                if (!loading && cin.trim()) e.target.style.backgroundColor = '#2196F3';
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Vérification...
                </>
              ) : (
                <>
                  <FaSearch style={{ width: '14px', height: '14px' }} />
                  Vérifier par CIN
                </>
              )}
            </button>
          </div>
        </form>

        {/* Display Results */}
        {checkResult && (
          <div style={{
            marginTop: '24px',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${checkResult.isBlacklisted ? '#F44336' : '#4CAF50'}`,
            backgroundColor: checkResult.isBlacklisted ? '#FFEBEE' : '#E8F5E9',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: checkResult.isBlacklisted && checkResult.client ? '16px' : '0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: checkResult.isBlacklisted ? '#F44336' : '#4CAF50',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '18px'
              }}>
                {checkResult.isBlacklisted ? <FaBan /> : <FaCheckCircle />}
              </div>
              
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: checkResult.isBlacklisted ? '#D32F2F' : '#2E7D32'
                }}>
                  {checkResult.isBlacklisted ? '❌ Client dans la Liste Noire' : '✅ Client Non Listé'}
                </h3>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '14px',
                  color: checkResult.isBlacklisted ? '#D32F2F' : '#2E7D32'
                }}>
                  {checkResult.isBlacklisted 
                    ? 'Ce client est inscrit dans la liste noire' 
                    : 'Ce client n\'est pas trouvé dans la liste noire'}
                </p>
              </div>
            </div>

            {checkResult.isBlacklisted && checkResult.client && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #E0E0E0'
              }}>
                <h4 style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FaUser style={{ color: '#F44336' }} />
                  Informations du Client
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  {checkResult.client.cin && (
                    <div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        marginBottom: '4px'
                      }}>
                        CIN
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#333333'
                      }}>
                        {checkResult.client.cin}
                      </div>
                    </div>
                  )}
                  
                  {checkResult.client.passport && (
                    <div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        marginBottom: '4px'
                      }}>
                        Passeport
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#333333'
                      }}>
                        {checkResult.client.passport}
                      </div>
                    </div>
                  )}
                  
                  {checkResult.client.licenseNumber && (
                    <div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        marginBottom: '4px'
                      }}>
                        Permis de conduire
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#333333'
                      }}>
                        {checkResult.client.licenseNumber}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '4px'
                    }}>
                      Raison de la mise en liste noire
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333333',
                      lineHeight: '1.4'
                    }}>
                      {checkResult.client.reason}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <FaCalendarAlt style={{ width: '12px', height: '12px' }} />
                      Date d'ajout
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333333'
                    }}>
                      {new Date(checkResult.client.dateAdded).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Additional Information */}
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#FFF3E0',
                  borderRadius: '6px',
                  border: '1px solid #FFB300'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <FaExclamationTriangle style={{
                      color: '#FF9800',
                      fontSize: '14px',
                      marginTop: '2px',
                      flexShrink: 0
                    }} />
                    <div style={{
                      fontSize: '12px',
                      color: '#333333'
                    }}>
                      <strong>Recommandation:</strong> Il est recommandé de ne pas autoriser la location à ce client.
                      Consultez votre responsable pour plus d'informations.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Information Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '20px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FaExclamationTriangle style={{ color: '#FF9800' }} />
          À propos de la liste noire
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            padding: '12px',
            backgroundColor: '#F8F9FA',
            borderRadius: '6px',
            border: '1px solid #E0E0E0'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '4px'
            }}>
              Pourquoi cette vérification ?
            </div>
            <div style={{
              fontSize: '13px',
              color: '#666666',
              lineHeight: '1.5'
            }}>
              La vérification de la liste noire permet de protéger votre entreprise contre les clients 
              ayant des antécédents de non-paiement, de dommages aux véhicules, ou de comportement frauduleux.
            </div>
          </div>
          
          <div style={{
            padding: '12px',
            backgroundColor: '#F8F9FA',
            borderRadius: '6px',
            border: '1px solid #E0E0E0'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '4px'
            }}>
              Quand effectuer cette vérification ?
            </div>
            <div style={{
              fontSize: '13px',
              color: '#666666',
              lineHeight: '1.5'
            }}>
              Effectuez cette vérification avant chaque nouvelle location de véhicule pour assurer 
              la sécurité de votre flotte et éviter les risques financiers.
            </div>
          </div>
          
          <div style={{
            padding: '12px',
            backgroundColor: '#F8F9FA',
            borderRadius: '6px',
            border: '1px solid #E0E0E0'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '4px'
            }}>
              Confidentialité des données
            </div>
            <div style={{
              fontSize: '13px',
              color: '#666666',
              lineHeight: '1.5'
            }}>
              Les informations de vérification sont traitées de manière confidentielle et sécurisée, 
              conformément aux réglementations en vigueur sur la protection des données.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input:focus {
          outline: none;
          border-color: #2196F3 !important;
          box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
        }
        
        @media (max-width: 768px) {
          .blacklist-management {
            padding: 16px;
          }
          
          .header-content, .verification-form {
            flex-direction: column;
          }
          
          .verification-form > div {
            width: 100%;
          }
          
          button[type="submit"] {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BlacklistManagement;