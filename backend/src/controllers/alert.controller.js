// src/controllers/alert.controller.js
import {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlertStatus,
    deleteAlert
  } from '../models/alert.model.js';
  
  export const create = async (req, res) => {
    try {
      const alert = await createAlert(req.body);
      res.status(201).json(alert);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear la alerta' });
    }
  };
  
  export const findAll = async (req, res) => {
    try {
      const alerts = await getAllAlerts();
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las alertas' });
    }
  };
  
  export const findOne = async (req, res) => {
    try {
      const alert = await getAlertById(req.params.id);
      if (!alert) return res.status(404).json({ error: 'Alerta no encontrada' });
      res.json(alert);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar la alerta' });
    }
  };
  
  export const updateStatus = async (req, res) => {
    try {
      const updated = await updateAlertStatus(req.params.id, req.body.status);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el estado de la alerta' });
    }
  };
  
  export const remove = async (req, res) => {
    try {
      const deleted = await deleteAlert(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar la alerta' });
    }
  };
  