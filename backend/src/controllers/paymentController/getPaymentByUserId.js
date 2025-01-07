import Donation from "../../models/donation.model.js";
import { getPaymentByUserIdDtoInSchema } from "../../validations/paymentValidation/getPaymentByUserIdValidation.js";
import mongoose from "mongoose";
import logger from "../../services/logger.js";

const loadPaymentsByUserId = async (req, res) => {
  try {
    const { error, value } = getPaymentByUserIdDtoInSchema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in loadPaymentsByUserId', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { userId } = value;

    const payments = await Donation.find({ user_id: new mongoose.Types.ObjectId(userId) });

    if (!payments || payments.length === 0) {
      logger.info(`No payments found for userId: ${userId}`);
      return res
          .status(404)
          .json({ message: "No payments found for the given user." });
    }

    logger.info(`Found ${payments.length} payment(s) for userId: ${userId}`, { payments: payments });

    res.status(200).json({
      message: `${payments.length} payment(s) found.`,
      payments,
    });
  } catch (error) {
    logger.error("Error in loadPaymentsByUserId:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default loadPaymentsByUserId;
