import * as subjectModel from '../models/subjectModel.js';

export const createSubject = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create subjects' });
    }

    const { name } = req.body;

    const subjectId = await subjectModel.createSubject(name);

    res.status(201).json({ message: 'Subject created', subjectId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectModel.getAllSubjects();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};