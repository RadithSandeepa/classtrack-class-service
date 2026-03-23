import pool from '../db.js';

export const createClass = async (name, teacherId) => {
  const [result] = await pool.query(
    'INSERT INTO classes (name, teacher_id) VALUES (?, ?)',
    [name, teacherId]
  );
  return result.insertId;
};

export const getAllClasses = async () => {
  const [rows] = await pool.query('SELECT * FROM classes');
  return rows;
};

export const getClassById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM classes WHERE id = ?', [id]);
  return rows[0];
};

export const updateClass = async (id, name, teacherId) => {
  await pool.query(
    'UPDATE classes SET name = ?, teacher_id = ? WHERE id = ?',
    [name, teacherId, id]
  );
};

export const deleteClass = async (id) => {
  await pool.query('DELETE FROM classes WHERE id = ?', [id]);
};