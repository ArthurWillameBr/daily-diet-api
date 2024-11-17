import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { env } from "@/env";
import { z } from "zod";

export class AiRevenueGeneration {
  private model = groq("llama3-70b-8192");

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("API key for Groq is not defined.");
    }
    createGroq({
      apiKey: env.GROQ_API_KEY,
    });
  }

  async reportGeneration() {
    const result = await generateObject({
      model: this.model,
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
      prompt:
        "Gere uma receita saudável e diversificada que considere diferentes tipos de dietas (vegetariana, vegana, sem glúten, cetogênica, paleo) e diversas culinárias ao redor do mundo (italiana, japonesa, mexicana, indiana, mediterrânea). Certifique-se de incluir uma variedade de ingredientes e métodos de preparo para evitar repetições. A receita deve ser criativa, inovadora e saborosa. **Responda sempre em pt-BR**",
    });

    console.log(result);

    return result.object.recipe;
  }
}
