const Employee = require("../models/employee");

const getEmployee = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const addEmployee = (req, res, next) => {
  const employee = new Employee({
    employeeId: req.body.employeeId,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash,
    employeeName: req.body.employeeName,
    otp: req.body.otp,
    otpExpiry: req.body.otpExpiry,
    firstLogin: req.body.firstLogin,
  });
  employee
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getEmployee = getEmployee;
exports.addEmployee = addEmployee;
