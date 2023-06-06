const { Schema, model } = require('mongoose')

const schema = Schema({
    projectOwner: { type: String },
    projectName: { type: String },
    projectImage: { type: String },
    projectDesc: { type: String },
    projectPost: [
        {
            jobPost: { type: String },
            postLevel: { type: String },
            jobTask: { type: String },
            skills: [{ type: String }]
        }
    ]
})

module.exports = model('Project', schema)