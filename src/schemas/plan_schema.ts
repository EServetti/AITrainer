import Joi from "joi";

const validatePlan: Joi.ObjectSchema = Joi.object({
  age: Joi.number().min(14).required().messages({
    "number.min": "No deberías ir al gim siendo menor de 15 años",
  }),
  weight: Joi.number().min(20).max(250).required().messages({
    "number.min": "El peso mínimo son 20kg",
    "number.max": "El peso máximo son 250kg",
  }),
  height: Joi.number()
    .min(0.6)
    .max(2.6)
    .required()
    .messages({
      "number.min": "La altura mínima es 0.6m",
      "number.max": "La altura máxima es 2.6m",
    }),
  daysOfTraining: Joi.number().min(1).max(7).required().messages({
    "number.min": "La cantidad de dias mínima es 1",
    "number.max": "La cantidad de dias máxima es 7",
  }),
  goal: Joi.string()
    .valid("perder peso", "ganar músculo", "mantenerse")
    .required()
    .messages({
      "any.only": "Porfavor seleccione entre perder peso, ganar músculo y mantenerse",
      'string.empty': "Seleccione una opción"
    }),
});

export default validatePlan;
