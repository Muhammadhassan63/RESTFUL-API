const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// import authorize from "./Middleware/mode.js"

// Connect to MongoDB database

mongoose.connect('mongodb://127.0.0.1:27017/sci-lab').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});


// Set up middleware
app.use(express.json());

// Set up routes
const experimentsRouter = require('./routes/experiments');
app.use('/experiments', experimentsRouter);

const scientistsRouter = require('./routes/scientists');
app.use('/scientists', scientistsRouter);

// Set up error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000.'));
