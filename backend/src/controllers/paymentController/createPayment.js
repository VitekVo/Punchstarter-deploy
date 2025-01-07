import Donation from "../../models/donation.model.js";
import { createPaymentdtoInSchema } from "../../validations/paymentValidation/createPaymentValidation.js";
import logger from "../../services/logger.js";
import Project from "../../models/project.model.js";

const createPayment = async (req, res) => {
  try {
    const { error, value } = createPaymentdtoInSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in createPayment', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        details: error.details.map((err) => err.message),
      });
    }

    if (!res.locals.user) {
      logger.warn('Unauthorized access attempt', { user: res.locals.user });
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const { projectId, amount } = value;

    // Najít projekt
    const project = await Project.findById(projectId);
    if (!project) {
      logger.warn('Project not found', { projectId });
      return res.status(404).json({ message: 'Project not found' });
    }

    const newPayment = new Donation({
      user_id: res.locals.user._id,
      project_id: projectId,
      amount
    });

    const savedPayment = await newPayment.save();
    project.followCount += 1;
    await project.save();
    logger.info(`Payment created successfully for user ${res.locals.user._id}`, { payment: savedPayment });

    res.status(201).json({
      message: "Payment created successfully.",
      payment: savedPayment,
    });
  } catch (error) {
    logger.error("Error in createPayment:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createPayment;