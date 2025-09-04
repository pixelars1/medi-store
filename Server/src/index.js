import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import app from './app.js';
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(process.env.PORT || 3000 , () => console.log(`server is listening on Port : ${process.env.PORT || 3000}`));

export default app;
