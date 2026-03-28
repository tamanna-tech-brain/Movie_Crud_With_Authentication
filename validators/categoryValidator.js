import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  description: Joi.string().min(5).max(200).required()
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  description: Joi.string().min(5).max(200).optional()
});

export default{ updateCategorySchema, categorySchema};