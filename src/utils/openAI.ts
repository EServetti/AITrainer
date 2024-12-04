import OpenAI from "openai";
import { ChatCompletion } from "openai/resources";
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

async function getPlanFromGPT(
  weight: number,
  height: number,
  daysOfTraining: number,
  age: number,
  goal: string,
  trainingTime: string,
  sex: string,
  bodyPart: string
): Promise<string | null> {
  try {
    const prompt: string = `Necesito que me devuelvas una rutina semanal de gimnasio personalizada teniendo en cuenta los siguientes datos del usuario:
    - Edad: ${age}
    - Peso (kg): ${weight}
    - Sexo: ${sex}
    - Altura (m): ${height}
    - Días de entrenamiento: ${daysOfTraining}
    - Objetivo corporal: ${goal}
    - Tiempo de entrenamiento diario: ${trainingTime}
    - Principal parte del cuerpo a mejorar (no te centres solamente en esta parte): ${bodyPart}
    
    Ten en cuenta lo siguiente para generar la rutina:
    - Si el tiempo de entrenamiento es "1/2h-1h", la rutina debe incluir 6 ejercicios por día con combinaciones de ejercicios compuestos e isolados.
    - Si el tiempo de entrenamiento es "1h-3/2h", la rutina debe incluir 8 ejercicios de tres series c/u por día con combinaciones de ejercicios compuestos e isolados.
    - Si el tiempo de entrenamiento es "3/2h-2h", la rutina debe incluir 8 ejercicios por día con combinaciones de ejercicios compuestos e isolados.
    - Si el tiempo de entrenamiento es "+2h", la rutina debe incluir al menos 10 ejercicios por día y puede incorporar superseries, ejercicios de alta intensidad o mayor volumen.
    - No debe haber texto adicional ni líneas de código en la respuesta.

    Necesito que la respuesta sea en el siguiente formato:
    - Un array principal que contenga los días de entrenamiento.
    - Cada día de entrenamiento debe ser un objeto con la siguiente estructura:
    {
      "day": "Día 1",
      "exercises": [
        { "name": "Press de banca", "series": "4 series", "repetitions": "10-12 repeticiones" }
      ]
    }
`;

    ;
    const response = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content:
            "Eres un entrenador personal virtual, capaz de crear entrenamientos personalizados.",
        },
        { role: "user", content: prompt },
      ],
    });
    const plan = response.choices[0].message.content;
    if (typeof plan === "string") {
      const arrayOfPlans = JSON.parse(plan)
      return arrayOfPlans
    } else {
      const error = new Error("Error getting the plan")
      throw error
    }
  } catch (error) {
    throw error;
  }
}

export default getPlanFromGPT