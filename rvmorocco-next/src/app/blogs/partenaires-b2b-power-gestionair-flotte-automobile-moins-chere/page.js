import Head from "next/head";
import PartenairesB2bBlogSection from "@/app/features/partenaires-b2b/BlogSection";
import Link from "next/link";

export const metadata = {
  title: "Développer votre réseau : Le portail partenaire B2B | Smart Car Location",
  description: "Automatisez la création de nouveaux partenariats et élargissez votre flotte grâce au formulaire d'acquisition web B2B.",
  keywords: "gestionair flotte automobile moins chere, blog, partenaires b2b"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: "80px", backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "20px 20px 0" }}>
          <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3b82f6", textDecoration: "none", fontWeight: "bold", marginBottom: "10px", transition: "all 0.3s" }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <PartenairesB2bBlogSection />
    </div>
  );
}
