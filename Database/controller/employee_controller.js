import Employee from "../models/employee.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const getEmployee = (req, res, next) => {
  Employee.find({}, 'userName employeeName') 
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      res.status(500).json({ error }); 
    });
};

const addEmployee = async (req, res, next) => {
  try {
    const { otp, otpExpiry } = generateOTP();

    // Encrypt the OTP
    const saltRounds = 10;
    const encryptedOtp = await bcrypt.hash(otp, saltRounds);

    const employee = new Employee({
      employeeId: req.body.employeeId,
      userName: req.body.userName,
      employeeName: req.body.employeeName,
      passwordHash: req.body.passwordHash,
      otp: encryptedOtp,
      otpExpiry: otp,
      firstLogin: req.body.firstLogin,
    });

    const savedEmployee = await employee.save();

    // Send OTP to employee's email
    await sendOtpEmail(req.body.userName, otp);

    res.status(200).json({ response: savedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restPassword = async (req, res, next) => {
  const { otp, otpExpiry } = generateOTP();

  // Encrypt the OTP
  const saltRounds = 10;
  const encryptedOtp = await bcrypt.hash(otp, saltRounds);

  const email = req.body.email;
  console.log(email)

  try{
    const updatedEmployee = await Employee.findOneAndUpdate(
      { userName: email },
      { otp: encryptedOtp, otpExpiry: otpExpiry, firstLogin: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
  
    // Send OTP to employee's email
    await sendOtpEmail(req.body.email, otp);
  
    res.status(200).json({ response: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateOTP = () =>{
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return {otp, otpExpiry}
};

const sendOtpEmail = async (email, otp) => {
  // Create a test account using Ethereal
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter using the test account
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Admin" <admin@example.com>',
    to: email,
    subject: "Your OTP for Account Setup",
    text: `Your OTP is: ${otp}. It will expire in 7 days.`,
    html: `<b>Your OTP is: ${otp}</b><p>It will expire in 7 days.</p>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const deleteUser = async (req, res, next) => {
  const email = req.body.email;
  try {
    const deletedUser = await Employee.findOneAndDelete({ userName: email });
    res.status(200).json({ response: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export default { getEmployee, addEmployee, restPassword, deleteUser };
