import Joi from "joi";

export const createCommentDtoInSchema = Joi.object({
  projectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "Project ID must be a valid MongoDB ObjectId.",
      "any.required": "Project ID is required.",
    }),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/i)
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
  content: Joi.string().min(1).max(500).required().message({
    "string.min": "Content must be at least 1 character long.",
    "string.max": "Content must be at most 500 characters long.",
  }),
});
