import express from 'express';
import {
  crearConsultaHandler,
  listarConsultasHandler,
  listarConsultasPorUsuarioHandler,
  actualizarConsultaHandler,
  listarConsultasPorUsuarioPaginadasHandler,
  listarConsultasPaginadasHandler
} from '../controllers/consulta.controller.js';

const router = express.Router();

router.get('/', listarConsultasHandler);
router.get('/usuario/:id', listarConsultasPorUsuarioHandler);
router.post('/', crearConsultaHandler);
router.put('/:id', actualizarConsultaHandler);
router.get('/paginadas', listarConsultasPaginadasHandler);
router.get('/usuario/:id/paginadas', listarConsultasPorUsuarioPaginadasHandler);



export default router;
