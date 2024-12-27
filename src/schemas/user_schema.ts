import Joi from "joi";

export const validateUser: Joi.ObjectSchema = Joi.object({
  first_name: Joi.string().min(3).max(20).required().messages({
    'string.min': "nombre debe tener al menos 3 caracteres"
  }),
  last_name: Joi.string().min(3).max(25).required().messages({
    'string.min': "apellido debe tener al menos 3 caracteres"
  }),
  sex: Joi.string().valid("x", "male", "female").required(),
  date_of_birth: Joi.date().iso().required(),
  email: Joi.string().email().required().messages({
    'string.email': "porfavor ingrese un email valido"
  }),
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(/[A-Z]/)
    .pattern(/\d/)
    .required().messages({
      'string.min': "la contraseña debe tener al menos 8 caracteres",
      'string.pattern.base': "la contraseña debe tener al menos una mayuscula y minuscula"
    }),
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