import pool from '../db.js';

export const crearConsulta = async ({ user_id, tipo, descripcion }) => {
  const query = `
    INSERT INTO consultas (user_id, tipo, descripcion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [user_id, tipo, descripcion];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const obtenerConsultas = async () => {
  const result = await pool.query('SELECT * FROM consultas ORDER BY fecha_consulta DESC');
  return result.rows;
};

export const obtenerConsultaPorId = async (id) => {
    const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
    return result.rows[0];
  };
  

export const obtenerConsultasPorUsuario = async (userId) => {
  const query = 'SELECT * FROM consultas WHERE user_id = $1 ORDER BY fecha_consulta DESC';
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const obtenerConsultasPaginadas = async (limit, offset) => {
    const result = await pool.query(
      'SELECT * FROM consultas ORDER BY fecha_consulta DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  };
  
  export const obtenerConsultasPorUsuarioPaginadas = async (userId, limit, offset) => {
    const result = await pool.query(
      'SELECT * FROM consultas WHERE user_id = $1 ORDER BY fecha_consulta DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );
    return result.rows;
  };
  





export const actualizarConsulta = async (id, { tipo, descripcion }) => {
    const query = `
      UPDATE consultas
      SET tipo = $1, descripcion = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [tipo, descripcion, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
