require('dotenv').config();
const mongoose = require('mongoose');
require('./db')();
const User = require('../models/User');

const createUser = async () => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      console.log('Default user has already been created.');
      process.exit();
    }
    const user = new User({
      username: process.env.APP_DEFAULT_USER,
      email: process.env.APP_DEFAULT_EMAIL,
      password: process.env.APP_DEFAULT_PASSWORD,
      role: process.env.APP_DEFAULT_ROLE
    });
    await user.save();
    console.log('Default user has been saved!');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const destroyDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    await conn.connection.dropDatabase();
    console.log('Database has been dropped successfully.');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === 'init') createUser();
if (process.argv[2] === 'destroy') destroyDatabase();
