import express from 'express';
import employeeController from './controller/employee_controller.js';
import challengeController from './controller/challenge_contoller.js';
import blogController from './controller/blog_controller.js';
import adminController from './controller/admin_controller.js';
import coinController from './controller/coin_controller.js';
import multer from 'multer';
const router = express.Router();

import activityController from './controller/activity_controller.js';
import hackathonController from './controller/hackathon_controller.js';
import sportController from './controller/sport_controller.js';

import { verifyToken } from "../authHelpers.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  })


router.get("/Activities", activityController.getActivities);
router.get("/Hackathons", hackathonController.getHackathons);
router.get("/Sports", sportController.getSports);


router.get("/empolyee", employeeController.getEmployee);
router.get("/getOtherEmployee", verifyToken, employeeController.getOtherEmployee);
router.get("/fetchMyData", verifyToken, employeeController.fetchMyData);
router.post("/uploadProfile", verifyToken, upload.single('image'), employeeController.uploadProfile);
router.post("/updateMyData", verifyToken, employeeController.updateMyData);
router.post("/addempolyee", employeeController.addEmployee);
router.post("/resetPassword", employeeController.restPassword);
router.post("/deleteempolyee", employeeController.deleteUser);
router.post("/addchallenge", challengeController.addChallenge);
router.post("/addblog",verifyToken,upload.single('image'), blogController.addBlog);
router.get("/getblog",verifyToken, blogController.getBlog);
router.get("/fetchBlogs", blogController.fetchBlogs);
router.get("/fetchAcceptedBlogs", blogController.fetchAcceptedBlogs);
router.get("/popularPosts", blogController.popularPosts);
router.delete("/deleteBlog/:articleId", blogController.deleteBlog);
router.post("/acceptBlog/:articleId", blogController.acceptBlog);
router.post("/addAdmin", adminController.addAdmin);
router.post("/getAdmin", adminController.verifyAdmin);
router.post('/verifyToken', adminController.verifyToken);
router.get('/coin', verifyToken, coinController.getCoinCount);

export default router;

