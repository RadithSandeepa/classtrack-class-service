import * as studentModel from '../models/studentModel.js';

export const createStudent = async (req, res) => {
  try {
    const { name, classId } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create students' });
    }

    const studentId = await studentModel.createStudent(name, classId);

    res.status(201).json({ message: 'Student created', studentId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const students = await studentModel.getStudentsByClass(req.params.classId);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};