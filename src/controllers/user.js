const HttpError = require('../models/HttpError');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

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

  sendEmail({
    email: user.email,
    subject: "You're account has been created!",
    message: 'Colby has created an account for you at RollCall.'
  });

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

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: true, data: 'No user exists with that id.' });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return next(new HttpError('Unable to retrieve data', 500));
  }
};

exports.updateById = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  } catch (error) {
    return next(new HttpError('Unable to perform operation', 500));
  }

  if (!existingUser) {
    return next(new HttpError('That user does not exist', 404));
  }

  return res.status(200).json({ success: true, data: existingUser });
};

exports.deleteById = async (req, res, next) => {
  try {
    const existingUser = await User.findByIdAndDelete(req.params.id);
    if (!existingUser) {
      return next(new HttpError('That user does not exist.', 404));
    }
    return res.json({ success: true, data: {} });
  } catch (error) {
    return next(new HttpError('Unable to perform operation', 500));
  }
};
