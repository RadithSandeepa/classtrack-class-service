import * as attendanceModel from '../models/attendanceModel.js';
import * as classModel from '../models/classModel.js';

export const markAttendance = async (req, res) => {
  try {
    const { classId, studentId, date, status } = req.body;

    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can mark attendance' });
    }

    const classData = await classModel.getClassById(classId);

    // critical validation
    if (classData.teacher_id !== req.user.userId) {
      return res.status(403).json({ message: 'You are not assigned to this class' });
    }

    await attendanceModel.markAttendance(
      studentId,
      classId,
      date,
      status,
      req.user.userId
    );

    res.json({ message: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { classId, date } = req.query;

    const data = await attendanceModel.getAttendanceByClassAndDate(classId, date);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};