const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const controllerCH = require("./controller/challenge_contoller")

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);
router.post("/addchallenge", controllerCH.addChallenge);

module.exports = router;
