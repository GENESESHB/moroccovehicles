# 🚗 MoroccoVehicles & RV Morocco — Plateforme SaaS Intégrale de Gestion de Flotte & Réservation Automobile

> **Solution All-in-One Cloud & IA** conçue spécifiquement pour les agences de location de voitures, flottes d'entreprises et loueurs indépendants (Maroc & International). Elle combine un **ERP de gestion opérationnelle ultra-performant** et un **moteur de réservation B2C / B2B à fort taux de conversion** propulsé par un SEO programmatique.

---

## 📌 Sommaire Général

1. [Vue d'Ensemble du Projet](#1-vue-densemble-du-projet)
2. [Architecture Technique & Stack](#2-architecture-technique--stack)
3. [Modules & Fonctionnalités Clés (ERP / Back-Office)](#3-modules--fonctionnalités-clés-erp--back-office)
   - 3.1 [Tableau de Bord Exécutif (Overview & Live KPIs)](#31-tableau-de-bord-exécutif-overview--live-kpis)
   - 3.2 [Smart Contracts & Inspection Digitale 2D](#32-smart-contracts--inspection-digitale-2d)
   - 3.3 [Gestion de Flotte Connectée (Smart Cars & Standard)](#33-gestion-de-flotte-connectée-smart-cars--standard)
   - 3.4 [Planning & Calendrier Interactif (FullCalendar)](#34-planning--calendrier-interactif-fullcalendar)
   - 3.5 [CRM Clients & Dossiers Numériques](#35-crm-clients--dossiers-numériques)
   - 3.6 [Réseau Anti-Fraude & Liste Noire (Blacklist Multi-Agences)](#36-réseau-anti-fraude--liste-noire-blacklist-multi-agences)
   - 3.7 [Gestion des Assurances & Alertes d'Échéances](#37-gestion-des-assurances--alertes-déchéances)
   - 3.8 [Maintenance Prédictive, Vidanges & Contrôle Kilométrique](#38-maintenance-prédictive-vidanges--contrôle-kilométrique)
   - 3.9 [Facturation, Dépenses Garages & Business Intelligence](#39-facturation-dépenses-garages--business-intelligence)
4. [Portail Web Client, B2B & SEO Programmatique](#4-portail-web-client-b2b--seo-programmatique)
5. [Modèles de Données & Schémas Base de Données (MongoDB)](#5-modèles-de-données--schémas-base-de-données-mongodb)
6. [Sécurité & Conformité Juridique](#6-sécurité--conformité-juridique)
7. [Installation & Déploiement](#7-installation--déploiement)

---

## 1. Vue d'Ensemble du Projet

Le système **MoroccoVehicles** est constitué de deux briques logicielles synchronisées en temps réel :

1. **`backloca` (Backend API REST & Services)** : Serveur Node.js / Express haute résilience, connecté à MongoDB via Mongoose, intégrant Cloudinary pour l'imagerie certifiée, JWT pour l'authentification sécurisée, et des tâches d'arrière-plan automatisées (`node-cron`).
2. **`rvmorocco-next` (Frontend SaaS Next.js 16 & React 19)** : Application web moderne, ultra-rapide (SSR & CSR), responsive mobile-first, dotée de tableaux de bord interactifs (MUI, Recharts, FullCalendar, Lucide Icons) et d'une suite de landing pages locales pour la conversion client.

---

## 2. Architecture Technique & Stack

```
moroccovehicles/
├── backloca/                      # Backend API (Node.js + Express)
│   ├── config/                    # Configuration Cloudinary, base de données
│   ├── controllers/               # Logique métier (Auth, Contrats, Véhicules, etc.)
│   ├── middleware/                # JWT Auth, validation, upload Multer
│   ├── models/                    # Schémas Mongoose (SmartContract, Vehicle, Client, etc.)
│   ├── routes/                    # Endpoints RESTful
│   └── jobs/                      # Tâches planifiées (cron d'alertes & maintenance)
│
└── rvmorocco-next/                # Frontend Web & SaaS ERP (Next.js 16 App Router)
    ├── src/app/
    │   ├── Dashboard/             # ERP complet agence de location
    │   │   ├── components/        # Modules métier (SmartContra, Analytics, etc.)
    │   │   └── contexts/          # State management (AuthContext, etc.)
    │   ├── booking/ & search/     # Tunnel de réservation B2C dynamique
    │   ├── blogs/                 # 13+ hubs de contenu optimisés SEO
    │   ├── gestion-automobiles/   # Page vitrine SaaS pour recruter des agences
    │   └── location-voiture-*/    # Landing pages SEO programmatiques par ville
```

| Couche | Technologies Utilisées |
| :--- | :--- |
| **Frontend Framework** | Next.js 16.1.6 (App Router), React 19.2.3 |
| **UI & Styling** | Material UI (MUI v7), Emotion, CSS Modules, Lucide React, FontAwesome |
| **Data Viz & Calendrier** | Recharts v3.8, FullCalendar v6.1 (DayGrid, TimeGrid, Interaction) |
| **Animations & Dates** | Framer Motion v12, Date-fns v4.1 |
| **Backend Runtime** | Node.js, Express v4.18 |
| **Base de Données** | MongoDB via Mongoose v7.8 (avec indexations géométriques et multi-critères) |
| **Stockage Fichiers / Médias** | Cloudinary & Multer-Storage-Cloudinary (cartes grises, photos dommages, contrats) |
| **Sécurité & Auth** | JSON Web Tokens (JWT), BCrypt.js pour le hachage des mots de passe |
| **Automatisation** | Node-cron pour le déclenchement des rappels d'entretien et d'assurances |

---

## 3. Modules & Fonctionnalités Clés (ERP / Back-Office)

### 3.1 Tableau de Bord Exécutif (Overview & Live KPIs)
- **Monitoring en direct** : Visualisation instantanée de l'état de la flotte (Véhicules disponibles, En location, En maintenance, Réservés).
- **Indicateurs Financiers Clés** : Chiffre d'affaires mensuel et annuel, panier moyen par contrat, taux d'occupation de la flotte (Occupancy Rate).
- **Analyse Comparative** : Comparaison des performances Véhicules Standard vs. Véhicules Luxury / Smart Cars.
- **Visualisations Avancées (Recharts)** : Graphiques en aires, histogrammes d'évolution, graphiques en radar de popularité des modèles.
- **Statut de Fraîcheur des Données** : Détection dynamique de l'état réseau avec alertes en temps réel (*En direct*, *À jour*, *Mis à jour il y a X min*).

### 3.2 Smart Contracts & Inspection Digitale 2D
Le module phare de la plateforme qui élimine les litiges clients et le papier :
- **Génération Numérique Instantanée** : Création assistée d'un contrat de location avec attribution automatique d'un numéro unique.
- **Cartographie Interactive des Dommages en 2D (Schéma SVG)** :
  - Détection et marquage précis sur 25 zones du véhicule (pare-chocs, capot, toit, 4 portières, 4 jantes, optiques, rétroviseurs, vitres).
  - Coloration dynamique en temps réel (vert normal / rouge endommagé) sur l'écran et sur le document imprimé.
  - Typologie des dommages : léger, moyen, grave avec champ descriptif et photos justificatives horodatées.
- **Contrôle Précis du Carburant** :
  - Jauge visuelle de 0% à 100% au départ et au retour.
  - Calculateur automatique des litres manquants et facturation instantanée selon le tarif au litre configuré.
- **Gestion des Cautions & Franchises** : Suivi des dépôts de garantie, empreintes de carte bancaire, chèques de caution avec date d'encaissement.
- **Frais Annexes Paramétrables** : Livraison aéroport/gare, siège bébé, GPS, conducteur additionnel, frais de dossier, taxe de séjour, TVA.
- **Double Signature Électronique** : Signature tactile ou à la souris pour le client et l'agent loueur.
- **Édition & Impression PDF Prête à l'Emploi** : Modèle de contrat officiel bilingue aux normes juridiques marocaines et internationales.

### 3.3 Gestion de Flotte Connectée (Smart Cars & Standard)
- **Catalogue Flotte Complet** : Immatriculation/Matricule marocaine, marque, modèle, catégorie (Citadine, SUV, Berline, Sport, Utilitaire, 4x4), motorisation (Diesel, Essence, Hybride, Électrique), boîte de vitesse.
- **Pochette Numérique du Véhicule** :
  - Téléchargement sécurisé de la Carte Grise (Recto et Verso).
  - Gestion des dates de visite technique et vignettes.
  - Inventaire des équipements audio/multimédia (GPS, Bluetooth, Radio, CD).
  - Gestion du trousseau de clés de sécurité.
- **Télémétrie Kilométrique** :
  - Compteur kilométrique cumulé en temps réel.
  - Historique complet de chaque trajet avec kilométrage départ, kilométrage retour et distance nette parcourue.

### 3.4 Planning & Calendrier Interactif (FullCalendar)
- **Vue Chronologique Globale** : Affichage DayGrid (mois) et TimeGrid (semaine/jour) de toutes les locations en cours et à venir.
- **Détection des Conflits de Disponibilité** : Empêche les surréservations (overbooking) en vérifiant automatiquement les créneaux libres par véhicule.
- **Fiche Événement Rapide** : Clic direct sur un créneau pour afficher les détails du client, le véhicule loué, le numéro de téléphone et les dates d'arrivée/retour.

### 3.5 CRM Clients & Dossiers Numériques
- **Fiche d'Identité Complète** : Nom, prénom, CIN (Carte d'Identité Nationale pour les résidents), Passeport (pour les touristes/MRE), numéro de permis et date de délivrance.
- **Profil Démographique & Contact** : Nationalité, adresse, téléphone, e-mail, contact d'urgence (nom, lien de parenté, numéro).
- **Historique & Valeur Vie Client (LTV)** : Nombre total de locations effectuées, chiffre d'affaires cumulé généré, ponctualité des retours.

### 3.6 Réseau Anti-Fraude & Liste Noire (Blacklist Multi-Agences)
- **Système d'Alerte Préventive** : Détection instantanée lors de la saisie d'un nouveau contrat si le client figure dans la base noire.
- **Vérification Multi-Critères Infaillible** : Recherche croisée instantanée par **CIN**, par **numéro de passeport** ou par **numéro de permis de conduire**.
- **Gestion des Motifs d'Insolvabilité / Litige** : Factures impayées, dégradation volontaire, tentative de vol, non-restitution du véhicule, conduite dangereuse.

### 3.7 Gestion des Assurances & Alertes d'Échéances
- **Suivi des Polices d'Assurance** : Compagnie d'assurance (Wafa Assurance, RMA, Saham, AXA, etc.), numéro de police, coût annuel, formule (Tous risques, Tierce collision, Responsabilité civile).
- **Statut en Direct & Alertes Délais** :
  - Indicateur de validité : *Actif*, *Échéance imminente (< 30 jours)*, *Urgence (< 7 jours)*, *Expiré*.
  - Évite les amendes et l'immobilisation juridique de véhicules non couverts.

### 3.8 Maintenance Prédictive, Vidanges & Contrôle Kilométrique
- **Intervalles de Vidange Configurables** : Paramétrage par véhicule (ex: 8 000 km, 10 000 km, 12 000 km).
- **Algorithme d'Alerte Kilométrique** : Calcul automatique entre le compteur actuel et la prochaine vidange programmée.
- **Carnet d'Entretien Numérique** :
  - Enregistrement détaillé des interventions : Vidange moteur, plaquettes et disques de frein, remplacement pneumatiques, recharge climatisation, batterie.
  - Enregistrement du coût d'intervention, du kilométrage exact et du nom du prestataire/garage.

### 3.9 Facturation, Dépenses Garages & Business Intelligence
- **Gestion des Factures Réparations & Fournisseurs** : Enregistrement des factures d'entretien émises par les garages partenaires avec numéro de facture, pièces remplacées, main-d'œuvre.
- **Suivi des Encaissements & Modes de Règlement** : Répartition analytique entre espèces, cartes bancaires, chèques et virements bancaires.
- **Rentabilité Nette par Véhicule** : Calcul automatique de la rentabilité (Revenus générés - Coûts d'entretien - Coûts d'assurance = Marge nette réelle par voiture).

---

## 4. Portail Web Client, B2B & SEO Programmatique

En complément du logiciel ERP, la solution intègre une machine marketing web conçue pour capter des réservations directes sans commission OTAs :

- **Moteur de Recherche & Réservation en 3 Étapes** : Sélection des dates et heures, choix de la ville de prise en charge et de restitution, filtrage instantané par prix, catégorie et boîte de vitesses.
- **Machine SEO Programmatique Multi-Villes** :
  - Pages ciblées géolocalisées optimisées pour Google :
    - *Location voiture Casablanca pas cher (avec ou sans caution)*
    - *Location voiture Marrakech pas cher*
    - *Location voiture Agadir pas cher*
    - *Location voiture Fès pas cher*
    - *Location voiture Rabat pas cher*
    - *Location voiture Tanger pas cher*
    - *Location voiture électrique Maroc*
  - Balises de données structurées Schema.org JSON-LD (Product, AggregateRating, Review, LocalBusiness, FAQ).
- **Plateforme de Contenu Blog & Éducation** : 13 rubriques complètes dédiées à la gestion de flotte automobile, aux astuces pour loueurs, et à la législation du transport.
- **Portail Partenaire B2B** : Interface pour recruter des agences locales et franchisés souhaitant utiliser la plateforme.

---

## 5. Modèles de Données & Schémas Base de Données (MongoDB)

| Modèle | Fichier Source | Rôle Principal |
| :--- | :--- | :--- |
| **`User`** | `models/User.js` | Gestion des comptes agence, super-administrateurs, identifiants et rôles. |
| **`Vehicle`** | `models/Vehicle.js` | Flotte standard avec caractéristiques, statut et suivi kilométrique. |
| **`SmartCar`** | `models/SmartCar.js` | Flotte connectée / premium avec gestion approfondie de l'entretien et documents. |
| **`SmartContract`**| `models/SmartContract.js` | Contrats intelligents avec schémas imbriqués (dommages 2D, carburant, paiements multiples). |
| **`Client`** | `models/Client.js` | CRM clients complet avec CIN, passeport, permis et historique de location. |
| **`Blacklist`** | `models/Blacklist.js` | Registre des conducteurs à risque avec fonction d'interrogation statique instantanée. |
| **`Insurance`** | `models/Insurance.js` | Suivi des contrats d'assurance, coûts, dates d'effet et alertes d'expiration. |
| **`Accident`** | `models/Accident.js` | Rapports de sinistres avec liste des dégâts chiffrés et archivage photos. |
| **`Facture`** | `models/Facture.js` | Suivi comptable des réparations et coûts de fonctionnement par garage. |
| **`KilometerHistory`** | `models/KilometerHistory.js` | Journalisation horodatée de chaque variation d'odomètre par véhicule. |

---

## 6. Sécurité & Conformité Juridique

- **Protection des Données Personnelles** : Conforme aux exigences de la CNDP au Maroc.
- **Stockage Cloud Sécurisé** : Médias et pièces justificatives hébergés sur Cloudinary via HTTPS.
- **Authentification Robuste** : Tokens JWT avec expiration automatique et salage de mot de passe par BCrypt.
- **Audit Trail (Historique d'Actions)** : Chaque validation d'inspection, modification de contrat ou saisie de kilométrage enregistre l'auteur et l'horodatage exact.

---

## 7. Installation & Déploiement

### Prérequis
- Node.js version 18+ ou 20+ LTS
- Instance MongoDB locale ou MongoDB Atlas (Cloud)
- Compte Cloudinary (API Key, Secret, Cloud Name)

### Démarrage du Backend
```bash
cd backloca
npm install
npm run dev     # Mode développement avec nodemon
npm run seed    # (Optionnel) Initialisation avec données de test
npm start       # Mode production
```

### Démarrage du Frontend SaaS
```bash
cd rvmorocco-next
npm install
npm run dev     # Accessible sur http://localhost:3000
npm run build   # Génération du build de production optimisé
npm start       # Démarrage du serveur Next.js en production
```
