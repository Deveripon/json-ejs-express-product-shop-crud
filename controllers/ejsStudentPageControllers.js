export const getHomePage = (req, res) => {
    res.render("students", {
        name: "Mony",
    });
};

export const getDasboard = (req, res) => {
    res.render("dashboard", {
        name: "Dasboard",
        title: "ejs dashboard",
    });
};
