import Joi from 'joi';

export const ApiKeyRequestSchema = Joi.object({

    firstName: Joi
        .string()
        .required()
        .min(3)
        .max(128),

    lastName: Joi
        .string()
        .required()
        .min(3)
        .max(128),

    company: Joi
        .string()
        .optional()
        .max(256),

    email: Joi
        .string()
        .required()
        .email()
})
