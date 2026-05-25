import axios from "axios";

export default async function handler(req, res) {

  // Autoriser uniquement POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {

    const { total, customer } = req.body;

    // Vérification montant
    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        error: "Montant invalide"
      });
    }

    // Requête PayDunya
    const response = await axios.post(
  "https://app.paydunya.com/api/v1/checkout-invoice/create",
  {
    store: {
      name: "DJAM'S RONDEURS",
      tagline: "Votre silhouette est notre préoccupation",
      website_url: "https://djamsrondeurs.vercel.app"
    },
    invoice: {
      total_amount: Number(total),
      description: "Commande DJAM'S RONDEURS"
    },
    customer: {
      fullname: customer.fullname,
      email: customer.email,
      phone_number: customer.phone
    }
  },
  {
    headers: {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": process.env.MASTER_KEY,
      "PAYDUNYA-PRIVATE-KEY": process.env.PRIVATE_KEY,
      "PAYDUNYA-PUBLIC-KEY": process.env.PUBLIC_KEY,
      "PAYDUNYA-TOKEN": process.env.TOKEN
    }
  }
);

    console.log("PAYDUNYA RESPONSE:", response.data);

    // URL paiement
    return res.status(200).json({
      success: true,
      url: response.data.response_text
    });

  } catch (error) {

    console.log(
      "PAYDUNYA ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
}
