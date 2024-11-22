import Joi from 'joi';

const loadProjectsDtoInQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional().default(10)
});

export default loadProjectsDtoInQuerySchema;