"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = exports.validateUserData = exports.password = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUser = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(20).required().messages({
        'string.min': "nombre debe tener al menos 3 caracteres"
    }),
    last_name: joi_1.default.string().min(3).max(25).required().messages({
        'string.min': "apellido debe tener al menos 3 caracteres"
    }),
    sex: joi_1.default.string().valid("x", "male", "female").required(),
    date_of_birth: joi_1.default.date().iso().required(),
    email: joi_1.default.string().email().required().messages({
        'string.email': "porfavor ingrese un email valido"
    }),
    password: joi_1.default.string()
        .min(8)
        .max(15)
        .pattern(/[A-Z]/)
        .pattern(/\d/)
        .required().messages({
        'string.min': "la contraseña debe tener al menos 8 caracteres",
        'string.pattern.base': "la contraseña debe tener al menos una mayuscula y minuscula"
    }),
    verified: joi_1.default.boolean(),
    role: joi_1.default.string().valid("USER", "ADMIN"),
    photo: joi_1.default.string().uri()
});
exports.password = joi_1.default.object({
    token: joi_1.default.string(),
    password: joi_1.default.string()
        .min(8)
        .max(15)
        .pattern(/[A-Z]/)
        .pattern(/\d/)
        .required(),
});
exports.validateUserData = joi_1.default.object({
    user_id: joi_1.default.number().required(),
    weight: joi_1.default.number().min(20).max(250).required().messages({
        "number.min": "El peso mínimo son 20kg",
        "number.max": "El peso máximo son 250kg",
    }),
    height: joi_1.default.number().min(60).max(260).required().messages({
        "number.min": "La altura mínima es 60cm",
        "number.max": "La altura máxima es 260cm",
    }),
    goal: joi_1.default.string().required().max(150).messages({
        "string.empty": "Seleccione una opción",
    }),
    bodyType: joi_1.default.string().valid("mesomorfo", "ectomorfo", "endomorfo").messages({
        "string.empty": "Seleccione una opción",
    }),
    difficulty: joi_1.default.string().valid("facil", "dificil", "medio").required()
});
exports.updateUserData = joi_1.default.object({
    user_id: joi_1.default.number().required(),
    weight: joi_1.default.number()
        .min(20)
        .max(250)
        .optional()
        .messages({
        "number.min": "El peso mínimo son 20kg",
        "number.max": "El peso máximo son 250kg",
    }),
    height: joi_1.default.number()
        .min(60)
        .max(260)
        .optional()
        .messages({
        "number.min": "La altura mínima es 60cm",
        "number.max": "La altura máxima es 260cm",
    }),
    goal: joi_1.default.string()
        .max(150)
        .optional()
        .messages({
        "string.empty": "Seleccione una opción",
    }),
    bodyType: joi_1.default.string()
        .valid("mesomorfo", "ectomorfo", "endomorfo")
        .optional()
        .messages({
        "string.empty": "Seleccione una opción",
    }),
    difficulty: joi_1.default.string()
        .valid("facil", "dificil", "medio")
        .optional(),
});
