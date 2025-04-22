// src/routes/alert.routes.js
import express from 'express';
import {
  create,
  findAll,
  findOne,
  updateStatus,
  remove
} from '../controllers/alert.controller.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', findOne);
router.put('/:id/status', updateStatus);
router.delete('/:id', remove);

export default router;
