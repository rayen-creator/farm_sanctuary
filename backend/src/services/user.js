const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path')

const storeFS = ({stream, filename}) => {
    const uploadDir = 'public/images';
    name = `single${Math.floor((Math.random() * 10000) + 1)}`;
    const pathname = path.join(__dirname, `../../public/images/${filename}`);
    return new Promise((resolve, reject) =>
        stream
            .on('error', error => {
                if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(pathname);
                reject(error);
            })
            .pipe(fs.createWriteStream(pathname))
            .on('error', error => reject(error))
            .on('finish', () => resolve({pathname}))
    );
}


async function getUser(id) {
    return User.findById(id);
}

async function getUsers() {
    return User.find();
}

async function updateUser(id, input, file) {


    console.log('File object:', file);
    const user = await User.findById(id);
    const isPasswordMatch = input.password === user.password;
    const isUsernameMatch = input.username !== user.username;
    console.log(isUsernameMatch)
    const findusername = await User.findOne({username: input.username});
    if (findusername && isUsernameMatch) {
        return {
            message: "Failed! Username is already in use!",
            usernameExists: true,
        };
    }
    const updatedUser = {
        username: input.username,
        password: isPasswordMatch ? user.password : bcrypt.hashSync(input.password, 8),
        email: input.email,
        phone: input.phone,
        isActive: input.isActive,
        role: input.role,
        gender: input.gender,
        two_FactAuth_Option: input.two_FactAuth_Option,
        isBlocked: false,
        updatedAt: new Date(),
    };

    if (file) {
        const {
            file: {filename, mimetype, encoding, createReadStream},
        } = file;

        let stream = createReadStream();

        const pathObj = await storeFS({stream, filename});
        console.log("FIle 1", pathObj.path);
        let fileLocation = pathObj.pathname;
        const baseUrl = process.env.BASE_URL
        const port = process.env.PORT
        fileLocation = `${baseUrl}${port}/images/${filename}`;
        updatedUser.image = fileLocation;
    }
    await User.findByIdAndUpdate(id, updatedUser, {new: true});
    return {
        message: "User updated !",
        usernameExists: false,
    };
}


async function deleteUser(id) {
    const user = await User.findById(id);
    if (!user) {
        return null;
    }
    return await user.remove();
}

async function toggleBlockUser(id) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found.`);
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    return user;
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    toggleBlockUser
};
