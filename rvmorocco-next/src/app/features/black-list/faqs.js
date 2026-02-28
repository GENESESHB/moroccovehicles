export const faqs = [
    {
        question: "La gestion d'une liste noire de clients est-elle légale au Maroc ?",
        answer: "Oui, à condition de respecter la loi 09-08 relative à la protection des données personnelles. Vous devez disposer d'un motif légitime (impayé avéré, litige, dégâts matériels) et informer vos locataires dans vos conditions générales de l'existence d'un tel traitement à des fins de sécurité de la flotte."
    },
    {
        question: "Comment le blocage automatique s'applique-t-il techniquement ?",
        answer: "Lorsqu'un client tente d'effectuer une réservation en ligne ou en agence, le système croise son numéro de CIN/Passeport, son email ou son numéro de téléphone avec la base de données Liste Noire. S'il y a correspondance, la création du contrat est informatiquement bloquée avec une alerte rouge pour l'agent."
    },
    {
        question: "Puis-je partager ma liste noire avec mes confrères loueurs de voitures ?",
        answer: "La loi encadre strictement le partage de données. Notre module permet un export sécurisé et, sous réserve d'un accord-cadre inter-agences conforme à la CNDP, un système d'alerte mutuelle peut être configuré anonymement (via des hashs de CIN par exemple) pour prévenir les escroqueries en réseau."
    },
    {
        question: "Comment sortir un client de la liste noire s'il régularise sa situation ?",
        answer: "Dès que le client règle son impayé ou résout le litige, vous pouvez changer son statut de 'Actif' à 'Résolu'. Le client est alors débloqué pour de futures réservations, mais l'historique du litige reste tracé pour votre information."
    },
    {
        question: "Peut-on être alerté si un client sur liste noire utilise le nom de son conjoint/enfant ?",
        answer: "C'est la méthode de fraude la plus courante. Notre système permet de croiser les adresses IP, les adresses postales, ou les cartes bancaires utilisées, et lève un 'flag' de niveau jaune si un lien potentiel est détecté avec une personne bannie."
    }
];
