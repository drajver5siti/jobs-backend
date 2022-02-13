const jwt = require('jsonwebtoken');

const createJwt = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2h' });
}

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const decodeToken = (token) => {
    return jwt.decode(token);
}

const jwtInterceptor = (req, res, next) => {
    const user = req.headers.authorization;
    if (!user)
        return res.status(400).json({ message: "Auth token not found" });

    const [bearer, jwtToken] = user.split(" ");
    try {
        verifyJwt(jwtToken);
    } catch (error) {
        return res.status(401).json({ message: `Invalid jwt` });
    }
    next();
}

module.exports = {
    jwtInterceptor,
    createJwt,
    verifyJwt,
    decodeToken,
}