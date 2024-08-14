import express from 'express';
import employeeController from './controller/employee_controller.js';
import challengeController from './controller/challenge_contoller.js';
import blogController from './controller/blog_controller.js';
import adminController from './controller/admin_controller.js';
const router = express.Router();

import { verifyToken } from "../authHelpers.js";

router.get("/empolyee", employeeController.getEmployee);
router.post("/addempolyee", employeeController.addEmployee);
router.post("/resetPassword", employeeController.restPassword);
router.post("/deleteempolyee", employeeController.deleteUser);
router.post("/addchallenge", challengeController.addChallenge);
router.post("/addblog",verifyToken, blogController.addBlog);
router.get("/getblog",verifyToken, blogController.getBlog);
router.get("/fetchBlogs", blogController.fetchBlogs);
router.post("/addAdmin", adminController.addAdmin);
router.post("/getAdmin", adminController.verifyAdmin);
router.post('/verifyToken', adminController.verifyToken);

export default router;
