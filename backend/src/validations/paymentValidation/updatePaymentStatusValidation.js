import Joi from "joi";

export const updatePaymentStatusDtoInSchema = Joi.object({
  paymentStatus: Joi.string().required(),
});
