// src/controllers/user.controller.js
import * as User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuario no encontrado' });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Campos incompletos' });
  const newUser = await User.createUser({ name, email, password });
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await User.updateUser(req.params.id, { name, email });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  await User.deleteUser(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};
