const HttpError = require('../models/HttpError');
const User = require('../models/User');

exports.create = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser =
      (await User.findOne({ email })) || (await User.findOne({ username }));
  } catch (error) {
    return next(new HttpError('User creation failed', 500));
  }

  if (existingUser) {
    return next(new HttpError('That user already exists.', 400));
  }

  const user = new User({ username, email, password });

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError('User creation failed', 500));
  }

  return res
    .status(201)
    .json({ success: true, data: 'User created successfully' });
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ success: true, data: users });
  } catch (error) {
    return next(new HttpError('Unable to retrieve data', 500));
  }
};
