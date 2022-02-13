const router = require('express').Router();
const PREFIX = process.env.API_PREFIX;
const { loginUser, registerUser, getAllUsers } = require('../handlers/users.js')
const { addJob, editJob, getJobs } = require('../handlers/jobs.js')
const { jwtInterceptor } = require('../middleware/jwt')

router.get(`${PREFIX}/users`, jwtInterceptor, getAllUsers)

router.route('/api/jobs')
    .get(getJobs)
    .post(jwtInterceptor, addJob)
    .put(jwtInterceptor, editJob)


router.post(`${PREFIX}/register`, registerUser)
router.post(`${PREFIX}/login`, loginUser)

module.exports = router;