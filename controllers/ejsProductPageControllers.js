import { log } from "console";
import fs, { readFileSync } from "fs";
import path from "path";
import { getSlug, getUniqueId } from "../helpers/helpers.js";
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

//show single product
export const showSingleProductPage = (req, res) => {
    //get all products from database
    const { slug } = req.params;
    const getAllProductFromDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/productData.json"), "utf8")
    );
    const findData = getAllProductFromDB.find((product) => product.slug === slug);
    console.log(findData);
    res.render("singleProduct", {
        product: findData,
    });
};

export const showProductEditPage = (req, res) => {
    const { id } = req.params;
    //get all data from db
    const getAllProductFromDB = JSON.parse(
        readFileSync(path.resolve("jsonDB/productData.json"), "utf8")
    );
    const findData = getAllProductFromDB.find((product) => product.id === id);

    res.render("editProduct", {
        product: findData,
    });
};

//create new product
export const createProduct = (req, res) => {
    const { vendor, productName, category, sku, stock, regulerPrice, salePrice, productDetails } =
        req.body;
    let featuredPhotoUrl;
    let galleryImageUrl = [];

    if (req.files.featuredPhoto.length > 0) {
        for (let i = 0; i < req.files.featuredPhoto.length; i++) {
            featuredPhotoUrl = req.files.featuredPhoto[i].filename;
        }
    } else {
        featuredPhotoUrl = "";
    }

    if (req.files.galleryImage.length > 0) {
        for (let i = 0; i < req.files.galleryImage.length; i++) {
            let url = req.files.galleryImage[i].filename;
            galleryImageUrl.push(url);
        }
    } else {
        return;
    }
    //get all data from jsoNDB
    const getAllProductFronDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/productData.json"), "utf8")
    );
    getAllProductFronDB.push({
        id: getUniqueId(25),
        vendor,
        productName,
        slug: getSlug(productName),
        category,
        sku,
        stock,
        regulerPrice,
        salePrice,
        productDetails,
        featuredPhoto: featuredPhotoUrl,
        galleryImage: galleryImageUrl,
    });
    fs.writeFileSync(path.resolve("jsonDB/productData.json"), JSON.stringify(getAllProductFronDB));
    res.redirect("/products");
};

//edit product
export const editProduct = (req, res) => {
    const { id } = req.params;
    const { vendor, productName, category, sku, stock, regulerPrice, salePrice, productDetails } =
        req.body;
    //get all data from product
    const getAllProductFromDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/productData.json"), "utf8")
    );
    let featuredPhotoUrl =
        getAllProductFromDB[getAllProductFromDB.findIndex((data) => data.id === id)].featuredPhoto;

    let galleryImageUrl =
        getAllProductFromDB[getAllProductFromDB.findIndex((data) => data.id === id)].galleryImage;

    if (req?.files?.featuredPhoto) {
        for (let i = 0; i < req.files.featuredPhoto.length; i++) {
            featuredPhotoUrl = req.files.featuredPhoto[i].filename;
        }
    }

    if (req?.files?.galleryImage) {
        for (let i = 0; i < req.files.galleryImage.length; i++) {
            let url = req.files.galleryImage[i].filename;
            galleryImageUrl = [];
            galleryImageUrl.push(url);
        }
    }
    getAllProductFromDB[getAllProductFromDB.findIndex((data) => data.id === id)] = {
        id: id,
        vendor,
        productName,
        slug: getSlug(productName),
        category,
        sku,
        stock,
        regulerPrice,
        salePrice,
        productDetails,
        featuredPhoto: featuredPhotoUrl,
        galleryImage: galleryImageUrl,
    };
    fs.writeFileSync(path.resolve("jsonDB/productData.json"), JSON.stringify(getAllProductFromDB));
    res.redirect("/products");
};
export const deleteProduct = (req, res) => {
    //get all data
    const getAllProductFromDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/productData.json"), "utf8")
    );
    const { id } = req.params;
    getAllProductFromDB.splice(
        getAllProductFromDB.findIndex((data) => data.id === id),
        1
    );
    fs.writeFileSync(path.resolve("jsonDB/productData.json"), JSON.stringify(getAllProductFromDB));

    res.redirect("/products");
};
