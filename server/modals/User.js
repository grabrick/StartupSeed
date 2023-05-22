const { Schema, model } = require('mongoose')

const schema = Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: {type: String},
    timeZone: {type: String},
    more: {
        pers: {
            gender: { type: String },
            country: { type: String },
            hb: { type: Date },
            city: { type: String },
            profilePic: { type: String },
        },
        job: {
            post: { type: String },
            postLevel: { type: String },
            lang: { type: String },
            langLevel: { type: String },
            skills: [
                { type: String }
            ],
        },
        exp: {
            jobPost: { type: String },
            company: { type: String },
            startJob: { type: String },
            endJob: { type: String },
            progress: { type: String },
        },
        edu: {
            specialization: { type: String },
            institution: { type: String },
            startEdu: { type: Date },
            endEdu: { type: Date },
        },
        qual: {
            qualName: { type: String },
            qualInstitution: { type: String },
            startQual: { type: Date },
            endQual: { type: Date },
        },
        about: {
            aboutMe: { type: String }
        }
    }
})

module.exports = model('User', schema)