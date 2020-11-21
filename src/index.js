require('dotenv').config({ path: '.env' });

const express = require('express');
const helmet = require('helmet');
const userRouter = require('./routers/user');
const reminderRouter = require('./routers/reminder');
const cors = require('cors');

const port = process.env.PORT;
const app = express();

/**
 * Initialize MongoDB
 */
require('./db/mongoose');

/**
 * API Settings
 */
app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Routers
 */
app.use('/api/user', userRouter);
app.use('/api/reminder', reminderRouter);
app.get('/api/check', (req, res) => res.status(200).send({ message: 'All good', code: 200 }));
app.get('*', (req, res) => {
    res.status(404).send({ error: 'Operation not found' });
});

/**
 * Initialize API
 */
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});