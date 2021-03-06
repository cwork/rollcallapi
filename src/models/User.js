const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('./HttpError');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email must be in valid format'
    ]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 11);
  }
  next();
});

userSchema.statics.findByCredentials = async (identifier, password) => {
  const errorMessage = 'Invalid credentials';
  const user =
    (await User.findOne({ email: identifier }, '+password')) ||
    (await User.findOne({ username: identifier }, '+password'));
  if (!user) {
    throw new HttpError(errorMessage, 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);

  if (!isMatch) {
    throw new HttpError(errorMessage, 401);
  }

  return user;
};

userSchema.methods.generateAuthToken = function () {
  console.log(process.env.JWT_EXPIRES);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
