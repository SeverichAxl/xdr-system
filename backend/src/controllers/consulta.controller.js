import {
    crearConsulta,
    obtenerConsultas,
    obtenerConsultasPorUsuario,
    actualizarConsulta,
    obtenerConsultasPaginadas,
    obtenerConsultasPorUsuarioPaginadas
  } from '../models/consulta.model.js';


  import { obtenerConsultaPorId } from '../models/consulta.model.js';
  import { consultaSchema } from '../schemas/consulta.schema.js';

  export const crearConsultaHandler = async (req, res) => {
    try {
      const parsedData = consultaSchema.parse(req.body); // <-- validación
      const consulta = await crearConsulta(parsedData);
      res.status(201).json(consulta);
    } catch (error) {
      console.error(error);
  
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
  
      res.status(500).json({ error: 'Error al crear consulta' });
    }
  };
  




  
  
  export const listarConsultasHandler = async (_req, res) => {
    try {
      const consultas = await obtenerConsultas();
      res.json(consultas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las consultas' });
    }
  };
  
  export const listarConsultasPorUsuarioHandler = async (req, res) => {
    try {
      const consultas = await obtenerConsultasPorUsuario(req.params.id);
      res.json(consultas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las consultas del usuario' });
    }
  };

  export const actualizarConsultaHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { tipo, descripcion } = req.body;
  
      const consulta = await obtenerConsultaPorId(id);
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta no encontrada' });
      }
  
      if (!tipo || !descripcion) {
        return res.status(400).json({ error: 'Tipo y descripción son requeridos' });
      }
  
      const consultaActualizada = await actualizarConsulta(id, { tipo, descripcion });
      res.json(consultaActualizada);
    } catch (error) {
      console.error('Error al actualizar consulta:', error);
      res.status(500).json({ error: 'Error al actualizar consulta' });
    }
  };


  export const listarConsultasPaginadasHandler = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const consultas = await obtenerConsultasPaginadas(limit, offset);
      res.json(consultas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las consultas paginadas' });
    }
  };
  
  export const listarConsultasPorUsuarioPaginadasHandler = async (req, res) => {
    try {
      const userId = req.params.id;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const consultas = await obtenerConsultasPorUsuarioPaginadas(userId, limit, offset);
      res.json(consultas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las consultas del usuario con paginación' });
    }
  };
  
  
  