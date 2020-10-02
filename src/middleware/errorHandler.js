const errorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({ success: false, message: error.message });
};

module.exports = errorHandler;
