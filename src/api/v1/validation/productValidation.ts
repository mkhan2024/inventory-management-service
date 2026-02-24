import Joi from "joi";

// product validation schemas (for routes)

export const productSchemas = {

  create: {
    body: Joi.object({
      name: Joi.string().min(2).max(80).required(),
      sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required(), // ABC1234 format
      quantity: Joi.number().integer().min(0).required(),
      price: Joi.number().positive().precision(2).required(),
      category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").required(),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },

  update: {
    params: Joi.object({ id: Joi.string().required() }),
    body: Joi.object({
      name: Joi.string().min(2).max(80),
      quantity: Joi.number().integer().min(0),
      price: Joi.number().positive().precision(2),
      category: Joi.string().valid("electronics", "clothing", "food", "tools", "other"),
      // sku not allowed to change
    }),
  },

  delete: {
    params: Joi.object({ id: Joi.string().required() }),
  },

  list: {}, // no validation needed
};