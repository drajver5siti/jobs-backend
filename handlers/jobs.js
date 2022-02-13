const Job = require("../models/Job");


const getJobs = async (req, res, next) => {
    const { id, keyword, location } = req.query;
    let resp;

    try {
        if (id) {
            resp = await Job.findOne({ _id: id })
        }
        else if (location === 'null') {
            resp = await Job.find();
        }
        else
            resp = await Job.find({ location: location })

        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

const addJob = async (req, res, next) => {
    console.log(req.body);
    const { title, company, location, description, type, shortDesc, user } = req.body;
    if (!title || !company || !location || !description || !shortDesc || !user)
        return res.status(400).json({ message: 'Invalid input' })
    try {
        const newJob = await Job.create({
            title: title.toLowerCase(),
            company: company.toLowerCase(),
            location: location.toLowerCase(),
            description: description.toLowerCase(),
            shortDesc: shortDesc.toLowerCase(),
            type: type.toLowerCase(),
            user: user,
        })
        return res.status(200).json(newJob);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const editJob = async (req, res) => {
    console.log(req.body);
    const { _id, title, company, location, description, type, shortDesc, user } = req.body;
    if (!title || !company || !location || !description || !shortDesc || !user)
        return res.status(400).json({ message: 'Invalid input' })
    try {
        const newJob = await Job.replaceOne({ _id: _id }, req.body)
        res.status(200).json(newJob)
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    getJobs,
    addJob,
    editJob,
}