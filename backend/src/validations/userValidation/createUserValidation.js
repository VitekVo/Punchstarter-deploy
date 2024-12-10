import Joi from 'joi';

// Validace vstupu pro vytvoření uživatele
export const createUserDtoInSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});

// Validace výstupu pro vytvořeného uživatele
export const createUserDtoOutSchema = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    followingProjects: Joi.array().items(Joi.string()),
    contributions: Joi.array().items(Joi.string()),
});
