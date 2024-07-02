const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const activityController = require("./controller/activity_controller");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);

router.get("/activities", activityController.getActivities);

module.exports = router;
