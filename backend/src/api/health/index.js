import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('🔗 Ruta principal de API: index.routes.js');
});

export default router;
