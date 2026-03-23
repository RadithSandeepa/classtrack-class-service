import express from 'express';
import classRoutes from './routes/classRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use('/classes', classRoutes);
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/attendance', attendanceRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Class Service running on port ${PORT}`);
})
