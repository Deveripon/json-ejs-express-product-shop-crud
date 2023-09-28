import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

//Upload data to cloud

export const uploadFile = async (path) => {
    const fileData = await cloudinary.uploader.upload(
        path,
        {
            public_id: "devripon" + "_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
            folder: "students_photo",
        },
        (err, res) => {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log(res);
            }
        }
    );
    return fileData.secure_url;
};

//destroy data from cloudinary

export const deleteFromCloud = (paublicId) => {
    cloudinary.uploader.destroy(paublicId, (err, res) => {
        if (err) throw new Error("Error deleting file:", err);
        console.log("File deleted successfully:", res);
    });
};
