const bcrypt = require("bcrypt");
const { createJwt } = require("../../middleware/jwt");

const User = require('../user/../../models/User');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const registerUser = async (req, res, next) => {
    const userInfo = req.body;
    console.log("Register " + JSON.stringify(userInfo))
    if (!userInfo.username || !userInfo.password)
        return res.status(400).json("Invalid data");

    const doesUserExist = await User.exists({ username: userInfo.username });
    if (doesUserExist) {
        return res.status(400).json("User already exists");
    }
    try {
        const encryptedPass = bcrypt.hashSync(userInfo.password, 10);
        const data = {
            username: userInfo.username,
            password: encryptedPass,
        }
        await User.create(data);
        return res.status(200).json("User registered");
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json("Invalid credentials");

    try {
        const user = await User.findOne({ username });
        const userInfo = {
            id: user._id,
            username: user.username,
        }
        if (!user) {
            return res.status(401).json("Username doesn't exist");
        }

        if (bcrypt.compareSync(password, user.password)) {
            const newToken = createJwt(username);
            return res.status(200).json({ token: newToken, user: userInfo });
        }
        else {
            return res.status(401).json("Invalid password");
        }
    } catch (error) {
        res.status(500).json(error);
    }
    return;
}

const getJobs = async (req, res, next) => {
    const { keyword, location } = req.query;
    res.status(200).json(`${keyword} and ${location}`);
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getJobs,
}