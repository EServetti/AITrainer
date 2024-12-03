"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPEN_AI_KEY
});
function getPlanFromGPT(weight, height, daysOfTraining, age, goal, trainingTime, sex, bodyPart) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = `Necesito que me devuelvas una rutina semanal de gimnasio personalizada teniendo en cuenta los siguientes datos del usuario:
    - Edad: ${age}
    - Peso (kg): ${weight}
    - Sexo: ${sex}
    - Altura (m): ${height}
    - Días de entrenamiento: ${daysOfTraining}
    - Objetivo corporal: ${goal}
    - Tiempo de entrenamiento: ${trainingTime}
    - Principal parte del cuerpo a mejorar (no te centres solamente en esta parte): ${bodyPart}
    Necesito que la respuesta sea en el siguiente formato sin lineas de codigo ni texto extra:
    - Un array principal que contenga los días de entrenamiento.
    - Cada día de entrenamiento debe tener al menos 6 ejercicios.
    - Cada día de entrenamiento debe ser un objeto con la siguiente estructura:
  {
    "day": "Día 1",
    "exercises": [
      { "name": "Press de banca", "series": "4 series", "repetitions": "10-12 repeticiones" }
    ]
  }
`;
            ;
            const response = yield openai.chat.completions.create({
                model: "chatgpt-4o-latest",
                messages: [
                    {
                        role: "system",
                        content: "Eres un entrenador personal virtual, capaz de crear entrenamientos personalizados.",
                    },
                    { role: "user", content: prompt },
                ],
            });
            const plan = response.choices[0].message.content;
            if (typeof plan === "string") {
                const arrayOfPlans = JSON.parse(plan);
                return arrayOfPlans;
            }
            else {
                const error = new Error("Error getting the plan");
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = getPlanFromGPT;