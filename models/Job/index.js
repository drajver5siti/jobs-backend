const mongoose = require('mongoose');


const Job = mongoose.model('jobs', {
    title: {
        type: String,
        lowercase: true,
        trim: true,
    },
    company: {
        type: String,
        lowercase: true,
        trim: true,
    },
    location: {
        type: String,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        lowercase: true,
        trim: true,
    },
    type: {
        type: String,
        lowercase: true,
        trim: true,
    },
    shortDesc: {
        type: String,
        lowercase: true,
        trim: true,
    },
    user: mongoose.Schema.Types.ObjectId,
    favorite: {
        type: Boolean,
        default: false,
    }
})

module.exports = Job;