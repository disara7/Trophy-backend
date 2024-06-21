const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const employeeSchema = new Schema({
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date,
  },
  firstLogin: {
    type: Boolean, default: true
  },
  employeeName: {
    type: String,
  },
});

employeeSchema.methods.compareOTP = async function(otp) {
  const isOtpValid = await (otp === this.otp);
  return isOtpValid && this.otpExpiry > new Date();
};

employeeSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// employeeSchema.pre('save', async function(next) {
//   //Hash password
//   if (this.isModified('passwordHash')) {
//     const salt = await bcrypt.genSalt(10);
//     this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//   }
//   //Hash otp
//   if (this.isModified('otp')) {
//     const salt = await bcrypt.genSalt(10);
//     this.otp = await bcrypt.hash(this.otp, salt);
//   }

//   next();
// });

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
