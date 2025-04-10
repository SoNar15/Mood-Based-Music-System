import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import photoRoutes from './routes/photoRoutes.js';
import songRoutes from './routes/songRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', photoRoutes);
app.use('/api', songRoutes);
app.use('/api', pageRoutes);

app.get('/', (req, res) => {
  res.send('🎧 MOODYYY Backend Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
