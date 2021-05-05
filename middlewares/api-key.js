function apiKey(req, res, next) {
  const apiKey = req.query["API-KEY"];

  if (apiKey === process.env.API_KEY || "API_KEY") {
    next();
  }
  res.status(401).json({
    error: "InValid API Key",
  });
}

module.exports = apiKey;
