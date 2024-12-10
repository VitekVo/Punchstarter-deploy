import Joi from 'joi';

// Validace vstupu pro aktualizaci uživatele
export const updateUserDtoInSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    password: Joi.string().min(6).optional(),
});

// Validace výstupu pro aktualizovaného uživatele
export const updateUserDtoOutSchema = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    followingProjects: Joi.array().items(Joi.string()),
    contributions: Joi.array().items(Joi.string()),
});
