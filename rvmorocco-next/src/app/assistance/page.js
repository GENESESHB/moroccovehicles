// src/app/assistance/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: "Comment démarrer avec MoroccoVehicles ?",
    a: "Inscrivez-vous en tant que partenaire via la page 'Devenir Partenaire'. Après validation par notre équipe (sous 24-48h), vous recevez vos accès au tableau de bord pour gérer votre flotte."
  },
  {
    q: "Comment ajouter un véhicule à ma flotte ?",
    a: "Dans votre Dashboard -> Véhicules -> Ajouter un véhicule. Renseignez la marque, le modèle, la plaque, le prix/jour et téléchargez une photo. Le véhicule apparaît immédiatement sur la plateforme de réservation."
  },
  {
    q: "Comment créer un contrat de location ?",
    a: "Dashboard -> Contrats -> Nouveau contrat. Sélectionnez le client (ou créez-le à la volée), choisissez le véhicule et les dates. Le contrat PDF est généré automatiquement et peut être imprimé ou envoyé par email."
  },
  {
    q: "La plateforme fonctionne-t-elle sur mobile ?",
    a: "Oui ! MoroccoVehicles est 100% responsive. Le Dashboard et la plateforme de réservation s'adaptent à tous les écrans : smartphone, tablette et ordinateur."
  },
  {
    q: "Comment fonctionne la liste noire ?",
    a: "Vous pouvez ajouter des clients problématiques à votre liste noire (par CIN ou passeport). Le système vous alerte automatiquement si un client blacklisté tente de faire une réservation."
  },
  {
    q: "Quel est le coût de l'abonnement ?",
    a: "Notre offre Starter commence à 199 MAD/mois pour jusqu'à 10 véhicules. Consultez notre page Tarifs pour tous les détails et comparer les formules."
  },
  {
    q: "Puis-je essayer gratuitement ?",
    a: "Oui, nous offrons une démonstration gratuite et personnalisée. Contactez-nous via WhatsApp ou email pour planifier votre démo avec un expert MoroccoVehicles."
  },
  {
    q: "Comment exporter mes données ou contrats ?",
    a: "Tous vos contrats sont exportables en PDF directement depuis le Dashboard. Les données clients et véhicules peuvent être consultées et gérées à tout moment."
  },
  {
    q: "Que se passe-t-il si j'oublie mon mot de passe ?",
    a: "Sur la page de connexion, cliquez sur 'Mot de passe oublié'. Un email de réinitialisation vous sera envoyé. Si vous ne recevez pas l'email, contactez notre support."
  },
  {
    q: "Proposez-vous une API pour intégration ?",
    a: "Oui ! MoroccoVehicles dispose d'une API RESTful pour les partenaires avancés souhaitant intégrer la gestion de flotte à leur propre système. Contactez notre équipe technique pour en savoir plus."
  }
];

const channels = [
  {
    iconType: "whatsapp",
    title: "WhatsApp Support",
    subtitle: "Réponse en moins de 15 min",
    desc: "Discutez directement avec notre équipe support. Disponible 7j/7 de 8h à 22h.",
    action: "WhatsApp : +212 622 283 559",
    href: "https://wa.me/212622283559?text=Bonjour%2C%20j%27ai%20besoin%20d%27aide%20avec%20MoroccoVehicles",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)"
  },
  {
    iconType: "email",
    title: "Email Support",
    subtitle: "Réponse sous 2h",
    desc: "Envoyez-nous votre question détaillée. Idéal pour les problèmes techniques complexes.",
    action: "Envoyer un email",
    href: "mailto:contact@moroccovehicles.com?subject=Demande%20d'assistance%20MoroccoVehicles",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)"
  },
  {
    iconType: "phone",
    title: "Téléphone",
    subtitle: "Lun-Ven : 9h-18h",
    desc: "Appelez directement notre ligne support pour une assistance immédiate et personnalisée.",
    action: "+212 622 283 559",
    href: "tel:+212622283559",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)"
  }
];

function SVGIcon({ type, className, color, style }) {
  if (type === 'whatsapp') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.203c.31.785.734 1.453 1.272 2.004.538.55 1.157.962 1.857 1.237l.79-.792c.162-.162.383-.228.607-.179.77.168 1.56.252 2.355.252 2.652 0 4.809-2.157 4.809-4.809s-2.157-4.809-4.809-4.809-4.809 2.157-4.809 4.809c0 .795.084 1.585.252 2.355.049.224-.017.445-.179.607l-.79.792z" />
      </svg>
    );
  }
  if (type === 'email') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    );
  }
  if (type === 'phone') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  }
  if (type === 'check') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    );
  }
  if (type === 'chevron-down') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    );
  }
  if (type === 'send') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    );
  }
  return null;
}

export default function AssistancePage() {
  const [openIdx, setOpenIdx] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleFaq = (i) => setOpenIdx(openIdx === i ? null : i);

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('https://formspree.io/f/xqaagbjk', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .assist-hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #142534 100%); padding: 80px 20px 100px; text-align: center; position: relative; overflow: hidden; }
        .assist-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(54,194,117,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(59,130,246,0.1) 0%, transparent 50%); }
        .assist-hero-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .assist-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(54,194,117,0.15); border: 1px solid rgba(54,194,117,0.3); color: #36c275; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
        .assist-title { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 20px; }
        .assist-title span { color: #36c275; }
        .assist-sub { font-size: 18px; color: #94a3b8; font-weight: 500; line-height: 1.6; margin-bottom: 36px; }
        .assist-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
        .stat-item { text-align: center; }
        .stat-num { font-size: 28px; font-weight: 900; color: #36c275; }
        .stat-label { font-size: 13px; color: #64748b; font-weight: 500; margin-top: 4px; }
        .section { max-width: 1100px; margin: 0 auto; padding: 80px 20px; }
        .section-title { font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        .section-sub { color: #64748b; font-size: 16px; margin-bottom: 48px; }
        .channels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .channel-card { background: #fff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0; transition: all 0.25s; cursor: pointer; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; }
        .channel-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .ch-icon-wrapper { margin-bottom: 16px; display: inline-flex; }
        .ch-title { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .ch-badge { font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; display: inline-block; width: fit-content; }
        .ch-desc { color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
        .ch-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 700; padding: 12px 20px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; transition: opacity 0.2s; text-align: center; }
        .ch-btn:hover { opacity: 0.85; }
        .faq-section { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .faq-item { border-bottom: 1px solid #f1f5f9; }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { width: 100%; background: none; border: none; padding: 20px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left; font-size: 16px; font-weight: 700; color: #0f172a; gap: 16px; }
        .faq-q:hover { color: #36c275; }
        .faq-chevron { transition: transform 0.25s; flex-shrink: 0; color: #36c275; display: inline-flex; align-items: center; }
        .faq-a { padding: 0 0 20px; color: #475569; font-size: 15px; line-height: 1.7; }
        .contact-form { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-field { display: flex; flex-direction: column; gap: 8px; }
        .form-field.full { grid-column: 1 / -1; }
        .form-field label { font-size: 14px; font-weight: 600; color: #374151; }
        .form-field input, .form-field textarea { border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.2s; resize: vertical; }
        .form-field input:focus, .form-field textarea:focus { border-color: #36c275; box-shadow: 0 0 0 3px rgba(54,194,117,0.15); }
        .form-submit { margin-top: 24px; width: 100%; padding: 16px; background: linear-gradient(135deg, #36c275, #2da862); color: #fff; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit; transition: transform 0.2s, box-shadow 0.2s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(54,194,117,0.4); }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .success-msg { text-align: center; padding: 40px; color: #059669; display: flex; flex-direction: column; align-items: center; }
        .success-msg h3 { font-size: 24px; font-weight: 800; margin-top: 16px; margin-bottom: 12px; }
        .hero-whatsapp-cta { display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; margin-top: 24px; box-shadow: 0 8px 20px rgba(37,211,102,0.3); transition: transform 0.2s, box-shadow 0.2s; }
        .hero-whatsapp-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(37,211,102,0.4); }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .assist-stats { gap: 24px; } .faq-section, .contact-form { padding: 28px 20px; } }
      `}</style>

      {/* Hero */}
      <div className="assist-hero">
        <div className="assist-hero-content">
          <div className="assist-badge">Centre d'assistance MoroccoVehicles</div>
          <h1 className="assist-title">
            Nous sommes là pour<br /><span>vous aider</span>
          </h1>
          <p className="assist-sub">
            Support 7j/7 par WhatsApp, email et téléphone. Notre équipe répond à toutes vos questions sur la gestion de flotte automobile au Maroc.
          </p>

          <div style={{ marginBottom: 40 }}>
            <a href="https://wa.me/212622283559?text=Bonjour%2C%20j%27ai%20besoin%20d%27aide%20avec%20MoroccoVehicles" className="hero-whatsapp-cta" target="_blank" rel="noopener noreferrer">
              <SVGIcon type="whatsapp" color="#fff" style={{ width: 22, height: 22 }} />
              <span>Contacter sur WhatsApp (+212 622 283 559)</span>
            </a>
          </div>

          <div className="assist-stats">
            <div className="stat-item">
              <div className="stat-num">{"<"}15min</div>
              <div className="stat-label">Temps de réponse WhatsApp</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">7j/7</div>
              <div className="stat-label">Support disponible</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">98%</div>
              <div className="stat-label">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="section">
        <h2 className="section-title">Contactez notre équipe</h2>
        <p className="section-sub">Choisissez le canal qui vous convient le mieux</p>
        <div className="channels-grid">
          {channels.map((ch) => (
            <a key={ch.title} href={ch.href} className="channel-card" target={ch.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ borderTop: `3px solid ${ch.color}` }}>
              <div>
                <div className="ch-icon-wrapper">
                  <SVGIcon type={ch.iconType} color={ch.color} />
                </div>
                <div className="ch-title">{ch.title}</div>
                <span className="ch-badge" style={{ background: ch.bg, color: ch.color }}>{ch.subtitle}</span>
                <p className="ch-desc">{ch.desc}</p>
              </div>
              <span className="ch-btn" style={{ background: ch.color, color: '#fff' }}>
                {ch.action}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#f8fafc', padding: '0 20px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="section-sub">Retrouvez les réponses aux questions les plus posées par nos partenaires</p>
          <div className="faq-section">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => handleFaq(i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron" style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none' }}>
                    <SVGIcon type="chevron-down" />
                  </span>
                </button>
                {openIdx === i && (
                  <div className="faq-a">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ background: '#fff', padding: '0 20px 80px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 className="section-title">Envoyer un message</h2>
          <p className="section-sub">Décrivez votre problème et notre équipe vous répondra rapidement</p>
          <div className="contact-form">
            {sent ? (
              <div className="success-msg">
                <SVGIcon type="check" color="#059669" style={{ width: 56, height: 56 }} />
                <h3>Message envoyé !</h3>
                <p style={{ color: '#64748b' }}>Notre équipe vous répondra dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSend}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Nom complet *</label>
                    <input name="name" required placeholder="Votre nom" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input name="email" type="email" required placeholder="votre@email.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-field full">
                    <label>Sujet *</label>
                    <input name="subject" required placeholder="Décrivez brièvement votre problème" value={formData.subject} onChange={handleChange} />
                  </div>
                  <div className="form-field full">
                    <label>Message *</label>
                    <textarea name="message" required rows={5} placeholder="Expliquez votre question en détail..." value={formData.message} onChange={handleChange} />
                  </div>
                </div>
                <button type="submit" className="form-submit" disabled={sending}>
                  <SVGIcon type="send" color="#fff" />
                  <span>{sending ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Pas encore partenaire ?</h2>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 16 }}>Rejoignez les agences de location qui font confiance à MoroccoVehicles</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/partner" style={{ background: '#36c275', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Devenir Partenaire
          </Link>
          <Link href="/tarifs" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.2)' }}>
            Voir les Tarifs
          </Link>
        </div>
      </div>
    </div>
  );
}
