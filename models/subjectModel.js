import pool from '../db.js';

export const createSubject = async (name) => {
  const [result] = await pool.query(
    'INSERT INTO subjects (name) VALUES (?)',
    [name]
  );
  return result.insertId;
};

export const getAllSubjects = async () => {
  const [rows] = await pool.query('SELECT * FROM subjects');
  return rows;
};

export const deleteSubject = async (id) => {
  await pool.query('DELETE FROM subjects WHERE id = ?', [id]);
};