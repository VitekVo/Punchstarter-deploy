import Joi from 'joi';

// Validace pro získání uživatele podle ID
export const getUserByIdDtoInSchema = Joi.object({
    userId: Joi.string().required(),
});

// Validace výstupu pro získaného uživatele
export const getUserByIdDtoOutSchema = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    followingProjects: Joi.array().items(Joi.string()),
    contributions: Joi.array().items(Joi.string()),
});
