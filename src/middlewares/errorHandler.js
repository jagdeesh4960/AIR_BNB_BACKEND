const logger = require("../utils/logger.js");

const errorHandler = async (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.method} - ${
      req.originalUrl
    } - ${req.ip}`
  );

  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal server error" });
};

module.exports = errorHandler;
