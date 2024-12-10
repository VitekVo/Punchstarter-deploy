import Joi from "joi";

export const CommentIdFromQuerySchema = Joi.object({
  commentId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "Comment ID must be a valid MongoDB ObjectId.",
      "any.required": "Comment ID is required.",
    }),
});

export const projectIdFromQuerySchema = Joi.object({
    projectId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/i)
        .required()
        .messages({
            "string.pattern.base": "Project Id must be a valid MongoDB ObjectId.",
            "any.required": "Project ID is required.",
        }),
});

