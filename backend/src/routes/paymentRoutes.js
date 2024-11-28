import express from "express";

import createPayment from "../controllers/paymentController/createPayment.js";
import getPaymentByProjectId from "../controllers/paymentController/getPaymentByProjectId.js";
import getPaymentByUserId from "../controllers/paymentController/getPaymentByUserId.js";
import updatePaymentStatus from "../controllers/paymentController/updatePaymentStatus.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/project/:projectId", getPaymentByProjectId);
router.get("/user/:userId", getPaymentByUserId);
router.put("/:paymentId", updatePaymentStatus);

export default router;
