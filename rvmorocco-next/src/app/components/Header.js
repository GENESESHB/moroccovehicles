// src/app/components/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../styles/Header.css'; // if using global CSS (see instructions below)

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollHeader, setScrollHeader] = useState(false);
  const closeBtnRef = useRef(null);
  const openerBtnRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollHeader(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Esc key
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    const body = document.body;
    if (mobileOpen) {
      body.classList.add('no-scroll');
      closeBtnRef.current?.focus();
    } else {
      body.classList.remove('no-scroll');
      openerBtnRef.current?.focus();
    }
    return () => body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="wego-header">
        <nav className="wego-nav" aria-label="Navigation principale">
          <div className="wego-brand">
            <div className="wego-logo">M.</div>
            <Link href="/" onClick={closeMenu} className="wego-title">
              MoroccoVehicles
            </Link>
          </div>

          <div className="wego-menu">
            <Link href="/about" className="wego-link">À propos</Link>
            <Link href="/contact" className="wego-link">Contact</Link>
            <Link href="/support" className="wego-link">Support</Link>
            <Link href="/experience" className="wego-link">Expérience</Link>
            <Link href="/partner" className="wego-btn" onClick={closeMenu}>Devenir partenaire</Link>
          </div>

          <button
            ref={openerBtnRef}
            className="wego-hamburger"
            aria-expanded={mobileOpen ? 'true' : 'false'}
            onClick={() => setMobileOpen(v => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div className="wego-mobile" onClick={(e) => e.target === e.currentTarget && closeMenu()}>
            <div className="wego-mobile-sheet">
              <div className="wego-mobile-header">
                <h2>Menu</h2>
                <button ref={closeBtnRef} className="wego-close" onClick={closeMenu}>✕</button>
              </div>
              <nav className="wego-mobile-nav">
                <Link href="/about" onClick={closeMenu}>À propos</Link>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
                <Link href="/support" onClick={closeMenu}>Support</Link>
                <Link href="/experience" onClick={closeMenu}>Expérience</Link>
                <Link href="/partner" className="wego-btn" onClick={closeMenu}>Devenir partenaire</Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mini header sur défilement */}
      {scrollHeader && (
        <div className="wego-mini-header">
          <div className="wego-mini-logo">M.</div>
          <Link href="/partner" className="wego-mini-btn">Devenir partenaire</Link>
        </div>
      )}
    </>
  );
}