//load dependencies
import express from "express";
import { getHomePage } from "../controllers/publicRoutesControllers.js";

//create public router

const publicRouter = express.Router();

//make routes
//get home page
publicRouter.get("/", getHomePage);

export default publicRouter;
