// src/app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://moroccovehicles.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tarifs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/assistance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const featuresRoutes = [
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/features/overview`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/vehicles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/clients`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/contracts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/luxury-cars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/luxury-contracts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/black-list`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/calendrier`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/maintenance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/features/assurance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogsRoutes = [
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blogs/assurance-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/black-list-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/calendrier-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/clients-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/contracts-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/finances-rentabilite-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/login-security-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/luxury-cars-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/luxury-contracts-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/maintenance-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/overview-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/vehicles-power-gestionair-flotte-automobile-moins-chere`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // ── SEO Landing Pages ──────────────────────────────────────────────────────
  const seoRoutes = [
    // Original SEO page
    { url: `${baseUrl}/location-voiture-maroc-7-euro-sans-livraison`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    // City-specific landing pages
    { url: `${baseUrl}/location-voiture-casablanca-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/location-voiture-marrakech-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/location-voiture-agadir-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/location-voiture-rabat-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/location-voiture-tanger-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/location-voiture-fes-pas-cher`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    // Thematic landing pages
    { url: `${baseUrl}/louer-voiture-maroc-sans-frais-livraison`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/voiture-electrique-location-maroc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  return [...staticRoutes, ...featuresRoutes, ...blogsRoutes, ...seoRoutes];
}