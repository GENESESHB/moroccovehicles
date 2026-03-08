export const metadata = {
  title: 'Mentions Légales - MoroccoVehicles',
  description: 'Mentions légales de la plateforme MoroccoVehicles.',
};

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
      <p className="text-lg text-gray-700">
        La plateforme MoroccoVehicles est éditée par MoroccoVehicles SARL, située à Casablanca, Maroc.
        <br /><br />
        Hébergement : Conforme aux réglementations marocaines (CNDP).
        <br /><br />
        Directeur de la publication : Équipe MoroccoVehicles.
      </p>
    </div>
  );
}
