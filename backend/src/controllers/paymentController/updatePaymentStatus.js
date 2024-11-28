import Donation from "../../models/donation.model.js";
import { updatePaymentStatusDtoInSchema } from "../../validations/paymentValidation/updatePaymentStatusValidation.js"; // Ensure correct path
import { PaymentIdFromQuerySchema } from "../../validations/paymentValidation/paymentValidation.js"; // Ensure correct path

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.query;
    const updates = req.body;

    const { error: paymentIdError } = PaymentIdFromQuerySchema.validate(
      { paymentId },
      { abortEarly: false }
    );

    if (paymentIdError) {
      return res.status(400).json({
        message: "Invalid payment ID.",
        errors: paymentIdError.details.map((err) => err.message),
      });
    }

    const { error, value } = updatePaymentStatusDtoInSchema.validate(updates, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors in the updates.",
        errors: error.details.map((err) => err.message),
      });
    }

    const updatedPayment = await Donation.findByIdAndUpdate(paymentId, value, {
      new: true,
      runValidators: true,
    });

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({
      message: "Payment updated successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error in updatePaymentStatus:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default updatePaymentStatus;
