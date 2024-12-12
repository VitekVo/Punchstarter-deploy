import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Donation from "./models/donation.model.js"; // Cesta k vašemu modelu
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { checkUser } from "./services/authService.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./services/swaggerService.js";

dotenv.config();
const app = express();
mongoose.set("strictQuery", false);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "development") {
  dotenv.config({ path: "./src/config/.env" });
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use("*", checkUser);

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/comments", commentRoutes);
app.use("/payments", paymentRoutes);

// Basic endpoint to verify app is running
app.get("/test", (req, res) => {
  res.send("API is running...");
});

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const start = async () => {
  try {
    // Připojení k databázi
    await mongoose.connect(CONNECTION);
    console.log("MongoDB Connected");

    // Server start
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`Swagger documentation is at ${PORT}/api-docs`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
