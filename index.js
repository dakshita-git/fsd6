import readline from "readline";
import {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
} from "./service.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

const menu = async () => {
    console.log(`
==== USER SYSTEM ====
1. Register
2. Login
3. Update
4. Delete
5. Exit
`);

    const choice = await ask("Choose option: ");

    switch (choice) {

        case "1":
            const name = await ask("Name: ");
            const mail = await ask("Mail: ");
            const password = await ask("Password: ");
            await registerUser(name, mail, password);
            break;

        case "2":
            const logMail = await ask("Mail: ");
            const logPass = await ask("Password: ");
            await loginUser(logMail, logPass);
            break;

        case "3":
            const id = await ask("User ID: ");

            const newName = await ask("New Name (leave blank to skip): ");
            const newMail = await ask("New Mail (leave blank to skip): ");
            const newPassword = await ask("New Password (leave blank to skip): ");

            const updatedData = {};

            if (newName.trim()) updatedData.name = newName;
            if (newMail.trim()) updatedData.mail = newMail;
            if (newPassword.trim()) updatedData.password = newPassword;

            if (Object.keys(updatedData).length === 0) {
                console.log("No changes provided ❌");
            } else {
                await updateUser(Number(id), updatedData);
            }

            break;

        case "4":
            const delId = await ask("User ID: ");
            await deleteUser(Number(delId));
            break;

        case "5":
            console.log("Bye 👋");
            rl.close();
            return;

        default:
            console.log("Invalid choice ❌");
    }

    menu();
};

menu();
