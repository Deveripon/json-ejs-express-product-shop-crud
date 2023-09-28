//load dependencies
import express from "express";
import {
    createStudent,
    deleteStudent,
    getAllStudent,
    updateStudent,
    getSingleStudent,
} from "../controllers/studentRoutesControllers.js";
import { ageCheckMiddleware } from "../middlewares/ageCheckMiddleware.js";
import { studentPhotoUpload } from "../utils/multerUploader.js";
import { getDasboard, getHomePage } from "../controllers/ejsStudentPageControllers.js";
const studentRouter = express.Router();

//ejs page routes
studentRouter.get("/", getHomePage);
studentRouter.get("/dashboard", getDasboard);

//API ROUTERS FOR STUDENT DATA CRUD
//make student router
//get all students
studentRouter.get("/", getAllStudent);
//get single student
studentRouter.get("/:id", getSingleStudent);

//create a new student
studentRouter.post("/", studentPhotoUpload, ageCheckMiddleware, createStudent);
//update a student data
studentRouter.put("/:id", studentPhotoUpload, updateStudent);
//delete student data
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;
