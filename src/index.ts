import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Data from '../models/Data';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.post('/api/data', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newData = new Data({ name, email });
    await newData.save();
    res.json({ message: 'Data received', data: newData });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
