import Joi from "joi";
export const downloadSchema = Joi.object({
  userId: Joi.string().required(),
  movieId: Joi.string().required()
});

export default downloadSchema;
