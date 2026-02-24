// src/app/partner/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PartnerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    entreprise: '',
    number: '',
    email: '',
    password: '',
    logoEntreprise: null,
    country: '',
    city: ''
  });
  const [message, setMessage] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [captchaUserInput, setCaptchaUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef(null);

  // Générer une nouvelle question CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const useAddition = Math.random() > 0.5;
    let question, answer;
    if (useAddition || num1 >= num2) {
      question = `${num1} ${useAddition ? '+' : '-'} ${num2} = ?`;
      answer = useAddition ? num1 + num2 : num1 - num2;
    } else {
      question = `${num2} - ${num1} = ?`;
      answer = num2 - num1;
    }
    setCaptchaQuestion(question);
    setCaptchaAnswer(answer);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, logoEntreprise: file });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (parseInt(captchaUserInput) !== captchaAnswer) {
      setMessage('CAPTCHA incorrect. Veuillez réessayer.');
      generateCaptcha();
      setCaptchaUserInput('');
      setIsSubmitting(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === 'logoEntreprise' && form.logoEntreprise) {
          formData.append(key, form.logoEntreprise);
        } else if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      await axios.post(
        'https://formspree.io/f/xqaagbjk',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMessage('Merci ! Votre demande de partenariat a été envoyée. Nous vous contacterons sous 48h.');

      // ✅ Redirection vers la page d'accueil après 2 secondes
      timeoutRef.current = setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      setMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push('/login'); // Si vous avez une page login, sinon vous pouvez supprimer ce bouton
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* 🖼️ Hero section avec image de couverture */}
      <div style={{
        backgroundImage: 'url(/images/morocco-vehicles1.jpeg)', // Utilise l'une de tes images
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        {/* Overlay sombre */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '16px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
          }}>
            Devenez Partenaire
          </h1>
          <p style={{
            fontSize: '20px',
            fontWeight: '500',
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
          }}>
            Rejoignez notre réseau de fournisseurs et développez votre activité
          </p>
        </div>
      </div>

      {/* Formulaire (identique à ton code original) */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            background: '#36c275',
            boxShadow: '0 6px 18px rgba(54, 194, 117, .35)',
            color: '#fff',
            fontSize: '20px',
            fontWeight: '800'
          }}>
            M.
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#36c275',
              margin: 0,
              lineHeight: '1.2'
            }}>
              MoroccoVehicles
            </h2>
          </div>
        </div>

        <p style={{
          color: '#6b7b8a',
          fontWeight: '600',
          marginBottom: '32px',
          fontSize: '16px'
        }}>
          Remplissez le formulaire ci‑dessous
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* (Ton formulaire existant, inchangé) */}
          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Nom complet */}
            <div>
              <label style={labelStyle}>Nom complet *</label>
              <input
                name="name"
                placeholder="Votre nom complet"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* Entreprise */}
            <div>
              <label style={labelStyle}>Nom de l'entreprise *</label>
              <input
                name="entreprise"
                placeholder="Nom de votre entreprise"
                value={form.entreprise}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* Téléphone */}
            <div>
              <label style={labelStyle}>Numéro de téléphone *</label>
              <input
                name="number"
                placeholder="+212 6XX XX XX XX"
                value={form.number}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email professionnel *</label>
              <input
                name="email"
                type="email"
                placeholder="contact@entreprise.ma"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label style={labelStyle}>Mot de passe *</label>
              <input
                name="password"
                type="password"
                placeholder="Créez un mot de passe"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* Logo */}
            <div>
              <label style={labelStyle}>Logo de l'entreprise</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Aperçu"
                  style={{
                    marginTop: '12px',
                    maxWidth: '100px',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>

            {/* Pays / Ville */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Pays</label>
                <input
                  name="country"
                  placeholder="Maroc"
                  value={form.country}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Ville</label>
                <input
                  name="city"
                  placeholder="Casablanca"
                  value={form.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <label style={labelStyle}>Vérification de sécurité *</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  background: '#f0f0f0',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  {captchaQuestion}
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  disabled={isSubmitting}
                  style={{
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 7.5 4" />
                    <path d="M21 3v6h-6" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Votre réponse"
                value={captchaUserInput}
                onChange={(e) => setCaptchaUserInput(e.target.value)}
                required
                disabled={isSubmitting}
                style={{ ...inputStyle, marginTop: '8px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              marginTop: '24px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '700',
              background: '#36c275',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Devenir Partenaire'}
          </button>
        </form>

        {/* Message de statut */}
        {message && (
          <p style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            background: message.includes('Merci') ? '#d4edda' : '#f8d7da',
            color: message.includes('Merci') ? '#155724' : '#721c24',
            fontWeight: '600'
          }}>
            {message}
          </p>
        )}

        {/* Lien vers connexion (optionnel, supprimable) */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#6b7b8a', fontWeight: '600', marginBottom: '16px' }}>
            Déjà partenaire ?
          </p>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #36c275',
              borderRadius: '12px',
              background: 'transparent',
              color: '#36c275',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#36c275';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#36c275';
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles réutilisables
const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: '#142534',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  fontSize: '14px',
  background: '#fff',
  transition: 'all 0.2s',
  outline: 'none'
};