import Joi from "joi";

export const getPaymentByUserIdDtoInSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
});
