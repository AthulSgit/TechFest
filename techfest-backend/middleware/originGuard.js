const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean).map((origin) => origin.replace(/\/$/, ""));

const originGuard = (req, res, next) => {
  const methods = ["POST", "PUT", "PATCH", "DELETE"];

  if (!methods.includes(req.method)) {
    return next();
  }

  const origin = req.get("Origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      message: "Request origin not allowed"
    });
  }

  next();
};

module.exports = originGuard;