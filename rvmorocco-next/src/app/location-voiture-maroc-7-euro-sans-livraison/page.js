// src/app/location-voiture-maroc-7-euro-sans-livraison/page.js
'use client';

import React from 'react';
import Link from 'next/link';

export default function SeoLandingPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ── HEADER ── */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid #e2e8f0',
        background: '#fff',
        borderRadius: '12px',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#36c275',
            color: '#fff',
            fontWeight: '800',
            fontSize: '16px',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 6px 18px rgba(54,194,117,.35)'
          }}>M.</span>
          <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Accueil</Link>
          <Link href="/tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Nos Tarifs</Link>
          <Link href="/assistance" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Assistance 24/7</Link>
          <a href="https://wa.me/212622283559" style={{ background: '#36c275', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>WhatsApp</a>
        </nav>
      </header>

      {/* ── HERO / INTRO ── */}
      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{
          background: '#d1fae5',
          color: '#065f46',
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '16px',
          display: 'inline-block'
        }}>Offre Spéciale Exclusivité Web</span>
        
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          lineHeight: '1.2',
          marginBottom: '20px',
          color: '#0f172a'
        }}>
          Location Voiture Maroc à partir de <span style={{ color: '#36c275' }}>7 Euro</span> par jour et <span style={{ color: '#36c275' }}>sans Livraison payante</span>
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Profitez du meilleur tarif garanti pour votre location de voiture au Maroc. Réservez une citadine économique, une berline premium ou un véhicule électrique dès 7 € / jour sans frais de livraison supplémentaires et sans mauvaise surprise à l'arrivée.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            background: '#36c275',
            color: '#fff',
            textDecoration: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '700',
            boxShadow: '0 8px 20px rgba(54,194,117,0.3)'
          }}>
            Lancer une Réservation
          </Link>
          <a href="https://wa.me/212622283559" style={{
            background: '#fff',
            color: '#0f172a',
            textDecoration: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '700',
            border: '1px solid #cbd5e1'
          }}>
            Conseiller WhatsApp
          </a>
        </div>
      </section>

      {/* ── OFFERS GRID ── */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '24px', textAlign: 'center' }}>
          Nos Tarifs Promotionnels Exclusifs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* Card 1 */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Dacia Spring 100% Électrique</h3>
            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>Écologique</span>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '12px 0 20px' }}>Parfaite pour la ville. Aucun frais de carburant supplémentaire et autonomie idéale.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#36c275' }}>7 €</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}> / jour</span>
              </div>
              <Link href="/" style={{ background: '#0f172a', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>Réserver</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Dacia Logan Nouvelle Génération</h3>
            <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>Économique</span>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '12px 0 20px' }}>Fiable, spacieuse et parfaite pour la conduite sur toutes les routes marocaines.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#36c275' }}>10 €</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}> / jour</span>
              </div>
              <Link href="/" style={{ background: '#0f172a', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>Réserver</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Renault Clio 5 Diesel</h3>
            <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>Populaire</span>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '12px 0 20px' }}>Design moderne, consommation minimale et confort optimal de conduite.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#36c275' }}>12 €</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}> / jour</span>
              </div>
              <Link href="/" style={{ background: '#0f172a', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>Réserver</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── SEO SECTION ── */}
      <section style={{ padding: '60px 20px', background: '#fff', marginTop: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.7', color: '#334155' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
            Louer une voiture au Maroc sans frais de livraison et sans mauvaise surprise
          </h2>
          <p>
            Chez <strong>MoroccoVehicles</strong>, nous croyons en une transparence totale des tarifs. Contrairement à de nombreuses agences de location de voitures au Maroc qui rajoutent des frais cachés ou des suppléments de livraison à l'aéroport ou à votre hôtel, notre service garantit une livraison incluse et sans frais de dossier.
          </p>
          <p style={{ marginTop: '16px' }}>
            Que vous arriviez à l'aéroport de Casablanca Mohammed V (CMN), de Marrakech-Ménara, de Tanger Ibn Battouta ou à Fès-Saïss, votre voiture de location vous attend sans aucun frais de livraison supplémentaire.
          </p>
          
          <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '30px', marginBottom: '12px' }}>
            Pourquoi louer un véhicule à partir de 7€ par jour ?
          </h3>
          <p>
            Nos offres promotionnelles débutent à partir de seulement 7 euros par jour pour les réservations anticipées et à long terme. C'est l'opportunité idéale pour découvrir le Maroc (villes impériales, plages d'Agadir, ruelles bleues de Chefchaouen) au meilleur prix du marché avec un véhicule propre, désinfecté et révisé.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 20px', textAlign: 'center', fontSize: '14px' }}>
        <p>© {new Date().getFullYear()} MoroccoVehicles. Offre location voiture Maroc sans livraison.</p>
      </footer>

    </div>
  );
}
