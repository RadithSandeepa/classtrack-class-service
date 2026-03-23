import * as scheduleModel from '../models/scheduleModel.js';

export const createSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can create schedules' });
    }

    const { classId, entries } = req.body;

    // entries = [{ day, order, subjectId }]

    for (const entry of entries) {
      await scheduleModel.addScheduleEntry(
        classId,
        entry.day,
        entry.order,
        entry.subjectId
      );
    }

    res.status(201).json({ message: 'Schedule created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const schedule = await scheduleModel.getScheduleByClass(req.params.classId);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};