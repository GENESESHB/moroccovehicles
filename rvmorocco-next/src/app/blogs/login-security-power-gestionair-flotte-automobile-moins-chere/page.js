import Head from "next/head";
import LoginSecurityBlogSection from "@/app/features/login-security/BlogSection";
import Link from "next/link";

export const metadata = {
  title: "Sécurisez votre agence : Gestion des accès et connexion | Smart Car Location",
  description: "Protégez vos données sensibles avec une architecture de connexion imperméable et un portail de configuration avancé.",
  keywords: "gestionair flotte automobile moins chere, blog, login security"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: "80px", backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "20px 20px 0" }}>
          <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3b82f6", textDecoration: "none", fontWeight: "bold", marginBottom: "10px", transition: "all 0.3s" }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <LoginSecurityBlogSection />
    </div>
  );
}
