const Employee = require('../models/Employee');
const HttpError = require('../models/HttpError');

exports.create = async (req, res, next) => {
  const { firstName, lastName, hiredAt } = req.body;

  if (!firstName || !lastName) {
    return next(new HttpError('Please enter a first and last name', 401));
  }

  const employee = new Employee({ firstName, lastName, hiredAt });

  try {
    await employee.save();
  } catch (error) {
    return next(new HttpError('Unable to save user', 500));
  }

  return res.status(201).json({ success: true, data: employee });
};

exports.getAll = async (req, res, next) => {};

exports.getById = async (req, res, next) => {};

exports.updateById = async (req, res, next) => {};

exports.deleteById = async (req, res, next) => {};
