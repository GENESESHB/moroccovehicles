// src/app/tarifs/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: 199,
    priceAnnual: 165,
    tagline: 'Parfait pour démarrer',
    vehicles: '10 véhicules',
    color: '#36c275',
    popular: false,
    features: [
      { ok: true, text: 'Gestion de flotte (10 véhicules)' },
      { ok: true, text: 'Contrats de location PDF' },
      { ok: true, text: 'Gestion des clients' },
      { ok: true, text: 'Calendrier de réservations' },
      { ok: true, text: 'Tableau de bord basique' },
      { ok: true, text: 'Support WhatsApp' },
      { ok: false, text: 'Smart Contracts' },
      { ok: false, text: 'Gestion assurance' },
      { ok: false, text: 'Analytics avancés' },
    ]
  },
  {
    name: 'Pro',
    price: 499,
    priceAnnual: 415,
    tagline: 'Le plus populaire',
    vehicles: '50 véhicules',
    color: '#3b82f6',
    popular: true,
    features: [
      { ok: true, text: 'Gestion de flotte (50 véhicules)' },
      { ok: true, text: 'Contrats + Smart Contracts' },
      { ok: true, text: 'Gestion des clients avancée' },
      { ok: true, text: 'Calendrier multi-agences' },
      { ok: true, text: 'Analytics & statistiques' },
      { ok: true, text: 'Gestion assurance' },
      { ok: true, text: 'Maintenance préventive' },
      { ok: true, text: 'Liste noire partagée' },
      { ok: true, text: 'Support prioritaire 24h' },
    ]
  },
  {
    name: 'Business',
    price: 999,
    priceAnnual: 832,
    tagline: 'Pour les grandes flottes',
    vehicles: 'Véhicules illimités',
    color: '#f59e0b',
    popular: false,
    features: [
      { ok: true, text: 'Flotte illimitée' },
      { ok: true, text: 'Toutes les fonctionnalités Pro' },
      { ok: true, text: 'Véhicules de luxe dédiés' },
      { ok: true, text: 'API RESTful & intégrations' },
      { ok: true, text: 'Multi-agences & multi-villes' },
      { ok: true, text: 'Rapports financiers avancés' },
      { ok: true, text: 'Formation & onboarding dédié' },
      { ok: true, text: 'Manager de compte attitré' },
      { ok: true, text: 'SLA 99.9% garanti' },
    ]
  }
];

const comparaison = [
  { feature: 'Véhicules gérés', starter: '10', pro: '50', business: 'Illimité' },
  { feature: 'Contrats PDF', starter: 'yes', pro: 'yes', business: 'yes' },
  { feature: 'Smart Contracts', starter: 'no', pro: 'yes', business: 'yes' },
  { feature: 'Gestion clients', starter: 'Basique', pro: 'Avancée', business: 'Avancée' },
  { feature: 'Calendrier', starter: 'yes', pro: 'Multi-agences', business: 'Multi-villes' },
  { feature: 'Analytics', starter: 'Basique', pro: 'yes', business: 'Avancé' },
  { feature: 'Assurance', starter: 'no', pro: 'yes', business: 'yes' },
  { feature: 'Maintenance', starter: 'no', pro: 'yes', business: 'yes' },
  { feature: 'Liste noire', starter: 'yes', pro: 'Partagée', business: 'Partagée' },
  { feature: 'API accès', starter: 'no', pro: 'no', business: 'yes' },
  { feature: 'Support', starter: 'WhatsApp', pro: 'Prioritaire 24h', business: 'Manager dédié' },
];

const faqs = [
  { q: "Y a-t-il un engagement minimum ?", a: "Non ! Vous pouvez vous abonner mois par mois, sans engagement. L'abonnement annuel vous permet d'économiser 2 mois gratuits." },
  { q: "Puis-je changer de plan en cours d'abonnement ?", a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement au prochain cycle de facturation." },
  { q: "Comment se passe le paiement ?", a: "Paiement par virement bancaire, CIH, Attijariwafa, ou paiement en ligne sécurisé. Facturation mensuelle ou annuelle selon votre choix." },
  { q: "La démonstration est-elle gratuite ?", a: "Absolument ! Nous offrons une démo gratuite de 30 minutes avec un expert. Contactez-nous sur WhatsApp ou par email pour planifier votre démo." },
  { q: "Mes données sont-elles sécurisées ?", a: "Vos données sont hébergées sur des serveurs sécurisés avec chiffrement SSL. Nous respectons les normes RGPD et les données ne sont jamais partagées avec des tiers." },
];

const trustItems = [
  { text: 'Paiement sécurisé', iconType: 'lock' },
  { text: 'Sans engagement', iconType: 'calendar' },
  { text: 'Démo gratuite', iconType: 'gift' },
  { text: 'Activation immédiate', iconType: 'bolt' },
  { text: 'Support Darija & Français', iconType: 'globe' },
];

function SVGIcon({ type, className, color, style }) {
  if (type === 'check') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (type === 'cross') {
    return (
      <svg className={className} style={{ color: color || '#94a3b8', ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (type === 'lock') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (type === 'calendar') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  if (type === 'gift') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    );
  }
  if (type === 'bolt') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  if (type === 'car') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M9 17h6" />
      </svg>
    );
  }
  if (type === 'whatsapp') {
    return (
      <svg className={className} style={{ color, ...style }} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.203c.31.785.734 1.453 1.272 2.004.538.55 1.157.962 1.857 1.237l.79-.792c.162-.162.383-.228.607-.179.77.168 1.56.252 2.355.252 2.652 0 4.809-2.157 4.809-4.809s-2.157-4.809-4.809-4.809-4.809 2.157-4.809 4.809c0 .795.084 1.585.252 2.355.049.224-.017.445-.179.607l-.79.792z" />
      </svg>
    );
  }
  return null;
}

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const renderCell = (val) => {
    if (val === 'yes') {
      return <SVGIcon type="check" color="#36c275" style={{ margin: '0 auto' }} />;
    }
    if (val === 'no') {
      return <SVGIcon type="cross" color="#cbd5e1" style={{ margin: '0 auto' }} />;
    }
    return val;
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .tarifs-hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #142534 100%); padding: 80px 20px 100px; text-align: center; position: relative; overflow: hidden; }
        .tarifs-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(54,194,117,0.2) 0%, transparent 60%); }
        .tarifs-hero-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .tarifs-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(54,194,117,0.15); border: 1px solid rgba(54,194,117,0.3); color: #36c275; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
        .tarifs-title { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 16px; }
        .tarifs-title span { color: #36c275; }
        .tarifs-sub { font-size: 18px; color: #94a3b8; margin-bottom: 36px; line-height: 1.6; }
        .toggle-row { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; }
        .toggle-label { color: #94a3b8; font-size: 14px; font-weight: 600; }
        .toggle-label.active { color: #fff; }
        .toggle-btn { width: 52px; height: 28px; background: #36c275; border-radius: 999px; border: none; cursor: pointer; position: relative; transition: background 0.2s; }
        .toggle-btn::after { content: ''; position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; background: #fff; border-radius: 50%; transition: left 0.2s; }
        .toggle-btn.on::after { left: 27px; }
        .annual-badge { display: inline-block; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); color: #f59e0b; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .plans-section { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: start; }
        .plan-card { background: #fff; border-radius: 24px; padding: 36px; border: 2px solid #e2e8f0; transition: all 0.3s; position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 580px; }
        .plan-card.popular { border-color: #3b82f6; box-shadow: 0 20px 60px rgba(59,130,246,0.15); transform: scale(1.03); }
        .popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: #fff; padding: 5px 20px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
        .plan-name { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .plan-tagline { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        .plan-price-row { margin-bottom: 8px; }
        .plan-price { font-size: 48px; font-weight: 900; color: #0f172a; line-height: 1; }
        .plan-currency { font-size: 20px; font-weight: 700; color: #64748b; vertical-align: top; margin-top: 10px; display: inline-block; }
        .plan-period { color: #64748b; font-size: 14px; margin-bottom: 4px; }
        .plan-vehicles { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 24px; width: fit-content; }
        .plan-features { list-style: none; padding: 0; margin-bottom: 32px; }
        .plan-features li { padding: 8px 0; font-size: 14px; color: #475569; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; gap: 8px; }
        .plan-features li:last-child { border-bottom: none; }
        .plan-cta { width: 100%; padding: 14px; border-radius: 12px; border: none; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: flex; align-items: center; justify-content: center; text-align: center; gap: 8px; }
        .plan-cta:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .compare-section { max-width: 1100px; margin: 0 auto; padding: 0 20px 80px; }
        .compare-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .compare-table th { background: #0f172a; color: #fff; padding: 16px 20px; font-size: 14px; font-weight: 700; text-align: center; }
        .compare-table th:first-child { text-align: left; }
        .compare-table td { padding: 14px 20px; font-size: 14px; color: #475569; border-bottom: 1px solid #f1f5f9; text-align: center; }
        .compare-table td:first-child { text-align: left; font-weight: 600; color: #0f172a; }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table tr:hover td { background: #f8fafc; }
        .faq-section { max-width: 800px; margin: 0 auto; padding: 0 20px 80px; }
        .faq-card { background: #fff; border-radius: 20px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .faq-item { border-bottom: 1px solid #f1f5f9; }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { width: 100%; background: none; border: none; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left; font-size: 15px; font-weight: 700; color: #0f172a; gap: 12px; }
        .faq-q:hover { color: #36c275; }
        .faq-a { padding: 0 0 18px; color: #475569; font-size: 14px; line-height: 1.7; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-title { font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        .section-sub { color: #64748b; font-size: 16px; }
        .trust-badge-container { display: flex; align-items: center; gap: 6px; color: #475569; font-size: 14px; font-weight: 600; }
        .tarifs-whatsapp-btn { background: #25D366; color: #fff; border: 2px solid #25D366; width: 100%; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: flex; align-items: center; justify-content: center; text-align: center; gap: 8px; }
        .tarifs-whatsapp-btn:hover { background: #20ba59; border-color: #20ba59; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.3); }
        @media (max-width: 768px) { .plans-grid { grid-template-columns: 1fr; } .plan-card.popular { transform: none; } .compare-table { font-size: 12px; } .compare-table th, .compare-table td { padding: 10px 12px; } }
      `}</style>

      {/* Hero */}
      <div className="tarifs-hero">
        <div className="tarifs-hero-content">
          <div className="tarifs-badge">Tarifs transparents, sans surprise</div>
          <h1 className="tarifs-title">
            Gérez votre flotte à partir de<br /><span>199 MAD / mois</span>
          </h1>
          <p className="tarifs-sub">
            Logiciel de gestion de parc automobile professionnel. Location de voitures, contrats, clients, maintenance — tout inclus.
          </p>
          <div className="toggle-row">
            <span className={`toggle-label ${!annual ? 'active' : ''}`}>Mensuel</span>
            <button className={`toggle-btn ${annual ? 'on' : ''}`} onClick={() => setAnnual(a => !a)} />
            <span className={`toggle-label ${annual ? 'active' : ''}`}>Annuel</span>
          </div>
          {annual && <span className="annual-badge">2 mois offerts avec l'abonnement annuel</span>}
        </div>
      </div>

      {/* Plans */}
      <div className="plans-section">
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              <div>
                {plan.popular && (
                  <div className="popular-badge">
                    <SVGIcon type="star" color="#fff" />
                    <span>Le plus populaire</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 10, background: plan.color, borderRadius: '50%' }} />
                  <div className="plan-name">{plan.name}</div>
                </div>
                <div className="plan-tagline">{plan.tagline}</div>
                <div className="plan-price-row">
                  <span className="plan-currency">MAD </span>
                  <span className="plan-price" style={{ color: plan.color }}>{annual ? plan.priceAnnual : plan.price}</span>
                </div>
                <div className="plan-period">{annual ? '/mois (facturé annuellement)' : '/mois'}</div>
                <div className="plan-vehicles">
                  <SVGIcon type="car" color="#64748b" />
                  <span>{plan.vehicles}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <SVGIcon type={f.ok ? 'check' : 'cross'} color={f.ok ? '#36c275' : '#94a3b8'} />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {plan.name === 'Business' ? (
                  <a
                    href="https://wa.me/212622283559?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20l%27offre%20Business%20MoroccoVehicles"
                    className="tarifs-whatsapp-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SVGIcon type="whatsapp" color="#fff" />
                    <span>WhatsApp : +212 622 283 559</span>
                  </a>
                ) : (
                  <Link
                    href="/partner"
                    className="plan-cta"
                    style={{ background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : plan.color, border: `2px solid ${plan.color}` }}
                  >
                    <span>Commencer {plan.name}</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 48, padding: '24px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          {trustItems.map(item => (
            <div key={item.text} className="trust-badge-container">
              <SVGIcon type={item.iconType} color="#36c275" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="compare-section">
        <div className="section-header">
          <h2 className="section-title">Comparaison des formules</h2>
          <p className="section-sub">Toutes les fonctionnalités en détail</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th style={{ color: '#36c275' }}>Starter<br /><span style={{ fontWeight: 400, fontSize: 12 }}>{annual ? '165' : '199'} MAD/mois</span></th>
                <th style={{ color: '#60a5fa' }}>Pro<br /><span style={{ fontWeight: 400, fontSize: 12 }}>{annual ? '415' : '499'} MAD/mois</span></th>
                <th style={{ color: '#fbbf24' }}>Business<br /><span style={{ fontWeight: 400, fontSize: 12 }}>{annual ? '832' : '999'} MAD/mois</span></th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{renderCell(row.starter)}</td>
                  <td>{renderCell(row.pro)}</td>
                  <td>{renderCell(row.business)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="section-header">
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="section-sub">Tout ce que vous devez savoir avant de vous abonner</p>
        </div>
        <div className="faq-card">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span style={{ color: '#36c275', transition: 'transform 0.2s', display: 'inline-flex', alignItems: 'center', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
          Prêt à digitaliser votre agence ?
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: 12, fontSize: 16 }}>
          Location de voitures à partir de 7€/jour - Gérez tout depuis une seule plateforme
        </p>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
          Gestion de parc automobile, contrats, clients, assurance, maintenance - tout en un.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/partner" style={{ background: '#36c275', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Commencer gratuitement
          </Link>
          <a
            href="https://wa.me/212622283559?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20les%20tarifs%20MoroccoVehicles"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVGIcon type="whatsapp" color="#fff" />
            <span>WhatsApp : +212 622 283 559</span>
          </a>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "MoroccoVehicles",
        "applicationCategory": "BusinessApplication",
        "description": "Logiciel de gestion de flotte automobile au Maroc. Location de voitures à partir de 7€/jour.",
        "offers": [
          { "@type": "Offer", "name": "Starter", "price": "199", "priceCurrency": "MAD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "199", "priceCurrency": "MAD", "unitText": "mois" } },
          { "@type": "Offer", "name": "Pro", "price": "499", "priceCurrency": "MAD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "499", "priceCurrency": "MAD", "unitText": "mois" } },
          { "@type": "Offer", "name": "Business", "price": "999", "priceCurrency": "MAD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "999", "priceCurrency": "MAD", "unitText": "mois" } },
        ]
      })}} />
    </div>
  );
}
