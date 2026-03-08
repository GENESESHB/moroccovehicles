export const metadata = {
  title: 'Demander une Démo - MoroccoVehicles',
  description: 'Demandez une démonstration gratuite du logiciel de gestion de flotte MoroccoVehicles.',
};

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Demander une Démonstration</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-lg text-center">
        Découvrez comment MoroccoVehicles peut transformer la gestion de votre parc automobile.
      </p>
      <a 
        href="/contact" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Réserver ma démo
      </a>
    </div>
  );
}
