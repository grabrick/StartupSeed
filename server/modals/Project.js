const { Schema, model } = require('mongoose')

const schema = Schema({
    projectOwner: { type: String },
    projectName: { type: String },
    projectImage: { type: String },
    projectDesc: { type: String },
    isVerification: { type: Boolean, default: false },
    projectPost: [
        {
            _id: false,
            id: { type: String },
            jobPost: { type: String },
            postLevel: { type: String },
            jobTask: { type: String },
            skills: [{ type: String }]
        }
    ]
})

module.exports = model('Project', schema)