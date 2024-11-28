import Joi from "joi";

export const PaymentIdFromQuerySchema = Joi.object({
  paymentId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "Payment ID must be a valid MongoDB ObjectId.",
      "any.required": "Payment ID is required.",
    }),
});
