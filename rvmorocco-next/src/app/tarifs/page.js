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
      '✅ Gestion de flotte (10 véhicules)',
      '✅ Contrats de location PDF',
      '✅ Gestion des clients',
      '✅ Calendrier de réservations',
      '✅ Tableau de bord basique',
      '✅ Support WhatsApp',
      '❌ Smart Contracts',
      '❌ Gestion assurance',
      '❌ Analytics avancés',
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
      '✅ Gestion de flotte (50 véhicules)',
      '✅ Contrats + Smart Contracts',
      '✅ Gestion des clients avancée',
      '✅ Calendrier multi-agences',
      '✅ Analytics & statistiques',
      '✅ Gestion assurance',
      '✅ Maintenance préventive',
      '✅ Liste noire partagée',
      '✅ Support prioritaire 24h',
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
      '✅ Flotte illimitée',
      '✅ Toutes les fonctionnalités Pro',
      '✅ Véhicules de luxe dédiés',
      '✅ API RESTful & intégrations',
      '✅ Multi-agences & multi-villes',
      '✅ Rapports financiers avancés',
      '✅ Formation & onboarding dédié',
      '✅ Manager de compte attitré',
      '✅ SLA 99.9% garanti',
    ]
  }
];

const comparaison = [
  { feature: 'Véhicules gérés', starter: '10', pro: '50', business: 'Illimité' },
  { feature: 'Contrats PDF', starter: '✅', pro: '✅', business: '✅' },
  { feature: 'Smart Contracts', starter: '❌', pro: '✅', business: '✅' },
  { feature: 'Gestion clients', starter: 'Basique', pro: 'Avancée', business: 'Avancée' },
  { feature: 'Calendrier', starter: '✅', pro: 'Multi-agences', business: 'Multi-villes' },
  { feature: 'Analytics', starter: 'Basique', pro: '✅', business: 'Avancé' },
  { feature: 'Assurance', starter: '❌', pro: '✅', business: '✅' },
  { feature: 'Maintenance', starter: '❌', pro: '✅', business: '✅' },
  { feature: 'Liste noire', starter: '✅', pro: 'Partagée', business: 'Partagée' },
  { feature: 'API accès', starter: '❌', pro: '❌', business: '✅' },
  { feature: 'Support', starter: 'WhatsApp', pro: 'Prioritaire 24h', business: 'Manager dédié' },
];

const faqs = [
  { q: "Y a-t-il un engagement minimum ?", a: "Non ! Vous pouvez vous abonner mois par mois, sans engagement. L'abonnement annuel vous permet d'économiser 2 mois gratuits." },
  { q: "Puis-je changer de plan en cours d'abonnement ?", a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement au prochain cycle de facturation." },
  { q: "Comment se passe le paiement ?", a: "Paiement par virement bancaire, CIH, Attijariwafa, ou paiement en ligne sécurisé. Facturation mensuelle ou annuelle selon votre choix." },
  { q: "La démonstration est-elle gratuite ?", a: "Absolument ! Nous offrons une démo gratuite de 30 minutes avec un expert. Contactez-nous sur WhatsApp ou par email pour planifier votre démo." },
  { q: "Mes données sont-elles sécurisées ?", a: "Vos données sont hébergées sur des serveurs sécurisés avec chiffrement SSL. Nous respectons les normes RGPD et les données ne sont jamais partagées avec des tiers." },
];

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
        .plan-card { background: #fff; border-radius: 24px; padding: 36px; border: 2px solid #e2e8f0; transition: all 0.3s; position: relative; }
        .plan-card.popular { border-color: #3b82f6; box-shadow: 0 20px 60px rgba(59,130,246,0.2); transform: scale(1.03); }
        .popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: #fff; padding: 5px 20px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; }
        .plan-name { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .plan-tagline { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        .plan-price-row { margin-bottom: 8px; }
        .plan-price { font-size: 48px; font-weight: 900; color: #0f172a; line-height: 1; }
        .plan-currency { font-size: 20px; font-weight: 700; color: #64748b; vertical-align: top; margin-top: 10px; display: inline-block; }
        .plan-period { color: #64748b; font-size: 14px; margin-bottom: 4px; }
        .plan-vehicles { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 24px; }
        .plan-features { list-style: none; padding: 0; margin-bottom: 32px; }
        .plan-features li { padding: 8px 0; font-size: 14px; color: #475569; border-bottom: 1px solid #f8fafc; }
        .plan-features li:last-child { border-bottom: none; }
        .plan-cta { width: 100%; padding: 14px; border-radius: 12px; border: none; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: block; text-align: center; }
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
        @media (max-width: 768px) { .plans-grid { grid-template-columns: 1fr; } .plan-card.popular { transform: none; } .compare-table { font-size: 12px; } .compare-table th, .compare-table td { padding: 10px 12px; } }
      `}</style>

      {/* Hero */}
      <div className="tarifs-hero">
        <div className="tarifs-hero-content">
          <div className="tarifs-badge">💰 Tarifs transparents, sans surprise</div>
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
          {annual && <span className="annual-badge">🎁 2 mois offerts avec l'abonnement annuel</span>}
        </div>
      </div>

      {/* Plans */}
      <div className="plans-section">
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">⭐ Le plus populaire</div>}
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
              <div className="plan-vehicles">🚗 {plan.vehicles}</div>
              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Link
                href="/partner"
                className="plan-cta"
                style={{ background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : plan.color, border: `2px solid ${plan.color}` }}
              >
                {plan.name === 'Business' ? '📞 Nous contacter' : `Commencer ${plan.name} →`}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 48, padding: '24px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          {['🔒 Paiement sécurisé', '📅 Sans engagement', '🎁 Démo gratuite', '⚡ Activation immédiate', '🇲🇦 Support en Darija & Français'].map(t => (
            <span key={t} style={{ color: '#475569', fontSize: 14, fontWeight: 600 }}>{t}</span>
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
                <th style={{ color: '#60a5fa' }}>Pro ⭐<br /><span style={{ fontWeight: 400, fontSize: 12 }}>{annual ? '415' : '499'} MAD/mois</span></th>
                <th style={{ color: '#fbbf24' }}>Business<br /><span style={{ fontWeight: 400, fontSize: 12 }}>{annual ? '832' : '999'} MAD/mois</span></th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.starter}</td>
                  <td>{row.pro}</td>
                  <td>{row.business}</td>
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
                <span style={{ color: '#36c275', fontSize: 18, transition: 'transform 0.2s', display: 'inline-block', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▼</span>
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
          Location de voitures à partir de 7€/jour — Gérez tout depuis une seule plateforme
        </p>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
          Gestion de parc automobile, contrats, clients, assurance, maintenance — tout en un.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/partner" style={{ background: '#36c275', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Commencer gratuitement →
          </Link>
          <Link href="/assistance" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.2)' }}>
            Parler à un expert
          </Link>
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
