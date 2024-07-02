const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const activityController = require("../activity_controller");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);

//activities
router.get("/getActivities", activityController.getActivities);

module.exports = router;
