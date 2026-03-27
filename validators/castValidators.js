import Joi from "joi";
export const castSchema = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().optional(),
  bio: Joi.string().allow(""),
  image: Joi.string().uri().allow("")
});

export default castSchema;