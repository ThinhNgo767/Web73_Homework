const formatDate  = require("../utils/formatDate");

const logRequestTime = (req, res, next) => {
    console.log(`New req at : ${formatDate()}`);
    next();
  };

  module.exports = logRequestTime