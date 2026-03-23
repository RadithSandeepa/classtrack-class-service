import pool from '../db.js';

export const createStudent = async (name, classId) => {
  const [result] = await pool.query(
    'INSERT INTO students (name, class_id) VALUES (?, ?)',
    [name, classId]
  );
  return result.insertId;
};

export const getStudentsByClass = async (classId) => {
  const [rows] = await pool.query(
    'SELECT * FROM students WHERE class_id = ?',
    [classId]
  );
  return rows;
};

export const getStudentById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM students WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE id = ?', [id]);
};