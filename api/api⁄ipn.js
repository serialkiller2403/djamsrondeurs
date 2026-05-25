export default async function handler(req, res) {

  // Autoriser seulement POST
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Méthode non autorisée",
    });
  }

  try {

    // Données envoyées par PayDunya
    const data = req.body;

    console.log("IPN reçu :", data);

    // Exemple :
    // vérifier si paiement validé

    if (data.status === "completed") {

      console.log("Paiement confirmé");

      // TODO:
      // enregistrer commande
      // envoyer email
      // vider panier
    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
}