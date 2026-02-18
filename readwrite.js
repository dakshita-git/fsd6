import fs from "fs/promises";

export const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        if (!data.trim()) return [];
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") return [];
        console.log("Read error:", error.message);
        return [];
    }
};

export const writeFile = async (path, data) => {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Write error:", error.message);
    }
};
