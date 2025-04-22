// src/models/user.model.js
import pool from '../db.js';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, created_at FROM users');
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async ({ name, email, password }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, password]
  );
  return result.rows[0];
};

export const updateUser = async (id, { name, email }) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
    [name, email, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
