const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);

module.exports = router;
