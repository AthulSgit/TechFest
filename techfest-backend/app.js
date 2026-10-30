const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registrations");

const logger = require("./middleware/logger");
const sanitize = require("./middleware/sanitize");
const originGuard = require("./middleware/originGuard");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean).map((origin) => origin.replace(/\/$/, ""));

app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true
}));

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(sanitize);
app.use(originGuard);
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "TechFest 2026 Backend is running"
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;