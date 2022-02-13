const bcrypt = require("bcrypt");
const { createJwt } = require('../middleware/jwt')

const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const registerUser = async (req, res, next) => {
    const userInfo = req.body;

    if (!userInfo.username || !userInfo.password)
        return res.status(400).json({ message: "Invalid data" });

    const doesUserExist = await User.exists({ username: userInfo.username });
    if (doesUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }
    try {
        const encryptedPass = bcrypt.hashSync(userInfo.password, 10);
        const data = {
            username: userInfo.username,
            password: encryptedPass,
        }
        await User.create(data);
        return res.status(200).json({ message: 'Account created' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "Invalid credentials" });

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Username doesn't exist" });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const newToken = createJwt(user._id);
            return res.status(200).json({ token: newToken });
        }
        else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
    return;
}



module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
}