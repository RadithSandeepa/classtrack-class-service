import pool from '../db.js';

export const addScheduleEntry = async (classId, day, order, subjectId) => {
  await pool.query(
    `INSERT INTO schedules (class_id, day_of_week, subject_order, subject_id)
     VALUES (?, ?, ?, ?)`,
    [classId, day, order, subjectId]
  );
};

export const getScheduleByClass = async (classId) => {
  const [rows] = await pool.query(
    `SELECT s.*, sub.name AS subject_name
     FROM schedules s
     JOIN subjects sub ON s.subject_id = sub.id
     WHERE s.class_id = ?
     ORDER BY day_of_week, subject_order`,
    [classId]
  );
  return rows;
};

export const deleteScheduleByClass = async (classId) => {
  await pool.query('DELETE FROM schedules WHERE class_id = ?', [classId]);
};