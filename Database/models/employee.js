import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';


const employeeSchema = new Schema({
  employeeId: {
    type: String,
    unique: true,
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
  profileUrl: {
    type: String,
    default: ''
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  NIC:{
    type: String,
  },
  bday:{
    type: Date,
  }
});

employeeSchema.pre('save', function(next) {
  if (!this.employeeId) {
    this.employeeId = this._id.toString();
  }
  next();
});

employeeSchema.methods.compareOTP = async function(otp) {
  const isOtpValid = await bcrypt.compare(otp, this.otp);
  return isOtpValid && this.otpExpiry > new Date();
};

employeeSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
