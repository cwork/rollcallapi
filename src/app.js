require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const dbConnect = require('./utils/db');
const userRouter = require('./routers/user');
const errorHandler = require('./middleware/errorHandler');

const app = express();
dbConnect();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use('/api/user', userRouter);
app.use(errorHandler);

module.exports = app;
