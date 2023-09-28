//get all product page
export const showAllProductPage = (req, res) => {
    res.render("allProduct");
};

export const showProductAddPage = (req, res) => {
    res.render("createProduct");
};
export const showSingleProductPage = (req, res) => {
    res.render("singleProduct");
};
export const showProductEditPage = (req, res) => {
    res.render("editProduct");
};
