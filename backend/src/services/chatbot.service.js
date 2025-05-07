import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config.js";

export class ChatbotService {
  constructor() {
    if (!config.gemini.API_KEY) {
      throw new Error("GEMINI_API_KEY no está configurado");
    }

    this.genAI = new GoogleGenerativeAI(config.gemini.API_KEY);
    this.model = config.gemini.MODEL || "gemini-pro";
  }

  async generateResponse(prompt) {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error(
        `Error al generar respuesta con Gemini: ${error.message}`,
      );
    }
  }
}

export default new ChatbotService();
