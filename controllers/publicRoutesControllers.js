//get home page
export const getHomePage = (req, res) => {
    res.status(200).json({
        status: "200",
        message: "Home Page",
    });
};
