const formatDate  = require("../utils/formatDate");
const {appendFile} = require("../modules/fileSystem")

const logRequestTime = (req, res, next) => {
    let request = `Method: ${req.method}, from router: ${req.path}, at ${formatDate()}\n`
    appendFile("./log/logRequest.txt",request)
    next();
  };

  module.exports = logRequestTime