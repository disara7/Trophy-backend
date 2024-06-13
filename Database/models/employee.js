const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    type: String, unique: true, required: true
  },
  userName: {
    type: String,
  },
  otp: { 
    type: String, required: true 
  },
  otpExpiry: { 
    type: Date, required: true 
  },
  firstLogin: { 
    type: Boolean, default: true 
  },
  passwordHash: {
    type: String,
  },
  employeeName: {
    type: String,
  },
});

employeeSchema.methods.compareOTP = function(otp) {
  return otp === this.otp && this.otpExpiry > new Date();
};

employeeSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
