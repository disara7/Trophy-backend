const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    type: String,
  },
  userName: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  employeeName: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
