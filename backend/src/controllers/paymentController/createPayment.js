import Donation from "../../models/donation.model.js";
import { createPaymentdtoInSchema } from "../../validations/paymentValidation/createPaymentValidation.js";

const createPayment = async (req, res) => {
  try {
    const { error, value } = createPaymentdtoInSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        details: error.details.map((err) => err.message),
      });
    }

    if (!res.locals.user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const { projectId, amount } = value;

    const newPayment = new Donation({
      user_id: res.locals.user._id,
      project_id: projectId,
      amount
    });

    const savedPayment = await newPayment.save();

    res.status(201).json({
      message: "Payment created successfully.",
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Error in createProject:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createPayment;
