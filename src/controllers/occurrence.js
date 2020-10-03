const Employee = require('../models/Employee');
const HttpError = require('../models/HttpError');

exports.create = async (req, res, next) => {
  console.log(req.params.employeeId);
  const { dateOf, isCovered, note } = req.body;
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }
    employee.occurrences.push({ dateOf, isCovered, note });
    await employee.save();
    return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Unable to perform operation', 500));
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return next(new HttpError('Employee not found', 404));
    }
    return res.json({ success: true, data: employee.occurrences });
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Unable to get occurrences', 500));
  }
};

exports.getById = async (req, res, next) => {};

exports.updateById = async (req, res, next) => {};

exports.deleteById = async (req, res, next) => {};
