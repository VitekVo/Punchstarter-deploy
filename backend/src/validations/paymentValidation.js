import Joi from 'joi';

// dtoIn,dtoOut a validační schémata
export const createPaymentdtoInSchema = Joi.object({
  userId: Joi.string().required(),
  projectId: Joi.string().required(),
  amount: Joi.number().min(10).required()
});
export const createPaymentdtoOutSchema = Joi.object({
  paymentId: Joi.string().required(),
  amount: Joi.number().required(),
  createdAt: Joi.date().iso().required()
});

// dtoIn, dtoOut schema for getting payments for user id
export const getPaymentsByUserIdDtoInSchema = Joi.object({
    userId: Joi.string().required()
  });
export const getPaymentsByUserIdDtoOutSchema = Joi.object({
    payments: Joi.array().items(
      Joi.object({
        paymentId: Joi.string().required(),
        userId: Joi.string().required(),
        amount: Joi.number().required(),
        createdAt: Joi.date().iso().required(),
        projectId: Joi.string().required(),
        paymentStatus: Joi.string().required()
      })
    ).required()
  });
// dtoIn, dtoOut schemas for getting payments for project id
export const getPaymentsByProjectIdDtoInSchema = Joi.object({
    projectId: Joi.string().required()
  });
export const getPaymentsByProjectIdDtoOutSchema = Joi.object({
    payments: Joi.array().items(
      Joi.object({
        paymentId: Joi.string().required(),
        amount: Joi.number().required(),
        createdAt: Joi.date().iso().required(),
        projectId: Joi.string().required(),
        paymentStatus: Joi.string().required()
      })
    ).required()
  });

// dtoIn,dtoOut schema for updating payment status
export const updatePaymentStatusDtoInSchema = Joi.object({
    paymentStatus: Joi.string().required()
  });
export const updatePaymentStatusDtoOutSchema = Joi.object({
amount: Joi.number().required(),
updatedAt: Joi.date().iso().required(),
paymentStatus: Joi.string().required()
});