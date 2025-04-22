// src/controllers/event.controller.js
import {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent
  } from '../models/event.model.js';
  
  export const create = async (req, res) => {
    try {
      const event = await createEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear el evento' });
    }
  };
  
  export const findAll = async (req, res) => {
    try {
      const events = await getAllEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los eventos' });
    }
  };
  
  export const findOne = async (req, res) => {
    try {
      const event = await getEventById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar el evento' });
    }
  };
  
  export const remove = async (req, res) => {
    try {
      const deleted = await deleteEvent(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el evento' });
    }
  };
  