const router = require('express').Router();
const PREFIX = process.env.API_PREFIX;
const { loginUser, registerUser, getAllUsers, getJobs } = require('../handlers/user')
const { jwtInterceptor } = require("../middleware/jwt");

router.get(`${PREFIX}/users`, jwtInterceptor, getAllUsers)
router.get(`${PREFIX}/jobs`, getJobs)

router.post(`${PREFIX}/register`, registerUser)
router.post(`${PREFIX}/login`, loginUser)

module.exports = router;