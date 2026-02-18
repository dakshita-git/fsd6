import { readFile, writeFile } from "./readwrite.js";

const FILE = "./user.json";

// REGISTER
export const registerUser = async (name, mail, password) => {
    const users = await readFile(FILE);

    // 🔴 check duplicate mail
    const existing = users.find(u => u.mail === mail);
    if (existing) {
        console.log("Mail already registered ❌");
        return;
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        mail,
        password
    };

    users.push(newUser);
    await writeFile(FILE, users);

    console.log("Registration successful ✅");
};

// LOGIN
export const loginUser = async (mail, password) => {
    const users = await readFile(FILE);

    const user = users.find(
        u => u.mail === mail && u.password === password
    );

    if (!user) {
        console.log("Invalid mail or password ❌");
        return;
    }

    console.log("Login successful ✅");
};

// UPDATE
export const updateUser = async (id, newData) => {
    const users = await readFile(FILE);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        console.log("User not found ❌");
        return;
    }

    users[index] = { ...users[index], ...newData };

    await writeFile(FILE, users);
    console.log("User updated successfully ✅");
};

// DELETE
export const deleteUser = async (id) => {
    const users = await readFile(FILE);

    const filtered = users.filter(u => u.id !== id);

    if (filtered.length === users.length) {
        console.log("User not found ❌");
        return;
    }

    await writeFile(FILE, filtered);
    console.log("User deleted successfully ✅");
};
