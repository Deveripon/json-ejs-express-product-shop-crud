//load dependencies
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import publicRouter from "./routes/publicRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import multer from "multer";
import productRouter from "./routes/productRoutes.js";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

//Load environment variables
const PORT = process.env.PORT || 6060;
//init express
const app = express();
//use supporting middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("public")));

//ejs setup
app.set("view engine", "ejs");
app.use(expressLayouts);
//<!-- ==========  Start From Here ========== -->//

app.use(publicRouter);
app.use("/students", studentRouter);
app.use("/products", productRouter);

//<!-- ==========  End From Here ========== -->//

//404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "Page not found",
    });
});

//error handler
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: 500,
            message: "There was an Server side error",
        });
    }
});

//server listen on port
app.listen(PORT, () => {
    console.log(` server listening on port ${PORT} `.bgGreen.blue.bold);
});
