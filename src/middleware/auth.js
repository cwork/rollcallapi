const jwt = require('jsonwebtoken');
const HttpError = require('../models/HttpError');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new HttpError('Not authorized to acces this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new HttpError('Not authorized to access thsi route', 401));
    }
    next();
  } catch (error) {
    return next(new HttpError('Not authorized to access this route', 401));
  }
};
