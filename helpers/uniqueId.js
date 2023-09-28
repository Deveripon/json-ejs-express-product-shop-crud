export const getUniqueId = (length) => {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0123456789";
    let uniqueID = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * char.length);
        uniqueID += char.charAt(randomIndex);
    }
    return uniqueID;
};
