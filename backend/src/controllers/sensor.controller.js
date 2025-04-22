// src/controllers/sensor.controller.js
import {
    createSensor,
    getAllSensors,
    getSensorById,
    updateSensor,
    deleteSensor
  } from '../models/sensor.model.js';
  
  export const create = async (req, res) => {
    try {
      const sensor = await createSensor(req.body);
      res.status(201).json(sensor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear el sensor' });
    }
  };
  
  export const findAll = async (req, res) => {
    try {
      const sensors = await getAllSensors();
      res.json(sensors);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los sensores' });
    }
  };
  
  export const findOne = async (req, res) => {
    try {
      const sensor = await getSensorById(req.params.id);
      if (!sensor) return res.status(404).json({ error: 'Sensor no encontrado' });
      res.json(sensor);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar el sensor' });
    }
  };
  
  export const update = async (req, res) => {
    try {
      const updated = await updateSensor(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el sensor' });
    }
  };
  
  export const remove = async (req, res) => {
    try {
      const deleted = await deleteSensor(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el sensor' });
    }
  };
  