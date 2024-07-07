const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const activityController = require("./controller/activity_controller");
const hackathonController = require("./controller/hackathon_controller");
const sportController = require("./controller/sport_controller");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);

router.get("/Activities", activityController.getActivities);
router.get("/Hackathons", hackathonController.getHackathons);
router.get("/Sports", sportController.getSports);

module.exports = router;
