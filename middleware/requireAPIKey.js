const requireAPIKey = (req, res, next) => {
    const apiKey = "MindX-Teachers"
    const { key } = req.query;
  
    if (key === apiKey && key) {
      next();
    } else {
      res.json({
        message: "API key is not existence!",
      });
    }
  };

  module.exports = requireAPIKey