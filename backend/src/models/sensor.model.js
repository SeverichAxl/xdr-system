// src/models/sensor.model.js
import pool from '../db.js';

export const createSensor = async ({ name, type, location, status }) => {
  const result = await pool.query(
    `INSERT INTO sensors (name, type, location, status)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, type, location, status]
  );
  return result.rows[0];
};

export const getAllSensors = async () => {
  const result = await pool.query('SELECT * FROM sensors ORDER BY id');
  return result.rows;
};

export const getSensorById = async (id) => {
  const result = await pool.query('SELECT * FROM sensors WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateSensor = async (id, { name, type, location, status }) => {
  const result = await pool.query(
    `UPDATE sensors SET name = $1, type = $2, location = $3, status = $4, last_active = NOW()
     WHERE id = $5 RETURNING *`,
    [name, type, location, status, id]
  );
  return result.rows[0];
};

export const deleteSensor = async (id) => {
  const result = await pool.query('DELETE FROM sensors WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
