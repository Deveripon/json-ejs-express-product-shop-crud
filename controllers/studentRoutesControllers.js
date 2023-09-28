import { sendVerificationEmail } from "../email/verificationEmail.js";
import sendSms from "bulkmessage";
import fs from "fs";
import path from "path";
import { deleteFromCloud, uploadFile } from "../utils/cloudinary.js";
import { getUniqueId } from "../helpers/helpers.js";

//get all student
export const getAllStudent = (req, res) => {
    //get all students from JSON db
    const getDataFromJsonDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/studentsData.json"), "utf8")
    );
    let message;
    if (getDataFromJsonDB.length > 0) {
        message = `${getDataFromJsonDB.length} students found`;
    } else {
        message = `No Student found`;
    }

    res.status(200).json({
        status: "200",
        message: message,
        students: getDataFromJsonDB,
    });
};
//create a new student
export const createStudent = async (req, res) => {
    //send sms and email
    await sendVerificationEmail(req, res);
    sendSms("rcvhoqrAmkxEWrfyYIKQ", "8809617612985", req.body.cell, "this is testing message");
    //upload photo to Cloud
    let gallUrl = [];
    if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
            let fileUrl = await uploadFile(req.files[i].path);
            gallUrl.push(fileUrl);
        }
    }

    //generate random unique id
    let id = getUniqueId(25);
    const { name, age, gender, cell, email } = req.body;
    let students = {
        id,
        name,
        age,
        cell,
        email,
        gender,
        photos: gallUrl,
    };

    //get all data from jsonDB
    const getDataFromJsonDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/studentsData.json")).toString()
    );
    getDataFromJsonDB.push(students);
    //data send to jsondb
    fs.writeFileSync(path.resolve("jsonDB/studentsData.json"), JSON.stringify(getDataFromJsonDB));

    res.status(200).json({ students });
};
//get single student
export const getSingleStudent = (req, res) => {
    const { id } = req.params;
    //get all data from Json DB
    const getDataFromJsonDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/studentsData.json"), "utf8")
    );
    const student = getDataFromJsonDB.find((student) => student.id === id);
    res.status(200).json({ student });
};
//edit single student information
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, age, cell, email, gender } = req.body;

    let gallUrl = [];
    if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
            let url = await uploadFile(req.files[i].path);
            gallUrl.push(url);
        }
    }

    //get all data from json db
    const getDataFromJsonDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/studentsData.json"), "utf8")
    );
    const findData = getDataFromJsonDB.find((student) => student.id === id);
    if (!findData) {
        res.status(500).json({
            status: "500",
            message: "No data found",
        });
        return;
    }
    getDataFromJsonDB[getDataFromJsonDB.findIndex((student) => student.id === id)] = {
        ...findData,
        name,
        email,
        cell,
        age,
        gender,
        photos: gallUrl,
    };
    fs.writeFileSync(path.resolve("jsonDB/studentsData.json"), JSON.stringify(getDataFromJsonDB));

    res.status(200).json({
        status: "200",
        message: "Student data updated successfully",
    });
};
//delete a student
export const deleteStudent = (req, res) => {
    const { id } = req.params;
    //get all student from database
    const getDataFromJsonDB = JSON.parse(
        fs.readFileSync(path.resolve("jsonDB/studentsData.json"), "utf8")
    );
    const deletableData = getDataFromJsonDB.find((data) => data.id === id);
    //saparate remain data from database
    if (!deletableData) {
        res.status(500).json({
            status: "500",
            message: "No data found to delete",
        });
        return;
    }
    const remainingStudentsAfterDelete = getDataFromJsonDB.filter((student) => student.id !== id);
    //data stored in database
    fs.writeFileSync(
        path.resolve("jsonDB/studentsData.json"),
        JSON.stringify(remainingStudentsAfterDelete)
    );

    res.status(200).json({
        status: "200",
        deletedData: deletableData,
        message: "data deleted successfullly",
    });
};
