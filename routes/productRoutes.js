//load dependencies
import express from "express";
import {
    showAllProductPage,
    showProductAddPage,
    showSingleProductPage,
    showProductEditPage,
    createProduct,
} from "../controllers/ejsProductPageControllers.js";
import { productPhotoUpload } from "../utils/multerUploader.js";

//create router
const productRouter = express.Router();

//ejs page routes
productRouter.get("/", showAllProductPage);
productRouter.get("/add-new", showProductAddPage);
productRouter.get("/edit/:slug", showProductEditPage);
productRouter.get("/single/:slug", showSingleProductPage);

//API routes
productRouter.post("/", productPhotoUpload, createProduct);

export default productRouter;
