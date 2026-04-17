import Head from "next/head";
import FinancesRentabiliteBlogSection from "@/app/features/finances-rentabilite/BlogSection";
import Link from "next/link";

export const metadata = {
  title: "Rentabilité maximale : Simuler et calculer vos revenus | Smart Car Location",
  description: "Utilisez notre calculateur de revenus intégré pour projeter votre bilan trimestriel et maximiser les marges de votre parc.",
  keywords: "gestionair flotte automobile moins chere, blog, finances rentabilite"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: "80px", backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "20px 20px 0" }}>
          <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3b82f6", textDecoration: "none", fontWeight: "bold", marginBottom: "10px", transition: "all 0.3s" }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <FinancesRentabiliteBlogSection />
    </div>
  );
}
