import fs from "fs";
import path from "path";
export const getDataFromJsonDB = (filePath) => {
    const data = fs.readFile(path.resolve(filePath), "utf8", (err, data) => {
        if (err) throw err;
    });
    return JSON.parse(data);
};

export const setDataToJsonDB = (filePath, data) => {
    return fs.writeFile(path.resolve(filePath), data, "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
};
