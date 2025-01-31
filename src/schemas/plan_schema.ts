import Joi from "joi";

const validatePlan: Joi.ObjectSchema = Joi.object({
  age: Joi.number().min(14).required().messages({
    "number.min": "No deberías ir al gim siendo menor de 15 años",
  }),
  weight: Joi.number().min(20).max(250).required().messages({
    "number.min": "El peso mínimo son 20kg",
    "number.max": "El peso máximo son 250kg",
  }),
  height: Joi.number().min(60).max(260).required().messages({
    "number.min": "La altura mínima es 60cm",
    "number.max": "La altura máxima es 260cm",
  }),
  daysOfTraining: Joi.number().min(1).max(7).required().messages({
    "number.min": "La cantidad de dias mínima es 1",
    "number.max": "La cantidad de dias máxima es 7",
  }),
  goal: Joi.string().required().max(150).messages({
    "string.empty": "Seleccione una opción",
  }),
  trainingTime: Joi.string()
    .valid("1/2h-1h", "1h-3/2h", "3/2h-2h", "+2h")
    .messages({
      "string.empty": "Seleccione una opción",
    }),
  sex: Joi.string().valid("masculino", "femenino", "x").messages({
    "string.empty": "Seleccione una opción",
  }),
  extra: Joi.string().max(150).allow(""),
  bodyType: Joi.string().valid("mesomorfo", "ectomorfo", "endomorfo").messages({
    "string.empty": "Seleccione una opción",
  }),
  difficulty: Joi.string().valid("facil", "dificil", "medio").required()
});

export default validatePlan;
