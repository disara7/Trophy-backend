const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const activityController = require("./controller/activity_controller");
const hackathonController = require("./controller/hackathon_controller");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);

router.get("/Activities", activityController.getActivities);
router.get("/Hackathons", hackathonController.getHackathons);

module.exports = router;
