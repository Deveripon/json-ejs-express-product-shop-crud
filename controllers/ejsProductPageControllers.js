import { log } from "console";
import fs from "fs";
import path from "path";
//get all product page
export const showAllProductPage = (req, res) => {
    const getAllProductFromDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/productData.json"), "utf-8")
    );
    res.render("allProduct", {
        products: getAllProductFromDB,
    });
};

/* create new product page */
export const showProductAddPage = (req, res) => {
    res.render("createProduct");
};

export const showSingleProductPage = (req, res) => {
    res.render("singleProduct");
};
export const showProductEditPage = (req, res) => {
    res.render("editProduct");
};

//create new product
export const createProduct = (req, res) => {
    const { vendor, productName, category, sku, stock, regulerPrice, salePrice, productDetails } =
        req.body;
    let featuredPhotoUrl;
    let galleryImageUrl = [];
    for (let i = 0; i < req.files.featuredPhoto.length; i++) {
        featuredPhotoUrl = req.files.featuredPhoto[i].filename;
    }
    for (let i = 0; i < req.files.galleryImage.length; i++) {
        let url = req.files.galleryImage[i].filename;
        galleryImageUrl.push(url);
    }
    res.send({
        vendor,
        productName,
        category,
        sku,
        stock,
        regulerPrice,
        salePrice,
        productDetails,
        featuredPhoto: featuredPhotoUrl,
        galleryImage: galleryImageUrl,
    });
};
