module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Méthode non autorisée"
    });
  }

  return res.status(200).json({
    success: true,
    message: "IPN OK"
  });
};
