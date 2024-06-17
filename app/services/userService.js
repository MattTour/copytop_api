import User from "../models/userModel.js";

export async function getUsers() {
    return await User.findAll();
}

export async function getUser(userId) {
    return await User.findByPk(userId);
}

export async function getUserByMail(userMail) {
    return await User.findOne({ where: { email: userMail } });
}

export async function createUser(lastName, firstName, email, password) {
    const newUser = User.build({
        last_name: lastName,
        first_name: firstName,
        email: email,
        password: password
    });
    await newUser.save();
    return newUser;
}

export async function updateUser(userObject, lastName, firstName, email, password) {
    userObject.last_name = lastName,
    userObject.first_name = firstName,
    userObject.email = email,
    userObject.password = password
    await userObject.save();
    return userObject;
}

export async function deleteUser (userObject) {
    await userObject.destroy();
}
