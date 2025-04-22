import { z } from 'zod';

export const consultaSchema = z.object({
  user_id: z.number().int().positive(),
  tipo: z.string().min(1, "El tipo es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida")
});
