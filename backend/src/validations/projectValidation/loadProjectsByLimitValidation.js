import Joi from 'joi';

const loadProjectsDtoInQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional().default(10),
    query: Joi.string().min(1).max(69).optional()
});

export default loadProjectsDtoInQuerySchema;