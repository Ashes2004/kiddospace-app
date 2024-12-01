import express from 'express';
import connectDB from './DB/connectMongodb.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
