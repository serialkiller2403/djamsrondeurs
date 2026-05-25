export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Méthode non autorisée",
    });
  }

  try {

    const data = req.body;

    console.log("IPN reçu :", data);

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
    });
  }
}