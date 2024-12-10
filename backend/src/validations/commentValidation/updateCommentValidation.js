import Joi from "joi";

export const updateCommentDtoInSchema = Joi.object({
  comment: Joi.string().min(1).max(500).required().messages({
    "string.min": "Content must be at least 1 character long.",
    "string.max": "Content must be at most 500 characters long.",
  }),
});
