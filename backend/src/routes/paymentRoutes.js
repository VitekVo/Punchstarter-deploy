import express from "express";
import logger from "../services/logger.js"; // import logger

import createPayment from "../controllers/paymentController/createPayment.js";
import getPaymentByProjectId from "../controllers/paymentController/getPaymentByProjectId.js";
import getPaymentByUserId from "../controllers/paymentController/getPaymentByUserId.js";

const router = express.Router();

// Vytvoření platby
router.post("/", (req, res, next) => {
    logger.info("Payment creation initiated");
    next();
}, createPayment);

// Získání plateb podle ID projektu
router.get("/project/:projectId", (req, res, next) => {
    logger.info("Fetching payments for project", { projectId: req.params.projectId});
    next();
}, getPaymentByProjectId);

// Získání plateb podle ID uživatele
router.get("/user/:userId", (req, res, next) => {
    logger.info("Fetching payments for user", { userId: req.params.userId });
    next();
}, getPaymentByUserId);

export default router;
