import Joi from "joi";

export const createPaymentdtoInSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
  projectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "Project ID must be a valid MongoDB ObjectId.",
      "any.required": "Project ID is required.",
    }),
  amount: Joi.number().min(10).max(50000).required().messages({
    "number.base": "Payment must be a number.",
    "number.min": "Payment must be at least 10.",
    "number.min": "Payment can not exceed 50 000.",
  }),
});
