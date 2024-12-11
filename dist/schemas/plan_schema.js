"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validatePlan = joi_1.default.object({
    age: joi_1.default.number().min(14).required().messages({
        "number.min": "No deberías ir al gim siendo menor de 15 años",
    }),
    weight: joi_1.default.number().min(20).max(250).required().messages({
        "number.min": "El peso mínimo son 20kg",
        "number.max": "El peso máximo son 250kg",
    }),
    height: joi_1.default.number()
        .min(0.6)
        .max(2.6)
        .required()
        .messages({
        "number.min": "La altura mínima es 0.6m",
        "number.max": "La altura máxima es 2.6m",
    }),
    daysOfTraining: joi_1.default.number().min(1).max(7).required().messages({
        "number.min": "La cantidad de dias mínima es 1",
        "number.max": "La cantidad de dias máxima es 7",
    }),
    goal: joi_1.default.string()
        .required()
        .messages({
        'string.empty': "Seleccione una opción"
    }),
    trainingTime: joi_1.default.string().valid("1/2h-1h", "1h-3/2h", "3/2h-2h", "+2h").messages({
        'string.empty': "Seleccione una opción"
    }),
    sex: joi_1.default.string().valid("masculino", "femenino", "no especificado").messages({
        'string.empty': "Seleccione una opción"
    }),
});
exports.default = validatePlan;
