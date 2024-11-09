import Joi from 'joi';

// dtoin, dtoout schemas for creating a comment
export const createCommentDtoInSchema = Joi.object({
    projectId: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().min(1).required()
});
export const createCommentDtoOutSchema = Joi.object({
    commentId: Joi.string().required(),
    content: Joi.string().required(),
    createdAt: Joi.date().iso().required()
});

// dtoIn, dtoOut
export const getCommentsByProjectIdDtoInSchema = Joi.object({
    projectId: Joi.string().required()
});
export const getCommentsByProjectIdDtoOutSchema = Joi.object({
    comments: Joi.array().items(
        Joi.object({
            commentId: Joi.string().required(),
            content: Joi.string().required(),
            createdAt: Joi.date().iso().required(),
            userId: Joi.string().required()
        })
    ).required()
});

// dtoIn, dtoOut schema for updating comment
export const updateCommentdtoInSchema = Joi.object({
    content: Joi.string().min(1).required()
});
export const updateCommentdtoOutSchema = Joi.object({
    commentId: Joi.string().required(),
    content: Joi.string().required(),
    updatedAt: Joi.date().iso().required()
});

// dtoIn, dtoOut schema for deleting comments
export const deleteCommentdtoInSchema = Joi.object({
    commentId: Joi.string().required()
  });
export const deleteCommentdtoOutSchema = Joi.object({
    message: Joi.string().required(),
    deletedAt: Joi.date().iso().required()
  });