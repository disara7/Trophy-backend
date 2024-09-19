import express from 'express';
import employeeController from './controller/employee_controller.js';
import challengeController from './controller/challenge_contoller.js';
import blogController from './controller/blog_controller.js';
import adminController from './controller/admin_controller.js';
import multer from 'multer';
const router = express.Router();

import { verifyToken } from "../authHelpers.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  })

router.get("/empolyee", employeeController.getEmployee);
router.post("/addempolyee", employeeController.addEmployee);
router.post("/resetPassword", employeeController.restPassword);
router.post("/deleteempolyee", employeeController.deleteUser);
router.post("/addchallenge", challengeController.addChallenge);
router.post("/addblog",verifyToken,upload.single('image'), blogController.addBlog);
router.get("/getblog",verifyToken, blogController.getBlog);
router.get("/fetchBlogs", blogController.fetchBlogs);
router.get("/fetchAcceptedBlogs", blogController.fetchAcceptedBlogs);
router.get("/popularPosts", blogController.popularPosts);
router.post("/addAdmin", adminController.addAdmin);
router.post("/getAdmin", adminController.verifyAdmin);
router.post('/verifyToken', adminController.verifyToken);

export default router;
