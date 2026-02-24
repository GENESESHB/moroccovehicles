'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';
import axios from 'axios'; // Make sure axios is installed: npm install axios

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState(null); // 'SUCCESS' or 'ERROR'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // Prepare FormData for Formspree
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);

    try {
      await axios.post('https://formspree.io/f/xqaagbjk', formDataToSend);
      setStatus('SUCCESS');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: 'Téléphone',
      content: '+212 622 283 559',
      subContent: 'Lun-Ven, 9h-18h',
      color: '#28a745'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      title: 'Email',
      content: 'contact@moroccovehicles.com',
      subContent: 'Réponse sous 24h',
      color: '#1976d2'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: 'Adresse',
      content: 'Casablanca, Maroc',
      subContent: 'Siège Social',
      color: '#f57c00'
    }
  ];

  return (
    <div className={styles['contact-page']}>
      {/* Hero Header */}
      <section className={styles['contact-hero']}>
        <div className={styles.container}>
          <div className={styles['hero-content']}>
            <span className={styles.badge}>Contact</span>
            <h1>Parlons de Votre Projet</h1>
            <p className={styles['hero-subtitle']}>
              Vous souhaitez digitaliser votre flotte ou avez des questions sur MoroccoVehicles ? 
              Notre équipe d'experts est à votre disposition pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles['contact-main']}>
        <div className={styles.container}>
          <div className={styles['contact-grid']}>
            {/* Left Side - Info Cards */}
            <div className={styles['contact-info-side']}>
              <div className={styles['info-header']}>
                <h2>Informations de Contact</h2>
                <p>Choisissez le canal qui vous convient le mieux pour nous joindre.</p>
              </div>

              <div className={styles['info-cards']}>
                {contactInfo.map((item, index) => (
                  <div key={index} className={styles['info-card']} style={{ '--accent-color': item.color }}>
                    <div className={styles['info-icon']} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div className={styles['info-content']}>
                      <h3>{item.title}</h3>
                      <p className={styles['info-main']}>{item.content}</p>
                      <p className={styles['info-sub']}>{item.subContent}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className={styles['social-section']}>
                <h4>Suivez-nous</h4>
                <div className={styles['social-links']}>
                  <a href="https://www.linkedin.com/in/morocco-vehicles/" className={`${styles['social-btn']} ${styles.linkedin}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://wa.me/212622283559" className={`${styles['social-btn']} ${styles.whatsapp}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className={styles['map-container']}>
                <div className={styles['map-placeholder']}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className={styles['contact-form-side']}>
              <div className={styles['form-container']}>
                <div className={styles['form-header']}>
                  <h2>Envoyez-nous un Message</h2>
                  <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
                </div>

                {/* Status messages */}
                {status === 'SUCCESS' && (
                  <div className={`${styles['status-message']} ${styles.success}`}>
                    Merci ! Votre message a été envoyé. Nous vous répondrons sous 24h.
                  </div>
                )}
                {status === 'ERROR' && (
                  <div className={`${styles['status-message']} ${styles.error}`}>
                    Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles['contact-form']}>
                  <div className={styles['form-row']}>
                    <div className={`${styles['form-group']} ${focusedField === 'name' ? styles.focused : ''}`}>
                      <label htmlFor="name">Nom complet *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Jean Dupont"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className={`${styles['form-group']} ${focusedField === 'email' ? styles.focused : ''}`}>
                      <label htmlFor="email">Email professionnel *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="jean@entreprise.ma"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className={styles['form-row']}>
                    <div className={`${styles['form-group']} ${focusedField === 'phone' ? styles.focused : ''}`}>
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+212 6XX XX XX XX"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className={`${styles['form-group']} ${focusedField === 'company' ? styles.focused : ''}`}>
                      <label htmlFor="company">Entreprise</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Nom de votre société"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className={`${styles['form-group']} ${focusedField === 'subject' ? styles.focused : ''}`}>
                    <label htmlFor="subject">Sujet *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Sélectionnez un sujet...</option>
                      <option value="demo">Demande de démonstration</option>
                      <option value="devis">Demande de devis</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className={`${styles['form-group']} ${focusedField === 'message' ? styles.focused : ''}`}>
                    <label htmlFor="message">Votre message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Décrivez votre projet ou votre question..."
                      rows="5"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <div className={styles['form-footer']}>
                    <label className={styles['checkbox-container']}>
                      <input type="checkbox" required disabled={isSubmitting} />
                      <span className={styles.checkmark}></span>
                      <span className={styles['checkbox-label']}>
                        J'accepte que mes données soient traitées conformément à la politique de confidentialité *
                      </span>
                    </label>

                    <button 
                      type="submit" 
                      className={styles['submit-btn']} 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                      {!isSubmitting && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className={styles['faq-section']}>
        <div className={styles.container}>
          <div className={styles['faq-box']}>
            <h3>Besoin d'une réponse rapide ?</h3>
            <p>Consultez notre centre d'aide pour trouver des réponses aux questions fréquentes sur l'installation, la tarification et l'utilisation de MoroccoVehicles.</p>
            <a href="https://wa.me/212622283559" className={styles['btn-outline']}>Voir la FAQ</a>
          </div>
        </div>
      </section>
    </div>
  );
}