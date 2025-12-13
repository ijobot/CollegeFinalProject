// Middleware to help diagnose problems as we move throughout the application.
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = logger;
