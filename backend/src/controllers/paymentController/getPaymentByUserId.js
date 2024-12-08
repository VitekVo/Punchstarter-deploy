import Donation from "../../models/donation.model.js";
import { getPaymentByUserIdDtoInSchema } from "../../validations/paymentValidation/getPaymentByUserIdValidation.js";
import mongoose from "mongoose";

const loadPaymentsByUserId = async (req, res) => {
  try {
    const { error, value } = getPaymentByUserIdDtoInSchema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { userId } = value;

    const payments = await Donation.find({ user_id: new mongoose.Types.ObjectId(userId) });

      if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for the given user." });
    }

    res.status(200).json({
      message: `${payments.length} payment(s) found.`,
      payments,
    });
  } catch (error) {
      console.error("Error in loadPaymentsByUserId:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default loadPaymentsByUserId;
