export const metadata = {
  title: 'Créer un compte - MoroccoVehicles',
  description: 'Inscrivez-vous et commencez à digitaliser la gestion de votre flotte automobile.',
};

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Créer un compte</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-lg text-center">
        Contactez notre équipe de vente pour créer votre compte et configurer votre espace agence.
      </p>
      <a 
        href="/contact" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Contactez-nous
      </a>
    </div>
  );
}
