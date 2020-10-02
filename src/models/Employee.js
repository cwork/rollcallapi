const mongoose = require('mongoose');

const occurrenceSchema = new mongoose.Schema({
  dateOf: {
    type: Date,
    default: Date.now
  },
  isCovered: {
    type: Boolean,
    default: false
  },
  note: {
    type: String,
    default: 'Unspecified absence'
  }
});

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hiredAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  occurrences: [occurenceSchema]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
