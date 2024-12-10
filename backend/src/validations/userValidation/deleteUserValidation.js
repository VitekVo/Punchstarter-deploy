import Joi from 'joi';

// Validace vstupu pro smazání uživatele
export const DeleteUserDtoInSchema = Joi.object({
    userId: Joi.string().required(),
});

// Validace výstupu pro smazání uživatele
export const DeleteUserDtoOutSchema = Joi.object({
    message: Joi.string().required(),
    deletedAt: Joi.string().required(),
});
