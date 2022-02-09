const mongoose = require('mongoose');


const Job = mongoose.model('jobs', {
    title: String,
    company: String,
    location: String,
    description: String,
    type: String,
    shortDesc: String,
})

module.exports = Job;