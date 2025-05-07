import { z } from "zod";

export const ChatbotSchema = z.object({
  message: z.string().min(1, "Mensaje requerido"),
});
