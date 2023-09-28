//load dependencies
import express from "express";
import {
    showAllProductPage,
    showProductAddPage,
    showSingleProductPage,
    showProductEditPage,
} from "../controllers/ejsProductPageControllers.js";

//create router
const productRouter = express.Router();

//ejs page routes
productRouter.get("/", showAllProductPage);
productRouter.get("/add-new", showProductAddPage);
productRouter.get("/edit/:slug", showProductEditPage);
productRouter.get("/single/:slug", showSingleProductPage);

export default productRouter;
