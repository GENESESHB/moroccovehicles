'use client';

import { useState, useEffect, useRef } from 'react';

/* =========================================================
   ChatBot – Sarah, conseillère WeCar & MoroccoVehicles
   ========================================================= */
const SARAH_AVATAR = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Bonjour ! Je suis Sarah, votre conseillère WeCar & MoroccoVehicles. Ravie de vous accompagner dans la recherche de votre voiture de location idéale ou de vous renseigner sur notre logiciel de gestion pour agences !

De quel type de véhicule ou d'information avez-vous besoin aujourd'hui ?`,
      at: Date.now(),
      id: 1,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const mountedRef = useRef(true);

  const wecarColors = {
    primary: "#36c275",
    secondary: "#2aa15f",
    light: "#e8f7ef",
    dark: "#1e7a4a",
    gradient: "linear-gradient(135deg, #36c275 0%, #2aa15f 100%)",
    messageText: "#222222",
    subtle: "#6b7280",
  };

  const answers = [
    // 1. Qui sommes-nous / Présentation globale
    {
      keywords: ["qui etes vous", "qui êtes-vous", "que faites vous", "que faites-vous", "que proposez vous", "concept", "plateforme", "presentation", "présentation", "moroccovehicles", "morocco vehicles", "wecar", "rvmorocco", "activite", "activité"],
      reply: `MoroccoVehicles & WeCar est la plateforme automobile de référence au Maroc. Nous proposons deux services majeurs :

1. Pour les Locataires & Voyageurs :
Réservation de voitures au meilleur prix auprès des meilleures agences locales certifiées dans tout le Maroc (Casablanca, Marrakech, Agadir, Tanger, Rabat, Fès...). Tarifs transparents, options sans caution et livraison aéroport gratuite.

2. Pour les Agences de Location (SaaS B2B) :
Le logiciel leader de gestion de flotte automobile : contrats digitaux, smart contracts, tracking GPS en direct, rappels vidanges/assurances, facturation et liste noire partagée.

Souhaitez-vous des détails sur la location de véhicules ou sur le logiciel agence ?`,
    },

    // 2. Logiciel pour Agences & Gestion de Flotte
    {
      keywords: ["logiciel", "logiciel agence", "gestion de flotte", "fleet", "espace agence", "partenaire", "devenir partenaire", "saas", "b2b", "solution agence", "loueur", "inscrire agence"],
      reply: `Notre logiciel SaaS MoroccoVehicles digitalise à 100% votre agence de location :

* Inventaire & Flotte : Suivi de disponibilité en direct et calendrier visuel interactif.
* Contrats en 1 clic : Contrats PDF conformes prêts à imprimer avec photos d'état des lieux.
* Maintenance : Alertes automatiques de vidanges (8000, 10000, 12000 km) et suivi des frais garagistes.
* Sécurité Blacklist : Vérification instantanée par CIN / passeport pour bloquer les mauvais payeurs.
* Factures & Devis : Facturation conforme et calcul automatique de la rentabilité.

Vous pouvez tester notre solution ou planifier une démo gratuite au +212 622 283 559 !`,
    },

    // 3. Tarifs et abonnements Logiciel
    {
      keywords: ["tarifs logiciel", "prix logiciel", "combien coute le logiciel", "starter", "pro", "business", "abonnement", "forfait logiciel", "licence"],
      reply: `Nos forfaits pour agences de location sont sans engagement :

* Starter (199 MAD/mois ou 165 MAD en annuel) : Flotte jusqu'à 10 véhicules, contrats PDF, calendrier et support WhatsApp.
* Pro (499 MAD/mois ou 415 MAD en annuel) : 50 véhicules, Smart Contracts, calendrier multi-agences, gestion assurances, alertes vidange et Blacklist partagée.
* Business (999 MAD/mois ou 832 MAD en annuel) : Flotte illimitée, module Luxe VIP, API RESTful et manager attitré.

2 mois offerts pour tout abonnement annuel ! Démo de 30 min offerte sur demande.`,
    },

    // 4. Smart Cars, Véhicules Connectés & GPS IoT
    {
      keywords: ["smart car", "smart cars", "gps", "traceur", "tracking", "geolocalisation", "géolocalisation", "iot", "telemetrie", "télémétrie", "coupure moteur"],
      reply: `Le module Smart Cars connecte vos véhicules en temps réel via des balises GPS IoT :

* Géolocalisation en direct partout sur les routes du Maroc.
* Relevé kilométrique automatique pour déclencher les alertes vidanges sans saisie manuelle.
* Niveau de carburant en temps réel au départ et à la restitution.
* Alertes de sécurité : Sortie de zone autorisée, excès de vitesse et coupure moteur à distance en cas de vol.`,
    },

    // 5. Smart Contracts & Contrats Digitaux
    {
      keywords: ["smart contract", "smart contracts", "smartcontra", "contrat digital", "signature electronique", "signature électronique", "etat des lieux", "état des lieux", "contrat pdf"],
      reply: `Nos Contrats Digitaux et Smart Contracts remplacent totalement le papier :

* Génération instantanée du contrat PDF pré-rempli.
* État des lieux numérique avec photos horodatées des rayures et chocs.
* Signature électronique directement sur smartphone ou tablette.
* Envoi automatique de la copie au client par WhatsApp et email.
* Historique complet conservé pour éviter tout litige lors du retour.`,
    },

    // 6. Liste Noire / Blacklist partagée
    {
      keywords: ["blacklist", "liste noire", "black-list", "impaye", "impayé", "vol", "fraude", "escroquerie", "mauvais payeur", "verifier client", "vérifier client", "cin blacklist"],
      reply: `Le module Blacklist protège votre agence contre les clients à risque :

* Vérification instantanée : Saisissez le numéro de CIN ou passeport du locataire.
* Alerte immédiate si le conducteur a des antécédents d'impayés, d'accidents graves ou de détournement.
* Base de données partagée entre agences partenaires vérifiées.
* Archivage des dossiers de sinistres pour prévenir les arnaques.`,
    },

    // 7. Maintenance, Vidanges & Contrôle Technique
    {
      keywords: ["maintenance", "vidange", "revision", "révision", "reparation", "réparation", "garage", "pneu", "pneus", "freins", "alerte vidange"],
      reply: `Module Maintenance pour optimiser la durée de vie de votre flotte :

* Alertes vidanges configurables (8 000, 10 000 ou 12 000 km) selon votre type d'huile.
* Historique complet des entretiens (plaquettes de frein, filtres, pneumatiques, batterie).
* Gestion des factures fournisseurs et calcul du coût de revient au kilomètre par véhicule.`,
    },

    // 8. Assurances, Vignettes & Cartes Grises
    {
      keywords: ["assurance", "assurances", "carte grise", "vignette", "controle technique", "contrôle technique", "echeance", "échéance", "impot 2026", "taxe"],
      reply: `Le coffre-fort numérique de votre parc automobile :

* Alertes proactives d'échéance à 30, 15 et 7 jours avant l'expiration d'une assurance ou d'une visite technique.
* Stockage sécurisé des cartes grises et attestations scannées.
* Suivi des vignettes fiscales annuelles (2026, 2027...) pour chaque immatriculation.`,
    },

    // 9. Facturation, Devis & Rentabilité (Analytics)
    {
      keywords: ["facturation", "facture", "factures", "devis", "comptabilite", "comptabilité", "revenu", "ca", "rentabilite", "rentabilité", "taux d occupation", "kpi", "statistiques"],
      reply: `Suivez vos indicateurs financiers en temps réel :

* Émission de devis et factures normalisées conformes aux normes marocaines.
* Tableaux de bord de chiffre d'affaires mensuel et annuel.
* Suivi du taux d'occupation de vos véhicules pour adapter vos tarifs en haute et basse saison.
* Export des données en PDF et CSV pour votre comptable.`,
    },

    // 10. Formules "7 Euro" & Location Pas Cher
    {
      keywords: ["7 euro", "7 euros", "7€", "sept euro", "moins cher", "pas cher", "prix bas", "low cost", "economique", "économique", "petit prix"],
      reply: `Nos offres à partir de 7€ par jour (environ 75-80 DH/jour) :

* Formule spéciale réservée aux locations longue durée (au mois) ou offres spéciales hors-saison sur citadines (Dacia Sandero, Clio 5, Hyundai i10).
* Pour les séjours courts : Nos tarifs débutent dès 200–250 DH/jour avec climatisation et kilométrage illimité.
* Transparence absolue : Aucun frais caché lors de la remise des clés !`,
    },

    // 11. Formules "Sans Caution" (Zéro Dépôt)
    {
      keywords: ["sans caution", "sans depot", "sans dépôt", "zero caution", "zéro caution", "pas de caution", "caution", "franchise", "sans franchise"],
      reply: `Formules SANS CAUTION au Maroc :

* Disponibles chez nos agences partenaires à Casablanca, Marrakech, Agadir, Fès et Tanger.
* Pour en bénéficier : Choisissez l'option "Assurance Tous Risques zéro franchise" lors de la réservation.
* Sans cette option : La caution classique se fait par simple pré-autorisation par carte bancaire (non débitée) et débloquée immédiatement au retour du véhicule.`,
    },

    // 12. Livraison Gratuite & Aéroports
    {
      keywords: ["livraison", "sans frais de livraison", "livraison gratuite", "aeroport", "aéroport", "terminal", "gare", "hotel", "hôtel", "recuperer voiture"],
      reply: `Livraison gratuite de votre véhicule dans les principaux points d'arrivée :

* Aéroports : Casablanca Mohammed V (CMN), Marrakech-Ménara (RAK), Agadir Al Massira (AGA), Tanger Ibn Battouta (TNG), Rabat-Salé (RBA), Fès-Saïss (FEZ), Nador et Oujda.
* Gares ONCF : Casa-Voyageurs, Marrakech, Tanger Ville (TGV), Rabat Agdal.
* Directement à votre hôtel ou résidence 7j/7 et 24h/24 !`,
    },

    // 13. Casablanca
    {
      keywords: ["casablanca", "casa", "cmn", "mohammed v", "maarif", "anfa", "ain diab", "casa voyageurs"],
      reply: `Location de voiture à Casablanca :

* Points de retrait : Aéroport Mohammed V (Terminaux 1 & 2, service 24h/24), Gare Casa-Voyageurs, Maârif, Bd d'Anfa.
* Véhicules conseillés : Citadines (Sandero, Clio) pour la ville, berlines confortables pour l'autoroute Casa-Rabat.
* Tarifs dès 220 DH/jour. Livraison offerte dès 3 jours de location !`,
    },

    // 14. Marrakech
    {
      keywords: ["marrakech", "rak", "menara", "gueliz", "guéliz", "hivernage", "palmeraie", "medina"],
      reply: `Location de voiture à Marrakech :

* Points de remise : Aéroport Marrakech-Ménara (RAK), Guéliz, Hivernage, Palmeraie ou votre Riad.
* Véhicules populaires : Citadines maniables pour la ville, SUV & 4x4 (Duster, Tucson, Prado) pour l'Ourika, Agafay et Oukaimeden, ou cabriolets de luxe.
* Tarifs dès 230 DH/jour avec option sans caution disponible !`,
    },

    // 15. Agadir & Taghazout
    {
      keywords: ["agadir", "aga", "al massira", "taghazout", "tamraght", "essaouira", "marina agadir"],
      reply: `Location de voiture à Agadir & Taghazout :

* Prise en charge : Aéroport Agadir Al Massira (AGA), Marina, Taghazout Bay.
* Idéal pour vos vacances balnéaires ou surf trips (Taghazout, Imsouane, Mirleft).
* Tarifs dès 220 DH/jour avec kilométrage illimité pour longer la côte atlantique !`,
    },

    // 16. Tanger & Nord
    {
      keywords: ["tanger", "tng", "ibn battouta", "port tanger med", "tanger ville", "tetouan", "tétouan", "chefchaouen"],
      reply: `Location de voiture à Tanger et dans le Nord :

* Points de livraison : Aéroport Tanger Ibn Battouta (TNG), Port Tanger Med, Gare TGV.
* Parfait pour visiter Chefchaouen, Tétouan et Asilah.
* Tarifs dès 250 DH/jour avec assistance 24/7 incluse.`,
    },

    // 17. Rabat, Fès, Ouarzazate, Nador, Oujda
    {
      keywords: ["rabat", "fes", "fès", "ouarzazate", "nador", "oujda", "meknes", "meknès", "sale", "salé"],
      reply: `Couverture complète dans toutes les villes du Royaume :

* Rabat (RBA) : Idéal pour missions professionnelles et gouvernementales.
* Fès (FEZ) : Idéal pour visiter la médina et le patrimoine historique.
* Ouarzazate : Aux portes du désert, grand choix de SUV et 4x4.
* Nador & Oujda : Aéroports et ports de l'Oriental.

Option restitution dans une autre ville (One-Way) disponible !`,
    },

    // 18. Désert, 4x4 & Aventures (Merzouga, Zagora, Atlas)
    {
      keywords: ["desert", "désert", "4x4", "suv", "merzouga", "zagora", "dunes", "sahara", "atlas", "duster", "prado", "hilux", "offroad", "piste"],
      reply: `Pour explorer l'Atlas et les dunes du Sahara :

* Dacia Duster 4x4 Prestige : Dès 420 DH/j (polyvalent, économique et passe-partout).
* Hyundai Tucson & Kia Sportage : Dès 600 DH/j (confort supérieur et boîte auto).
* Toyota Land Cruiser Prado & Hilux Double Cabine : Dès 750–900 DH/j (le roi des pistes et des dunes).

Tous nos 4x4 sont préparés avec pneus adaptés et clim renforcée !`,
    },

    // 19. Luxe, Prestige & VIP (Mariage / Chauffeur)
    {
      keywords: ["luxe", "prestige", "vip", "mercedes", "range rover", "bmw", "audi", "porsche", "mariage", "chauffeur", "classe c", "classe e", "evoque"],
      reply: `Flotte Luxury & Prestige pour vos événements et séjours VIP :

* Modèles : Mercedes-Benz Classe C/E/S, Range Rover Evoque & Sport, BMW Série 4/5, Porsche Macan.
* Tarifs : Dès 1100 DH à 2500 DH/jour selon le modèle.
* Services inclus : Accueil VIP, formalités express, option chauffeur privé professionnel en costume pour mariages et délégations.`,
    },

    // 20. Citadines & Économiques
    {
      keywords: ["citadine", "economique", "économique", "dacia", "logan", "sandero", "stepway", "clio", "peugeot 208", "i10", "fiat 500"],
      reply: `Nos citadines économiques :

* Dacia Sandero Stepway / Logan 1.5 dCi : Dès 220–250 DH/jour (Gasoil, sobre et grand coffre).
* Renault Clio 5 : Dès 270–300 DH/jour (écran tactile, moderne et très confortable).
* Peugeot 208 : Dès 280–320 DH/jour (boîte automatique ou manuelle).
* Fiat 500 : Dès 260 DH/jour (idéale en ville).

Toutes climatisées avec kilométrage illimité !`,
    },

    // 21. Berlines & Familiales
    {
      keywords: ["berline", "familiale", "confort", "golf 8", "golf", "octavia", "peugeot 508", "scenic", "coffre"],
      reply: `Pour voyager confortablement en famille :

* VW Golf 8 R-Line : Dès 500–550 DH/jour (boîte automatique DSG).
* Skoda Octavia & Peugeot 508 : Dès 450–600 DH/jour (coffre XXL de plus de 550 litres).
* Renault Scénic / Dacia Jogger : Dès 400–500 DH/jour (spacieux pour 5 à 7 personnes).

Fixations ISOFIX pour sièges bébé incluses.`,
    },

    // 22. Vans & Minibus (7 à 9 places)
    {
      keywords: ["van", "minibus", "7 places", "8 places", "9 places", "vito", "classe v", "hyundai h1", "h1", "groupe"],
      reply: `Pour les groupes et familles nombreuses :

* Mercedes Vito & Classe V : Dès 900–1400 DH/jour (standing premium et grand volume).
* Hyundai H1 : Dès 650–850 DH/jour (9 vraies places et grand espace bagages).
* Dacia Jogger 7 places : Dès 380–480 DH/jour (solution 7 places économique).

Conduite avec permis B classique !`,
    },

    // 23. Électrique & Hybride
    {
      keywords: ["electrique", "électrique", "hybride", "hybrid", "yaris", "toyota yaris hybride", "tesla", "ecologique", "écologique"],
      reply: `Mobilité durable au Maroc :

* Toyota Yaris Hybride : Dès 310 DH/jour (consommation sous 4L/100km, automatique et silencieuse).
* Fiat 500 Hybrid : Dès 260 DH/jour.
* Véhicules 100% électriques disponibles à Casablanca, Marrakech, Rabat et Tanger avec câbles de recharge fournis.`,
    },

    // 24. Conditions de Location & Documents
    {
      keywords: ["permis", "permis de conduire", "document", "documents", "papiers", "age", "âge", "condition", "conditions", "cin", "passeport", "age minimum"],
      reply: `Documents et conditions obligatoires :

1. Permis de conduire physique valide (min. 1 an d'ancienneté, 2 ans pour SUV/Luxe).
2. Pièce d'identité : CNI pour résidents marocains ou Passeport en cours de validité pour touristes/MRE.
3. Âge minimum : 21 ans (25 ans pour la catégorie Luxe).
4. Conducteur additionnel gratuit sur simple présentation de son permis.`,
    },

    // 25. Assurances & Franchise
    {
      keywords: ["assurance tous risques", "assurance tiers", "franchise", "rachat de franchise", "cdw", "accident", "sinistre"],
      reply: `Couvertures d'assurance complètes :

* Assurance au Tiers incluse d'office avec assistance 24/7.
* Assurance Tous Risques (CDW/TP) avec franchise plafonnée.
* Option Rachat Total de Franchise (Zero Dépôt) : Aucune caution à verser et couverture totale en cas d'accrochage ou vol !
* Assistance dépannage 24h/24 partout au Maroc au +212 622 283 559.`,
    },

    // 26. Restitution dans une autre ville (One-Way)
    {
      keywords: ["one way", "one-way", "autre ville", "rendre autre ville", "restitution differente", "intervilles"],
      reply: `Option One-Way : Récupérez la voiture dans une ville et restituez-la dans une autre !

Exemple : Prise en charge à l'aéroport de Casablanca et restitution à Marrakech ou Tanger. De légers frais de retour inter-villes s'appliquent selon la distance.`,
    },

    // 27. Carburant & Équipements inclus
    {
      keywords: ["carburant", "essence", "gasoil", "diesel", "plein", "plein a plein", "siege bebe", "siège bébé", "rehausseur"],
      reply: `Services et équipements :

* Règle "Plein à Plein" : Vous recevez le véhicule avec le plein et le restituez avec le plein.
* Climatisation, Bluetooth et kit de sécurité inclus sur tous nos véhicules.
* Siège bébé (0-3 ans) à 30 DH/jour, réhausseur à 20 DH/jour sur demande.`,
    },

    // 28. Paiement & Devises
    {
      keywords: ["paiement", "payer", "carte bancaire", "cb", "especes", "espèces", "virement", "euros", "dirhams", "cih", "attijariwafa"],
      reply: `Moyens de paiement acceptés :

* À la livraison : En espèces (Dirhams ou Euros au taux officiel) ou par carte bancaire.
* En ligne : Carte bancaire sécurisée.
* Pour les agences : Virement bancaire marocain (CIH, Attijariwafa Bank, BMCE), CB ou prélèvement automatique sans engagement.`,
    },

    // 29. Annulation & Retard de Vol
    {
      keywords: ["annuler", "annulation", "modifier", "modification", "retard vol", "retard avion", "remboursement"],
      reply: `Flexibilité totale pour votre voyage :

* Annulation GRATUITE jusqu'à 48h avant la prise en charge.
* En cas de retard de votre vol : Transmettez-nous votre numéro de vol lors de la réservation, notre agent suivra l'atterrissage et vous attendra sans frais supplémentaires !`,
    },

    // 30. Contact & Coordonnées
    {
      keywords: ["contact", "telephone", "téléphone", "whatsapp", "mail", "email", "numero", "numéro", "adresse", "siege"],
      reply: `Pour nous joindre directement :

* Téléphone & WhatsApp direct : +212 622 283 559
* Service client : +212 522 543 210
* Urgences 24h/24 : +212 661 789 456
* Email : contact@moroccovehicles.com
* Siège : Boulevard d'Anfa, Casablanca, Maroc
* Service ouvert 7j/7 de 8h00 à 22h00 !`,
    },

    // 31. Support en Darija & Langues
    {
      keywords: ["darija", "arabe", "marocain", "langue", "anglais", "english"],
      reply: `Nous répondons dans votre langue préférée :

* Darija marocaine : مرحباً بكم، نتشرف بخدمتكم في أي وقت
* Français : Service client et assistance technique francophone
* Anglais : Full English assistance for international visitors.`,
    },

    // 32. Conseils Conduite au Maroc
    {
      keywords: ["conduire au maroc", "autoroute", "jawaz", "peage", "péage", "radar", "police", "code de la route"],
      reply: `Conseils pour rouler au Maroc :

* Autoroutes : Vitesse limitée à 120 km/h, réseau moderne et sécurisé.
* Péages : En espèces ou via le badge automatique Jawaz.
* En ville : Vitesse limitée à 60 km/h. Radars automatiques très actifs, respectez scrupuleusement les limitations !`,
    },

    // 33. Salutations
    {
      keywords: ["bonjour", "salut", "hey", "hello", "coucou", "salam", "bonsoir", "salam alikoum"],
      reply: `Bonjour ! Je suis Sarah de WeCar & MoroccoVehicles, ravie de faire votre connaissance !

Je vois que vous cherchez une voiture de location ou des renseignements ? Pourriez-vous me dire un peu plus sur votre projet de voyage ou votre agence ? Par exemple :
* Combien de personnes voyagent ?
* Quelle est votre destination préférée (Casablanca, Marrakech, Agadir...) ?
* Avez-vous un budget en tête ?

Je pourrai ainsi vous proposer les meilleures options !`,
    },

    // 34. Remerciements
    {
      keywords: ["merci", "thanks", "thank you", "super", "parfait", "top", "choukrane", "chokran", "barakallah"],
      reply: `Avec plaisir ! C'est un vrai plaisir de vous aider.

Est-ce qu'il y a autre chose qui vous préoccupe concernant votre location ou notre logiciel ? Peut-être des questions sur l'assurance, les options sans caution, ou les modalités de retrait ?

Je reste à votre entière disposition !`,
    },

    // 35. Urgences & Panne
    {
      keywords: ["aide", "support", "help", "urgence", "problème", "probleme", "panne", "accident"],
      reply: `Bien sûr, je suis là pour vous accompagner !

Pour résoudre rapidement votre situation, voici nos contacts prioritaires :
* Support client : +212 522 543 210
* WhatsApp : +212 622 283 559
* Urgences & Dépannage 24h/24 : +212 661 789 456

Nous sommes là pour vous partout au Maroc !`,
    }
  ];

  function similarity(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) return 1;
    if (a.length < 2 || b.length < 2) return 0;
    let same = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) same++;
    }
    return same / Math.max(a.length, b.length);
  }

  function generateSmartReply(userText) {
    const text = userText.trim().toLowerCase();
    if (!text) return "Je suis là pour vous aider ! Pourriez-vous me dire ce que vous recherchez exactement ?";

    // Check direct phrase inclusions in answers
    for (const ans of answers) {
      for (const kw of ans.keywords) {
        if (text.includes(kw.toLowerCase())) {
          return ans.reply;
        }
      }
    }

    // Contextual checks
    if ((text.includes("4x4") || text.includes("désert") || text.includes("desert")) && !text.includes("prix")) {
      return `Ah, l'appel du désert ! Les 4x4 sont parfaits pour explorer le Sahara et l'Atlas.

Le Dacia Duster 4x4 à partir de 420 DH/jour et le Toyota Prado sont particulièrement appréciés pour leur fiabilité dans les dunes.

Avez-vous déjà des dates pour votre aventure ?`;
    }

    if (text.includes("économique") || text.includes("economique") || (text.includes("pas cher") && text.includes("voiture"))) {
      return `Le budget compte !

Notre Dacia Sandero dès 220–250 DH/jour : clim, assurance complète, conso réduite et kilométrage illimité.

Bonus : dès 3 jours de location, la livraison est offerte à votre hôtel ou aéroport. Cela vous intéresse ?`;
    }

    if ((text.includes("famille") || text.includes("enfant")) && !text.includes("siège")) {
      return `Pour la famille : Berlines spacieuses (Golf 8, Octavia) ou monospaces 7 places (Dacia Jogger, Scénic) dès 400 DH/jour avec grands coffres et sièges enfants en option.

Vous serez combien de passagers au total ?`;
    }

    // Fuzzy matching word-by-word
    const words = text.split(/\s+/);
    let bestMatch = null;
    let highestScore = 0;

    for (const ans of answers) {
      for (const kw of ans.keywords) {
        for (const word of words) {
          const score = similarity(word, kw);
          if (score > highestScore && score >= 0.6) {
            highestScore = score;
            bestMatch = ans.reply;
          }
        }
      }
    }

    if (bestMatch) return bestMatch;

    return `Pour bien vous répondre, pouvez-vous préciser votre recherche :

* Type de voyage ou ville souhaitée (Casablanca, Marrakech, Agadir, Tanger...)
* Nombre de personnes ou type de véhicule (citadine, 4x4, SUV, berline, sans caution)
* Ou êtes-vous une agence intéressée par notre logiciel de gestion de flotte ?

Je vous proposerai immédiatement des solutions adaptées !`;
  }

  const typeMessage = async (message) => {
    if (!mountedRef.current) return;
    setIsTyping(true);
    const botMessageId = Date.now() + Math.random();
    setMessages(prev => [...prev, { from: "bot", text: "", at: Date.now(), id: botMessageId }]);
    let i = 0;
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (!mountedRef.current) { clearInterval(interval); resolve(); return; }
        setMessages(prev => {
          const next = [...prev];
          const current = next.find(m => m.id === botMessageId);
          if (current) current.text = message.substring(0, i + 1);
          return next;
        });
        i++;
        if (i >= message.length) { clearInterval(interval); setIsTyping(false); resolve(); }
      }, 20);
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const now = Date.now();
    setMessages(prev => [...prev, { from: "user", text: input, at: now, id: now + Math.random() }]);
    const userInput = input;
    setInput("");
    await new Promise(r => setTimeout(r, 800));
    const reply = generateSmartReply(userInput);
    await typeMessage(reply);
  };

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    mountedRef.current = true;
    const handleClickOutside = (event) => {
      const container = document.getElementById("chat-container");
      const toggle = document.getElementById("chat-toggle");
      if (isOpen && container && !container.contains(event.target) && event.target !== toggle) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      mountedRef.current = false;
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        id="chat-toggle"
        onClick={(e) => { e.stopPropagation(); setIsOpen(v => !v); }}
        style={{
          position: "fixed", bottom: "20px", right: "20px", borderRadius: "50%",
          background: wecarColors.gradient, color: "#fff", fontSize: "16px",
          width: "50px", height: "50px", border: "none", cursor: "pointer", zIndex: 1000,
          boxShadow: "0 4px 15px rgba(54, 194, 117, 0.4)", transition: "all 0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        aria-label="Ouvrir le chat"
      >
        Chat
      </button>

      {isOpen && (
        <section id="chat-container" style={{
          position: "fixed", bottom: "80px", right: "20px", width: "340px", height: "450px",
          display: "flex", flexDirection: "column", background: "#fff", borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)", overflow: "hidden", zIndex: 999,
          border: `1px solid ${wecarColors.light}`
        }}>
          <div style={{
            background: wecarColors.gradient, color: "#fff", padding: "16px",
            fontSize: "15px", fontWeight: 600, display: "flex",
            alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={SARAH_AVATAR}
                alt="Sarah"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(255,255,255,0.85)"
                }}
              />
              <div>
                <div>Sarah - WeCar</div>
                <div style={{ fontSize: "11px", opacity: 0.9 }}>Conseillère locations</div>
              </div>
            </div>
            <span style={{
              fontSize: "10px", background: "rgba(255,255,255,0.25)",
              padding: "4px 8px", borderRadius: "10px"
            }}>En ligne</span>
          </div>

          <div ref={chatBoxRef} style={{
            flex: 1, padding: "16px", overflowY: "auto", fontSize: "14px",
            display: "flex", flexDirection: "column", gap: "16px", background: "#f8f9fa"
          }}>
            {messages.map((msg, idx) => {
              const isUser = msg.from === "user";
              const isLast = idx === messages.length - 1;
              return (
                <div key={msg.id} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start"
                }}>
                  <div style={{
                    fontSize: "11px", color: wecarColors.subtle, marginBottom: "4px",
                    display: "flex", alignItems: "center", gap: "6px",
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    padding: isUser ? "0 8px 0 0" : "0 0 0 8px"
                  }}>
                    <span style={{ color: isUser ? wecarColors.primary : "#9ca3af", fontSize: "8px" }}>
                      {isUser ? "> " : "* "}
                    </span>
                    <span>{isUser ? "Vous" : "Sarah"}</span>
                    <span style={{ fontSize: "10px" }}>
                      {msg.at ? new Date(msg.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
                  </div>
                  <div style={{
                    color: wecarColors.messageText, whiteSpace: "pre-line",
                    lineHeight: 1.55, fontSize: "14px", fontWeight: 400,
                    textAlign: "left", maxWidth: "85%",
                    background: isUser ? wecarColors.light : "transparent",
                    padding: isUser ? "12px 16px" : 0,
                    borderRadius: isUser ? "18px 4px 18px 18px" : 0,
                    border: "none",
                    boxShadow: isUser ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                    alignSelf: isUser ? "flex-end" : "flex-start"
                  }}>
                    {msg.text}
                    {isTyping && !isUser && isLast && (
                      <span style={{
                        marginLeft: 2, animation: "blink 1s infinite",
                        color: wecarColors.primary
                      }}>|</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            display: "flex", borderTop: `1px solid ${wecarColors.light}`,
            padding: "12px", background: "#fff", gap: "8px"
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Tapez votre message ici..."
              disabled={isTyping}
              style={{
                flex: 1, border: `1px solid ${wecarColors.light}`, outline: "none",
                padding: "10px 16px", borderRadius: "24px", fontSize: "14px",
                background: "#f8f9fa", transition: "all 0.3s ease"
              }}
              onFocus={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = wecarColors.primary;
              }}
              onBlur={e => {
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.borderColor = wecarColors.light;
              }}
              aria-label="Message"
            />
            <button
              onClick={sendMessage}
              disabled={isTyping || !input.trim()}
              title="Envoyer"
              style={{
                border: "none", background: wecarColors.gradient, color: "#fff",
                padding: "10px", cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",
                borderRadius: "50%", width: "40px", height: "40px",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: isTyping || !input.trim() ? 0.6 : 1,
                fontSize: "14px", transition: "all 0.3s ease"
              }}
              aria-label="Envoyer"
            >
              {isTyping ? "..." : "->"}
            </button>
          </div>
        </section>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 480px) {
          #chat-container { width: 90% !important; right: 5% !important; height: 55vh !important; }
        }
      `}</style>
    </>
  );
}