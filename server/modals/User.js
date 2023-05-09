const { Schema, model } = require('mongoose')

const schema = Schema({
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: {type: Number, unique: true},
        utc: {type: String},
        password: { type: String, required: true },
    more: {
        pers: {
            fname: { type: String, default: ''},
            lname: { type: String, default: ''},
            gender: { type: String, default: ''},
            country: { type: String, default: ''},
            hb: { type: Date, default: ''},
            city: { type: String},
            profilePic: {type: String, default: ''},
        },
        job: {
            post: { type: String},
            postLevel: { type: String},
            lang: { type: String},
            langLevel: { type: String},
            skills: [
                {type: String}
            ],
        },
        exp: {
            jobPost: { type: String},
            company: { type: String},
            startJob: { type: Date,},
            endJob: { type: Date,},
            progress: { type: String},
        },
        edu: {
            specialization: { type: String},
            institution: { type: String},
            startEdu: { type: Date, timestamps: true,},
            endEdu: { type: Date, timestamps: true,},
        },
        qual: {
            qualName: { type: String},
            qualInstitution: { type: String},
            startQual: { type: Date, timestamps: true,},
            endQual: { type: Date, timestamps: true,},
        },
        about: {
            aboutMe: { type: String}
        }
    }
})

module.exports = model('User', schema)