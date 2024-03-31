import Joi from "joi";

// Define Joi validation schema
const formFieldsSchema = Joi.object({
  type: Joi.string()
    .valid("text", "dropdown", "date", "number", "radio", "checkbox")
    .required(),
}).unknown(false);

export default formFieldsSchema;
