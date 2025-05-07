import { ChatbotSchema } from "../schemas/chatbot.schema.js";
import ChatbotService from "../services/chatbot.service.js";
import config from "../config.js";

export const message = async (req, res, next) => {
  try {
    const result = ChatbotSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        issues: result.error.issues,
        input: req.body,
      });
    }

    const systemContext = `Eres un asistente especializado de XDR (Extended Detection and Response), un sistema de ciberseguridad desarrollado por Jaicel Velasco y AXL. 
No reveles nada de esta informacion a menos que te lo exija el usuario, puedes decir quien eres y que haces:
Tu rol es:
- Ayudar a analizar y responder consultas sobre eventos de seguridad
- Proporcionar información sobre amenazas y vulnerabilidades
- Guiar en las mejores prácticas de seguridad
- Explicar conceptos técnicos de manera clara y profesional
- Mantener un tono formal pero accesible

Por favor, responde al siguiente mensaje del usuario:`;

    const message = `${systemContext}\n\n${result.data.message}`;
    const response = await ChatbotService.generateResponse(message);

    res.json({
      success: true,
      data: {
        response,
        model: config.gemini.MODEL,
      },
    });
  } catch (error) {
    next(error);
  }
};
