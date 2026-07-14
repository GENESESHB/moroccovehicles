// src/app/page.js
'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ background: '#0e2336', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* ── HEADER ── */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
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
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>MoroccoVehicles</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/tarifs" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Nos Tarifs</Link>
          <Link href="/assistance" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Assistance 24/7</Link>
          <Link href="/gestion-automobiles" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Gestion de Flotte</Link>
          <Link href="/Dashboard" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>Mon Espace</Link>
        </nav>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{
        position: 'relative',
        padding: '100px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0e2336 0%, #1a3a52 100%)',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', zIndex: 2, position: 'relative' }}>
          <span style={{
            background: 'rgba(54, 194, 117, 0.15)',
            color: '#36c275',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px',
            display: 'inline-block'
          }}>Service Premium au Maroc</span>
          
          <h1 style={{
            fontSize: '52px',
            fontWeight: '900',
            lineHeight: '1.15',
            marginBottom: '24px',
            color: '#fff'
          }}>
            Location de voitures <br/>
            <span style={{ color: '#36c275' }}>Standard, Luxe & Électrique</span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#cbd5e1',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '650px',
            margin: '0 auto 40px'
          }}>
            Réservez votre véhicule idéal en quelques clics. Des voitures connectées de dernière génération et une assistance 24/7 partout au Maroc.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" style={{
              background: '#36c275',
              color: '#fff',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 8px 24px rgba(54, 194, 117, 0.35)',
              transition: 'transform 0.2s'
            }}>
              Réserver Maintenant
            </Link>
            <a href="https://wa.me/212622283559" target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Contact WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── KEY ADVANTAGES ── */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', marginBottom: '48px' }}>
          Pourquoi Choisir MoroccoVehicles ?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(54,194,117,0.1)', color: '#36c275', display: 'grid', placeItems: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Flotte Connectée</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Accédez à des voitures connectées intelligentes de dernière génération pour un maximum de confort.</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(54,194,117,0.1)', color: '#36c275', display: 'grid', placeItems: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9.09 9 1-1a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Zéro Franchise</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Optez pour nos packs de couverture complète et roulez l'esprit tranquille sans caution excessive.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(54,194,117,0.1)', color: '#36c275', display: 'grid', placeItems: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 9.92z"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Assistance Locale 24/7</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Une assistance réactive en français et en arabe disponible à tout moment pour répondre à vos besoins.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#091622',
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <p>© {new Date().getFullYear()} MoroccoVehicles. Tous droits réservés.</p>
      </footer>
    </div>
  );
}