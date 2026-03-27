import Joi from "joi";
export const historySchema = Joi.object({
  userId: Joi.string().required(),
  movieId: Joi.string().required()
});

export default historySchema;
