import Joi from "joi";
export const downloadSchema = {
  params: Joi.object({
    movieId: Joi.string().required().messages({
      "string.empty": "Movie ID is required",
      "any.required": "Movie ID is required"
    })
  })
};
export default downloadSchema;
