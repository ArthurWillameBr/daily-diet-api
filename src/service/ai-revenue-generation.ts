import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { env } from "@/env";
import { z } from "zod";

export class AiRevenueGeneration {
  private model = groq("llama-3.1-70b-versatile");

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("API key for Groq is not defined.");
    }
    createGroq({
      apiKey: env.GROQ_API_KEY,
    });
  }

  async reportGeneration() {
    const diets = [
      "vegetariana",
      "vegana",
      "sem glúten",
      "cetogênica",
      "paleo",
    ];
    const cuisines = [
      "italiana",
      "japonesa",
      "mexicana",
      "indiana",
      "mediterrânea",
    ];
    const randomDiet = diets[Math.floor(Math.random() * diets.length)];
    const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];

    const dynamicPrompt = `Gere uma receita saudável e diversificada. Considere a culinária ${randomCuisine} e a dieta ${randomDiet}. 
      Evite ingredientes comuns e garanta criatividade. Certifique-se de não repetir ingredientes frequentemente usados.
      **Responda em pt-BR.**`;

    const result = await generateObject({
      model: this.model,
      temperature: 1,
      topK: 50,
      topP: 0.9,
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({
              name: z.string(),
              amount: z.string(),
            })
          ),
          steps: z.array(z.string()),
        }),
      }),
      prompt: dynamicPrompt,
    });
    return result.object.recipe;
  }
}
