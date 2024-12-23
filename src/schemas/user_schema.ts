import Joi from "joi";

export const validateUser: Joi.ObjectSchema = Joi.object({
  first_name: Joi.string().min(3).max(20).required(),
  last_name: Joi.string().min(3).max(25).required(),
  sex: Joi.string().valid("x", "male", "female").required(),
  date_of_birth: Joi.date().iso().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(/[A-Z]/)
    .pattern(/\d/)
    .required(),
  verified: Joi.boolean(),
  role: Joi.string().valid("USER","ADMIN"),
  photo: Joi.string().uri()
});

export const password : Joi.ObjectSchema = Joi.object({
  token: Joi.string(),
  password: Joi.string()
  .min(8)
  .max(15)
  .pattern(/[A-Z]/)
  .pattern(/\d/)
  .required(),
})