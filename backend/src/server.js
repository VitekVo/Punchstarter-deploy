import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Donation from "./models/donation.model.js"; // Cesta k vašemu modelu
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { checkUser } from "./services/authService.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./services/swaggerService.js";
import passport from "passport";
import logger from "./services/logger.js";

const app = express();
mongoose.set("strictQuery", false);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://punchstarter-deploy.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });
logger.info(`Base URL: ${process.env.BASE_URL}`);

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use("*", checkUser);

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/comments", commentRoutes);
app.use("/payments", paymentRoutes);
app.use("/auth", googleAuthRoutes);
// Basic endpoint to verify app is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const start = async () => {
  try {
    // Připojení k databázi
    await mongoose.connect(CONNECTION);
    logger.info("MongoDB Connected");

    // Server start
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      logger.info(`Swagger documentation is at ${PORT}/api-docs`);
    });
  } catch (e) {
    logger.error(`Error during application startup: ${e.message}`);
  }
};

start();
