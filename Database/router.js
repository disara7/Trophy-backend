const express = require("express");
const router = express.Router();
const controller = require("./controller/employee_controller");
const controllerCH = require("./controller/challenge_contoller");
const controllerB = require("./controller/blog_controller");

const { verifyToken } = require("../authHelpers");

router.get("/empolyee", controller.getEmployee);
router.post("/addempolyee", controller.addEmployee);
router.post("/addchallenge", controllerCH.addChallenge);
router.post("/addblog",verifyToken, controllerB.addBlog);

module.exports = router;
