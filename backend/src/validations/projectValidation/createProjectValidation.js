import Joi from 'joi';

// dtoIn,dtoOut schema for creating project
export const createProjectDtoInSchema =  Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "Title must be a string.",
            "string.empty": "Title is required.",
            "string.min": "Title must be at least 3 characters long.",
            "string.max": "Title must be at most 100 characters long."
        }),
    description: Joi.string()
        .min(10)
        .max(1000)
        .optional()
        .messages({
            "string.base": "Description must be a string.",
            "string.empty": "Description is required.",
            "string.min": "Description must be at least 10 characters long.",
            "string.max": "Description must be at most 1000 characters long."
        }),
    goalAmount: Joi.number()
        .min(1000)
        .max(10000000)
        .required()
        .messages({
            "number.base": "Goal amount must be a number.",
            "number.min": "Goal amount must be at least 1000.",
            "number.max": "Goal amount must be at most 10,000,000."
        }),
    deadline: Joi.date()
        .greater('now')
        .required()
        .messages({
            "date.base": "Deadline must be a valid date.",
            "date.greater": "Deadline must be in the future.",
            "any.required": "Deadline is required."
        }),
    creatorId: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required()
        .messages({
            "string.pattern.base": "CreatorId must be a valid MongoDB ObjectId.",
            "any.required": "CreatorId is required."
        }),
    category: Joi.string()
        .optional()
        .messages({
            "string.base": "Category must be a string."
        }),
    images: Joi.array()
        .items(Joi.binary())
        .optional()
        .messages({
            "array.base": "Images must be an array of binary data."
        })
});
