import express from 'express';
import cors from 'cors';
import classRoutes from './routes/classRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import { swaggerDocs } from "./config/swagger.js";

const app = express();
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
swaggerDocs(app);

app.use('/classes', classRoutes);
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/attendance', attendanceRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Class Service running on port ${PORT}`);
})
