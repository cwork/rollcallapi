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

exports.getAll = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    return res.json({ success: true, data: employees });
  } catch (error) {
    return next(new HttpError('Unable to retrieve data', 500));
  }
};

exports.getById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }
    return res.json({ success: true, data: employee });
  } catch (error) {
    return next(new HttpError('Unable to retrieve employee', 500));
  }
};

exports.updateById = async (req, res, next) => {
  let employee;
  try {
    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }
    return res.json({ success: true, data: employee });
  } catch (error) {
    return next(new HttpError('Unable to perform operation', 500));
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }
    return res.json({ success: true, data: {} });
  } catch (error) {
    return next(new HttpError('Unable to perform operation', 500));
  }
};
