const User = require('../models/User');
const HttpError = require('../models/HttpError');

exports.login = async (req, res, next) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return next(
      new HttpError('Email or Username, and Password are required', 401)
    );
  }
  try {
    const user = await User.findByCredentials(identifier, password);
    return res.json({ success: true, data: user.generateAuthToken() });
  } catch (error) {
    return next(new HttpError(error));
  }
};

exports.logout = async (req, res, next) => {};
