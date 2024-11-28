import Donation from "../../models/donation.model.js";
import { getPaymentByProjectIdDtoInSchema } from "../../validations/paymentValidation/getPaymentByProjectIdValidation.js";

const loadPaymentsByProjectId = async (req, res) => {
  try {
    const { error, value } = getPaymentByProjectIdDtoInSchema.validate(
      req.query,
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { projectId } = value;

    const payments = await Donation.find({ project_id: projectId });

    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for the given project." });
    }

    res.status(200).json({
      message: `${payments.length} payment(s) found.`,
      payments,
    });
  } catch (error) {
    console.error("Error in loadPaymentsByProjectId:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default loadPaymentsByProjectId;
