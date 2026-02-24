// src/app/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Logiciel Gestion Parc Automobile</p>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} MoroccoVehicles. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}