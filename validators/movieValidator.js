import Joi from "joi";
export const movieSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.array().items(Joi.string()).required(),
  language: Joi.string().required(),
  duration: Joi.number().required(),
  cast: Joi.array().items(Joi.string()).required(),
  releaseYear: Joi.number().required()
});

export default movieSchema;
