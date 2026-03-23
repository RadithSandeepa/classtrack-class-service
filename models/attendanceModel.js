import pool from '../db.js';

export const markAttendance = async (studentId, classId, date, status, teacherId) => {
  await pool.query(
    `INSERT INTO attendance (student_id, class_id, date, status, marked_by)
     VALUES (?, ?, ?, ?, ?)`,
    [studentId, classId, date, status, teacherId]
  );
};

export const getAttendanceByClassAndDate = async (classId, date) => {
  const [rows] = await pool.query(
    `SELECT a.*, s.name AS student_name
     FROM attendance a
     JOIN students s ON a.student_id = s.id
     WHERE a.class_id = ? AND a.date = ?`,
    [classId, date]
  );
  return rows;
};