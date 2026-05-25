import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cart, total } = req.body;

  try {
    const response = await axios.post(
      "https://app.paydunya.com/api/v1/checkout-invoice/create",
      {
        invoice: {
          total_amount: total,
          description: "Commande DJAM'S RONDEURS"
        }
      },
      {
        headers: {
          "PAYDUNYA-MASTER-KEY": process.env.MASTER_KEY,
          "PAYDUNYA-PRIVATE-KEY": process.env.PRIVATE_KEY,
          "PAYDUNYA-PUBLIC-KEY": process.env.PUBLIC_KEY,
          "PAYDUNYA-TOKEN": process.env.TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({
      success: true,
      url: response.data.response_text
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
}
