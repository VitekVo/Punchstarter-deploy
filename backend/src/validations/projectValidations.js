import Joi from 'joi';

// dtoIn,dtoOut schema for creating project
export const createProjectDtoInSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    goalAmount: Joi.number().min(1000).required(),
    createdBy: Joi.string().required(),
});
export const createProjectDtoOutSchema = Joi.object({
    projectId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    goalAmount: Joi.number().required(),
    createdAt: Joi.string().isoDate().required(),
});

// dtoIn,dtoOut shcema for getting project by id
export const getProjectByIdDtoInSchema = Joi.object({
    projectId: Joi.string().required()
});
export const getProjectByIdDtoOutSchema = Joi.object({
    projectId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    goalAmount: Joi.number().required(),
    createdAt: Joi.string().isoDate().required(),
    createdBy: Joi.string().required(),
    comments: Joi.array().required()
});

// dtoin, dtoOut schema for updating project
export const updateProjectDtoInSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    goalAmount: Joi.number().min(1000).required()
});
export const updateProjectDtoOutSchema = Joi.object({
    projectId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    goalAmount: Joi.number().required(),
    updatedAt: Joi.date().iso().required()
});

// dtoin, dtoOut, schema for deleting project
export const deleteProjectDtoInSchema = Joi.object({
    projectId: Joi.string().required()
});
export const deleteProjectDtoOutSchema = Joi.object({
    message: Joi.string().required(),
    deletedAt: Joi.date().iso().required()
});

// dtoIn, dtouOut schema for adding comment to project
export const addCommentToProjectDtoInSchema = Joi.object({
    projectId: Joi.string().required(),
    commentId: Joi.string().required()
});

export const addCommentToProjectDtoOutSchema = Joi.object({
    projectId: Joi.string().required(),
    commentId: Joi.string().required(),
    addedAt: Joi.date().iso().required()
});