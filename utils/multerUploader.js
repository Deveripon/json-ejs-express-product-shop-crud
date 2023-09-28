import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     if (file.fieldname === "photo") {
    //         cb(null, path.resolve("public/students/photo"));
    //     } else {
    //         cb(new Error("Invalid file type"), false);
    //     }
    // },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const name =
            file.originalname.replace(extname, "").split(" ").join("_").toLowerCase() +
            "_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 100000) +
            extname;
        cb(null, name);
    },
});
export const studentPhotoUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type when uploading"), false);
        }
    },
    limits: {
        fileSize: 1000000,
    },
}).array("photos", 10);
