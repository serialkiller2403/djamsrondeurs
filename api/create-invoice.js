import axios from "axios";

export default function handler(req, res) {
  res.status(200).json({
    ok: true
  });
}

  const { cart, total } = req.body;

  if (!cart || !total) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const response = await axios.post(
      "https://app.paydunya.com/api/v1/checkout-invoice/create",
      {
        invoice: {
          total_amount: Number(total),
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

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
}
