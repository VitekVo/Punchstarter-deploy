import Joi from 'joi';

// Validace pro sledování projektu
export const followProjectDtoInSchema = Joi.object({
    userId: Joi.string().required(),
    projectId: Joi.string().required(),
});

// Validace výstupu pro sledování projektu
export const followProjectDtoOutSchema = Joi.object({
    message: Joi.string().required(),
    followedAt: Joi.string().required(),
});
