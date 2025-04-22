// src/routes/sensor.routes.js
import express from 'express';
import {
  create,
  findAll,
  findOne,
  update,
  remove
} from '../controllers/sensor.controller.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
