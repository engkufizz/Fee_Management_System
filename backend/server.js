const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Fee = require('./models/Fee');

const app = express();
const PORT = 3002;

// Add CORS configuration
app.use(cors({
  origin: '*',  // Be careful with this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// Database sync
sequelize.sync().then(() => {
  console.log('Database connected and synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

// Routes
app.get('/api/getStudents', async (req, res) => {
  try {
    const feeType = req.query.feeType;
    const students = await Fee.findAll({
      where: { feeType }
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/addStudent', async (req, res) => {
  try {
    const student = await Fee.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/updateStudent', async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    await Fee.update(updateData, {
      where: { id }
    });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/student/:id', async (req, res) => {
  try {
    await Fee.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/resetStudents', async (req, res) => {
  try {
    const feeType = req.query.feeType;
    await Fee.destroy({
      where: { feeType }
    });
    res.json({ message: 'Reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  const networkInterfaces = require('os').networkInterfaces();
  const addresses = [];
  for (const k in networkInterfaces) {
    for (const k2 in networkInterfaces[k]) {
      const address = networkInterfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  console.log(`Server is running on port ${PORT}`);
  console.log('You can access the server at:');
  addresses.forEach(addr => {
    console.log(`http://${addr}:${PORT}`);
  });
});