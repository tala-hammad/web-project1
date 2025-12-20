const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/api/data', (req, res) => {
    res.json({ data: 'Your data here' });
});

app.post('/api/data', (req, res) => {
    const { body } = req;
    res.json({ message: 'Data received', data: body });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;