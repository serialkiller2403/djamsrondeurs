export default function handler(req, res) {
  try {
    res.status(200).json({
      ok: true,
      message: "pay.js fonctionne"
    });
  } catch (error) {
    res.status(500).json({
      error: "Crash pay.js",
      detail: error.message
    });
  }
}
