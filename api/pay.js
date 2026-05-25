const paydunya = require("paydunya");

const setup = new paydunya.Setup({
  masterKey: process.env.PAYDUNYA_MASTER_KEY,
  privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
  publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
  token: process.env.PAYDUNYA_TOKEN,
  mode: "test"
});

const store = new paydunya.Store({
  name: "DjamsRondeurs",
  tagline: "Boutique officielle",
  phoneNumber: "770000000",
  postalAddress: "Dakar",
  websiteURL: "https://djamsrondeurs-9xzt.vercel.app"
});

module.exports = async (req, res) => {

  try {

    const invoice = new paydunya.CheckoutInvoice(setup, store);

    invoice.addItem(
      "Commande boutique",
      1,
      5000,
      5000
    );

    invoice.totalAmount = 5000;

    invoice.returnURL =
      "https://djamsrondeurs-9xzt.vercel.app/success.html";

    invoice.cancelURL =
      "https://djamsrondeurs-9xzt.vercel.app/cancel.html";

    const response = await invoice.create();

    return res.status(200).json({
      url: invoice.invoice_url
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error: "Erreur paiement"
    });
  }
};