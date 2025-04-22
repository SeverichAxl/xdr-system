// src/routes/event.routes.js
import express from 'express';
import {
  create,
  findAll,
  findOne,
  remove
} from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', findOne);
router.delete('/:id', remove);

export default router;
