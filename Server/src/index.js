import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import app from './app.js';
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
