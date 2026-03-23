import * as classModel from '../models/classModel.js';

export const createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create classes' });
    }

    const classId = await classModel.createClass(name, teacherId);

    res.status(201).json({ message: 'Class created', classId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await classModel.getAllClasses();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update classes' });
    }

    await classModel.updateClass(req.params.id, name, teacherId);

    res.json({ message: 'Class updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteClass = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete classes' });
    }

    await classModel.deleteClass(req.params.id);

    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};