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
    employeeId: req.body.employeeid,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash,
    employeeName: req.body.employeeName,
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
