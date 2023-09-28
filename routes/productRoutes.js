//load dependencies
import express from "express";
import {
    showAllProductPage,
    showProductAddPage,
    showSingleProductPage,
    showProductEditPage,
    createProduct,
    editProduct,
    deleteProduct,
} from "../controllers/ejsProductPageControllers.js";
import { productPhotoUpload } from "../utils/multerUploader.js";

//create router
const productRouter = express.Router();

//ejs page routes
productRouter.get("/", showAllProductPage);
productRouter.get("/add-new", showProductAddPage);
productRouter.get("/edit/:id", showProductEditPage);
productRouter.get("/single/:slug", showSingleProductPage);

//API routes
productRouter.post("/", productPhotoUpload, createProduct);
productRouter.post("/edit/:id", productPhotoUpload, editProduct);
productRouter.get("/delete/:id", deleteProduct);

export default productRouter;
