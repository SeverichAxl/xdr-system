// src/models/event.model.js
import pool from '../db.js';

export const createEvent = async ({ type, description, source_ip, destination_ip, severity, related_alert_id }) => {
  const result = await pool.query(
    `INSERT INTO events (type, description, source_ip, destination_ip, severity, related_alert_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [type, description, source_ip, destination_ip, severity, related_alert_id]
  );
  return result.rows[0];
};

export const getAllEvents = async () => {
  const result = await pool.query('SELECT * FROM events ORDER BY timestamp DESC');
  return result.rows;
};

export const getEventById = async (id) => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

export const deleteEvent = async (id) => {
  const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
