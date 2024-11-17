import { AiReportService } from "./ai-report";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { env } from "@/env";

export class AiService implements AiReportService {
  private model = groq("llama-3.1-70b-versatile");

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("API key for Groq is not defined.");
    }
    createGroq({
      apiKey: env.GROQ_API_KEY,
    });
  }

  async generateDietReport(data: {
    meals: {
      dateTime: string;
      name: string;
      description: string;
      isOnDiet: boolean;
    }[];
  }): Promise<string> {
    const content = `
            Gere um relatório detalhado sobre a dieta do usuário com base nas refeições fornecidas.
            As refeições estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{NOME}-{DESCRIÇÃO}-{IS_ON_DIET}.
            São elas:
            ${data.meals
              .map(
                (meal) =>
                  `${meal.dateTime}-${meal.name}-${
                    meal.description || "Sem descrição"
                  }-${meal.isOnDiet ? "Dentro da Dieta" : "Fora da Dieta"}`
              )
              .join(";")}
        `;

    const result = await generateText({
      model: this.model,
      messages: [
        {
          role: "system",
          content:
            "Você é um renomado especialista em nutrição e dietas. Seu objetivo é fornecer conselhos detalhados e úteis para ajudar as pessoas a manter uma alimentação saudável e balanceada.",
        },
        {
          role: "user",
          content,
        },
      ],
    });

    return result.text;
  }
}
