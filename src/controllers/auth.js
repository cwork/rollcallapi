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
    const token = user.generateAuthToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
    return res
      .status(200)
      .cookie('token', token, options)
      .json({ success: true, token: token, role: user.role });
  } catch (error) {
    return next(new HttpError(error));
  }
};

exports.logout = async (req, res, next) => {};
