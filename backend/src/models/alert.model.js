// src/models/alert.model.js
import pool from '../db.js';

export const createAlert = async ({ title, description, severity, source_ip, destination_ip, status }) => {
  const result = await pool.query(
    `INSERT INTO alerts (title, description, severity, source_ip, destination_ip, status) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, severity, source_ip, destination_ip, status]
  );
  return result.rows[0];
};

export const getAllAlerts = async () => {
  const result = await pool.query('SELECT * FROM alerts ORDER BY timestamp DESC');
  return result.rows;
};

export const getAlertById = async (id) => {
  const result = await pool.query('SELECT * FROM alerts WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateAlertStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE alerts SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

export const deleteAlert = async (id) => {
  const result = await pool.query('DELETE FROM alerts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
