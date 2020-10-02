require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const dbConnect = require('./utils/db');

const app = express();
dbConnect();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

module.exports = app;
